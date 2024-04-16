from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Product
from ..utils.categories import categories

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
            thumbnail_url = list(filter(lambda x: x.thumbnail==True, product.product_images))[0].url
        product = product.to_dict()
        product['previewImage'] = thumbnail_url
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

    return product

@product_routes.route('/', methods = ['POST'])
@login_required
def add_product():
    """
    Adds a new product for sale to the store and returns it.
    """
    req = request.json

    # Error response: Body validation errors
    errors = {}

    required = ['name', 'category', 'subcategory', 'price', 'condition', 'description', 'stock']
    for attribute in required:
        if attribute not in req:
            errors[attribute] = f'{attribute.title()} is required'

    if 'category' in req and req['category'] not in categories:
        errors['category'] = 'Category not found'
    if 'subcategory' in req:
        if 'category' in errors or req['subcategory'] not in categories[req['category']]:
            errors['subcategory'] = 'Subcategory not found'
    if 'price' in req and (not isinstance(req['price'], int) or req['price'] < 1):
        errors['price'] = 'Invalid price'
    if 'stock' in req and (not isinstance(req['stock'], int) or req['stock'] < 1):
        errors['stock'] = 'Invalid stock quantity'

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
