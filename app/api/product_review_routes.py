from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Product, ProductReview

product_review_routes = Blueprint('product_reviews', __name__,  url_prefix='/api/product-reviews')


@product_review_routes.route('/<product_id>')
def get_product_reviews(product_id):
    """
    Returns all reviews for the specified product.
    """
    product = Product.query.get(product_id)

    # Error response: Product couldn't be found
    if not product:
        return {'message': "Product couldn't be found"}, 404

    # Error response: Product does not have a UPC
    if product.upc is None:
        return {'message': 'Cannot leave reviews for unregistered goods'}, 400

    # SUCCESS
    reviews = []
    product_reviews = ProductReview.query.filter(ProductReview.product_upc==product.upc).all()
    for review in product_reviews:
        review = review.to_dict()
        reviews.append(review)

    return {'Reviews': reviews}
