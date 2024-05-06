from app.models import db, CartItem, environment, SCHEMA
from sqlalchemy.sql import text # type: ignore


def seed_cart_items():
    seeds = [
        CartItem(cart_id=1, product_id=1, quantity=1),
        CartItem(cart_id=1, product_id=2, quantity=1),
        CartItem(cart_id=1, product_id=7, quantity=2)
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
