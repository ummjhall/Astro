from app.models import db, ProductReview, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_reviews():
    seeds = [
        ProductReview(
            product_upc='9F3D5A7C4B1E8F01',
            user_id=4,
            rating=3,
            review_text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ),
        ProductReview(
            product_upc='9F3D5A7C4B1E8F01',
            user_id=2,
            rating=4,
            review_text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        ),
        ProductReview(
            product_upc='9F3D5A7C4B1E8F02',
            user_id=4,
            rating=4,
            review_text='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
        )
    ]

    for product_review in seeds:
        db.session.add(product_review)
    db.session.commit()


def undo_product_reviews():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.product_reviews RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM product_reviews'))
    db.session.commit()
