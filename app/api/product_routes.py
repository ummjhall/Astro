from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Product

product_routes = Blueprint('products', __name__,  url_prefix='/api/products')


@product_routes.route('/')
def get_all_products():
    """
    Returns all products in the store.
    """
    all_products = Product.query.all();
    products = []
    for product in all_products:
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
