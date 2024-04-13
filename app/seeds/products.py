from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():
    seeds = [
        Product(
            seller_id=3,
            upc="1234567890000001",
            name="Demo Product 1",
            category="Category 1",
            subcategory="Subcategory 1",
            price=10000,
            condition="New",
            description="Demo Product 1 description",
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            stock=1
        ),
        Product(
            seller_id=3,
            upc="1234567890000002",
            name="Demo Product 2",
            category="Category 1",
            subcategory="Subcategory 1",
            price=20000,
            condition="New",
            description="Demo Product 2 description",
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            stock=2
        ),
        Product(
            seller_id=3,
            upc="1234567890000003",
            name="Demo Product 3",
            category="Category 1",
            subcategory="Subcategory 1",
            price=30000,
            condition="New",
            description="Demo Product 3 description",
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            stock=3
        ),
        Product(
            seller_id=3,
            upc="1234567890000004",
            name="Demo Product 4",
            category="Category 1",
            subcategory="Subcategory 2",
            price=40000,
            condition="New",
            description="Demo Product 4 description",
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            stock=4
        ),
        Product(
            seller_id=3,
            upc="1234567890000005",
            name="Demo Product 5",
            category="Category 1",
            subcategory="Subcategory 2",
            price=50000,
            condition="New",
            description="Demo Product 5 description",
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            stock=5
        ),
        Product(
            seller_id=4,
            upc="1234567890000006",
            name="Demo Product 6",
            category="Category 2",
            subcategory="Subcategory 1",
            price=60000,
            condition="New",
            description="Demo Product 6 description",
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            stock=6
        ),
        Product(
            seller_id=4,
            name="Demo Product 7",
            category="Category 2",
            subcategory="Subcategory 1",
            price=70000,
            condition="Used",
            description="Demo Product 7 description",
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            stock=7
        ),
        Product(
            seller_id=2,
            name="Demo Product 8",
            category="Category 2",
            subcategory="Subcategory 1",
            price=80000,
            condition="Used",
            description="Demo Product 8 description",
            details="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            stock=8
        )
    ]

    for product in seeds:
        db.session.add(product)
    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))
    db.session.commit()
