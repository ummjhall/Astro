from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Product, User
from ..utils.options import categories, conditions

product_routes = Blueprint('products', __name__,  url_prefix='/api/products')


@product_routes.route('/')
def get_all_products():
    """
    Returns all products in the store.
    """
    all_products = Product.query.all();
    products = []
    for product in all_products:
        thumbnail_url = None
        if product.product_images:
            wrapped_image = list(filter(lambda x: x.thumbnail==True, product.product_images))
            if wrapped_image:
                thumbnail_url = list(filter(lambda x: x.thumbnail==True, product.product_images))[0].url
        product = product.to_dict()
        product['previewImage'] = thumbnail_url
        seller = User.query.get(product['seller_id'])
        product['seller'] = seller.username
        products.append(product)
    return {'Products': products}


@product_routes.route('/<product_id>')
def get_product_details(product_id):
    """
    Returns the details of a product specified by id.
    """
    product = Product.query.get(product_id)

    # Error response: Product couldn't be found
    if not product:
        return {'message': "Product couldn't be found"}, 404

    # SUCCESS
    images = []
    for image in product.product_images:
        image = image.to_dict()
        del image['product_id']
        images.append(image)
    product = product.to_dict()
    product['Images'] = images
    seller = User.query.get(product['seller_id'])
    product['seller'] = seller.username

    return product

@product_routes.route('/', methods = ['POST'])
@login_required
def add_product():
    """
    Adds a new product for sale to the store and returns it.
    """
    req = request.json

    # Error response: Body validation errors
    errors = validate_request(req, required_attributes=True)
    if errors:
        return {
            'message': 'Bad Request',
            'errors': errors
        }, 400

    # SUCCESS
    new_product = Product(
        seller_id=current_user.id,
        upc=req.get('upc', None),
        name=req['name'],
        category=req['category'],
        subcategory=req['subcategory'],
        price=req['price'],
        condition=req['condition'],
        description=req['description'],
        details=req.get('details', None),
        stock=req['stock']
    )
    db.session.add(new_product)
    db.session.commit()

    return new_product.to_dict(), 201


@product_routes.route('/<product_id>', methods=['PUT', 'PATCH'])
@login_required
def edit_product(product_id):
    """
    Updates and returns a product belonging to the current user.
    """
    req = request.json
    product = Product.query.get(product_id)

    # Error response: Product couldn't be found
    if not product:
        return {'message': "Product couldn't be found"}, 404

    # Error response: Product does not belong to the current user
    if product.seller_id != current_user.id:
        return {'message': 'Forbidden'}, 403

    # Error response: Body validation errors
    errors = validate_request(req)
    if errors:
        return {
            'message': 'Bad Request',
            'errors': errors
        }, 400

    # SUCCESS
    for key in req:
        setattr(product, key, req[key])
    db.session.add(product)
    db.session.commit()

    return product.to_dict()


@product_routes.route('/<product_id>', methods=['DELETE'])
@login_required
def remove_product(product_id):
    """
    Removes a product belonging to the current user from the store.
    """
    product = Product.query.get(product_id)

    # Error response: Product couldn't be found
    if not product:
        return {'message': "Product couldn't be found"}, 404

    # Error response: Product does not belong to the current user
    if product.seller_id != current_user.id:
        return {'message': 'Forbidden'}, 403

    # SUCCESS
    db.session.delete(product)
    db.session.commit()

    return {'message': 'Successfully deleted'}


def validate_request(req, required_attributes=False):
    """
    Validates the body of request to add or edit a product.
    """
    errors = {}

    if required_attributes:
        required = ['name', 'category', 'subcategory', 'price', 'condition', 'description', 'stock']
        for attribute in required:
            if attribute not in req:
                errors[attribute] = f'{attribute.title()} is required'

    if 'upc' in req and req['upc'] is not None and (not isinstance(req['upc'], str) or len(req['upc']) not in [0, 16]):
        errors['upc'] = 'Invalid UPC'
    if 'name' in req and (not isinstance(req['name'], str) or len(req['name']) > 100):
        errors['name'] = 'Invalid name'
    if 'category' in req and req['category'] not in categories:
        errors['category'] = 'Category not found'
    if 'subcategory' in req:
        if 'category' in errors or req['subcategory'] not in categories[req['category']]:
            errors['subcategory'] = 'Subcategory not found'
    if 'price' in req and (not isinstance(req['price'], int) or req['price'] < 1 or req['price'] > 9999999999):
        errors['price'] = 'Invalid price'
    if 'condition' in req and req['condition'] not in conditions:
        errors['condition'] = 'Invalid condition'
    if 'description' in req and (not isinstance(req['description'], str) or len(req['description']) > 255):
        errors['description'] = 'Invalid description'
    if 'details' in req and (not isinstance(req['details'], str) or len(req['details']) > 5000):
        errors['details'] = 'Invalid details'
    if 'stock' in req and (not isinstance(req['stock'], int) or req['stock'] < 1 or req['stock'] > 999999):
        errors['stock'] = 'Invalid stock quantity'

    return errors
