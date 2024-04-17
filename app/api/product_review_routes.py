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


@product_review_routes.route('/<product_id>', methods=['POST'])
@login_required
def create_product_review(product_id):
    """
    Creates and returns a new review for the specified product.
    """
    req = request.json
    product = Product.query.get(product_id)

    # Error response: Product couldn't be found
    if not product:
        return {'message': "Product couldn't be found"}, 404

    # Error response: Product does not have a UPC
    if product.upc is None:
        return {'message': 'Cannot leave reviews for unregistered goods'}, 400

    # Error response: User has existing review for specified product
    existing_review = ProductReview.query.filter(
        ProductReview.product_upc==product.upc, ProductReview.user_id==current_user.id
    ).one_or_none()
    if existing_review:
        return {'message': 'Review from current user already exists for this product'}, 400

    # Error response: Body validation errors
    errors = {}

    if 'rating' not in req:
        errors['rating'] = 'Rating required'
    else:
        if req['rating'] not in [1, 2, 3, 4, 5]:
            errors['rating'] = 'Invalid rating'

    if 'review_text' not in req:
        errors['review_text'] = 'Review text required'
    else:
        if not isinstance(req['review_text'], str) or len(req['review_text']) > 5000:
            errors['review_text'] = 'Invalid review text'

    if errors:
        return {
            'message': 'Bad Request',
            'errors': errors
        }, 400

    # SUCCESS
    new_review = ProductReview(
        product_upc=product.upc,
        user_id=current_user.id,
        rating = req['rating'],
        review_text=req['review_text']
    )
    db.session.add(new_review)
    db.session.commit()

    return new_review.to_dict(), 201


@product_review_routes.route('/<product_id>', methods=['PUT', 'PATCH'])
@login_required
def edit_product_review(product_id):
    """
    Updates and returns a user's existing product review.
    """
    req = request.json
    product = Product.query.get(product_id)

    # Error response: Product (and review) couldn't be found
    if not product:
        return {'message': "Review couldn't be found"}, 404

    # Error response: User does not have existing review for specified product
    review = ProductReview.query.filter(
        ProductReview.product_upc==product.upc, ProductReview.user_id==current_user.id
    ).one_or_none()
    if not review:
        return {'message': "Review couldn't be found"}, 404

    # Error response: Body validation errors
    errors = {}
    if 'rating' in req and req['rating'] not in [1, 2, 3, 4, 5]:
        errors['rating'] = 'Invalid rating'
    if 'review_text' in req and (not isinstance(req['review_text'], str) or len(req['review_text']) > 5000):
        errors['review_text'] = 'Invalid review text'
    if errors:
        return {
            'message': 'Bad Request',
            'errors': errors
        }, 400

    # SUCCESS
    review.rating = req.get('rating', review.rating)
    review.review_text = req.get('review_text', review.review_text)

    db.session.add(review)
    db.session.commit()

    return review.to_dict(), 200
