from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, Product, ProductImage

product_image_routes = Blueprint('product_images', __name__,  url_prefix='/api/product-images')


@product_image_routes.route('/<product_id>', methods=['POST'])
@login_required
def add_image(product_id):
    """
    Creates and returns a new image for a product specified by id.
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
    errors = {}
    if 'url' not in req:
        errors['url'] = 'Image url required'
    else:
        if not isinstance(req['url'], str) or len(req['url']) > 255:
            errors['url'] = 'Invalid url'
    if errors:
        return {
            'message': 'Bad Request',
            'errors': errors
        }, 400

    # Error response: Cannot add any more images
    max_images = 10
    if len(product.product_images) >= max_images:
        return {'message': 'Maximum number of images was reached'}, 403

    # Error response: Thumbnail image already exists
    thumbnail = 'thumbnail' in req and isinstance(req['thumbnail'], bool) and req['thumbnail']
    if thumbnail:
        for image in product.product_images:
            if image.thumbnail:
                return {'message': 'Thumbnail image already exists'}, 403

    # SUCCESS
    new_image = ProductImage(
        product_id=product_id,
        url=req['url'],
        thumbnail=thumbnail
    )

    db.session.add(new_image)
    db.session.commit()

    return new_image.to_dict(), 201


@product_image_routes.route('/<product_id>', methods=['DELETE'])
@login_required
def delete_image(product_id):
    """
    Deletes a product image specified by id.
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
    errors = {}
    if 'image_id' not in req:
        errors['image_id'] = 'Image id required'
    else:
        if not isinstance(req['image_id'], int) or req['image_id'] < 1:
            errors['image_id'] = 'Invalid image id'
    if errors:
        return {
            'message': 'Bad Request',
            'errors': errors
        }, 400

    # Error response: Image couldn't be found
    found = list(filter(lambda image: image.id==req['image_id'], product.product_images))
    if not found:
        return {'message': "Image couldn't be found"}, 404

    # SUCCESS
    image = found[0]

    db.session.delete(image)
    db.session.commit()

    return {'message': 'Successfully deleted'}
