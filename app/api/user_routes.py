from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


# @user_routes.route('/')
# @login_required
# def users():
#     """
#     Query for all users and return them in a list of user dictionaries
#     """
#     users = User.query.all()
#     return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
# @login_required
def user(id):
    """
    Query for a user by id and return that user in a dictionary
    """
    user = User.query.get(id)
    userData = user.to_dict()

    isSeller = len(user.products) > 0;
    userData['isSeller'] = isSeller

    return userData
