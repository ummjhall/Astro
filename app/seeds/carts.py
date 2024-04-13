from app.models import db, Cart, environment, SCHEMA
from sqlalchemy.sql import text


def seed_carts():
    seeds = [
        Cart(user_id=1),
        Cart(user_id=2),
        Cart(user_id=3),
        Cart(user_id=4)
    ]

    for cart in seeds:
        db.session.add(cart)
    db.session.commit()


def undo_carts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.carts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM carts"))
    db.session.commit()
