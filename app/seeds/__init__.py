from flask.cli import AppGroup
from app.models.db import environment
from .cart_items import seed_cart_items, undo_cart_items
from .carts import seed_carts, undo_carts
from .product_images import seed_product_images, undo_product_images
from .product_reviews import seed_product_reviews, undo_product_reviews
from .products import seed_products, undo_products
from .users import seed_users, undo_users


# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other models' undo functions below
        undo_cart_items()
        undo_carts()
        undo_product_reviews()
        undo_product_images()
        undo_products()
        undo_users()

    seed_users()
    seed_products()
    seed_product_images()
    seed_product_reviews()
    seed_carts()
    seed_cart_items()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_cart_items()
    undo_carts()
    undo_product_reviews()
    undo_product_images()
    undo_products()
    undo_users()
