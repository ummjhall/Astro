from flask import Blueprint, jsonify
from flask_login import current_user, login_required
from app.models import Cart

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

        for attribute in ['description', 'details', 'seller_id', 'stock']:
            del item[attribute]

        items.append(item)

    return {'Items': items}
