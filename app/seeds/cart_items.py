from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text # type: ignore


def seed_cart_items():
    seeds = [
        CartItem(cart_id=1, product_id=19, quantity=1),
        CartItem(cart_id=1, product_id=40, quantity=1),
        CartItem(cart_id=1, product_id=64, quantity=5),
        CartItem(cart_id=1, product_id=81, quantity=5),
        CartItem(cart_id=1, product_id=86, quantity=1)
    ]

    for cart_item in seeds:
        db.session.add(cart_item)
    db.session.commit()


def undo_cart_items():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.carts_items RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM carts_items'))
    db.session.commit()
