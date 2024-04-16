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
