from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Cart

cart_routes = Blueprint('carts', __name__,  url_prefix='/api/carts')


@cart_routes.route('/current')
# @login_required
def get_cart():
    """
    Returns all items in the current user's cart.
    """

    return {'message': 'test'}
