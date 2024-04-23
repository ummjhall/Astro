from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import db, CartItem, Product

cart_routes = Blueprint('carts', __name__,  url_prefix='/api/carts')


@cart_routes.route('/current')
@login_required
def get_cart():
    """
    Returns all items in the current user's cart.
    """
    cart = current_user.cart

    items = []
    for i in range(len(cart.items)):
        item = cart.items[i].to_dict()

        cart_item = cart.cart_items[i]
        item['quantity'] = cart_item.quantity

        for attribute in ['description', 'details', 'seller_id']:
            del item[attribute]

        items.append(item)

    return {'Items': items}


@cart_routes.route('/current/<product_id>', methods=['POST'])
@login_required
def add_to_cart(product_id):
    """
    Adds a product to the current user's cart and returns the product.
    """
    cart = current_user.cart
    quantity = request.json.get('quantity', None)

    # Error response: Body validation errors
    if not isinstance(quantity, int) or quantity < 1:
        return {
            'message': 'Bad Request',
            'errors': {'quantity': 'Invalid quantity'}
        }, 400

    # Error response: Product couldn't be found
    product = Product.query.get(product_id)
    if not product:
        return {'message': "Product couldn't be found"}, 404

    # Error response: Product already in cart
    if product.id in [product.id for product in cart.items]:
        return {'message': 'Product already in cart'}, 400

    # Error response: Insufficient stock
    if quantity > product.stock:
        return {
            'message': 'Bad Request',
            'errors': {'quantity': 'Quantity exceeds available stock'}
        }, 400

    # SUCCESS
    new_cart_item = CartItem(cart_id=cart.id, product_id=product_id, quantity=quantity)
    db.session.add(new_cart_item)
    db.session.commit()

    added_item = new_cart_item.item.to_dict()
    for attribute in ['description', 'details', 'seller_id', 'stock']:
        del added_item[attribute]
    added_item['quantity'] = quantity

    return added_item, 201


@cart_routes.route('/current/<product_id>', methods=['PUT', 'PATCH'])
@login_required
def update_quantity(product_id):
    """
    Updates the quantity of a product in the current user's cart and returns the product.
    """
    cart = current_user.cart
    quantity = request.json.get('quantity', None)

    # Error response: Body validation errors
    if not isinstance(quantity, int) or quantity < 1:
        return {
            'message': 'Bad Request',
            'errors': {'quantity': 'Invalid quantity'}
        }, 400

    # Error response: Product not in user's cart
    if int(product_id) not in [product.id for product in cart.items]:
        return {'message': "Product couldn't be found"}, 404

    # Error response: Insufficient stock
    product = Product.query.get(product_id)
    if quantity > product.stock:
        return {
            'message': 'Bad Request',
            'errors': {'quantity': 'Quantity exceeds available stock'}
        }, 400

    # SUCCESS
    cart_item = CartItem.query.filter(
        CartItem.product_id==int(product_id), CartItem.cart_id==cart.id
        ).one()
    cart_item.quantity = quantity

    db.session.add(cart_item)
    db.session.commit()

    updated_item = cart_item.item.to_dict()
    for attribute in ['description', 'details', 'seller_id']:
        del updated_item[attribute]
    updated_item['quantity'] = quantity

    return updated_item


@cart_routes.route('/current/<product_id>', methods=['DELETE'])
@login_required
def remove_product(product_id):
    """
    Removes a product from the current user's cart.
    """
    cart = current_user.cart

    # Error response: Product not in user's cart
    if int(product_id) not in [product.id for product in cart.items]:
        return {'message': "Product couldn't be found"}, 404

    # SUCCESS
    cart_item = CartItem.query.filter(
        CartItem.product_id==int(product_id), CartItem.cart_id==cart.id
        ).one()
    db.session.delete(cart_item)
    db.session.commit()

    return {'message': 'Successfully deleted'}
