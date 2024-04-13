from .db import db, environment, SCHEMA, add_prefix_for_prod


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    seller_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    upc = db.Column(db.BigInteger)
    name = db.Column(db.String(100), nullable=False)
    category = db.Column(db.String(30), nullable=False)
    subcategory = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    condition = db.Column(db.String(20), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    details = db.Column(db.Text)
    stock = db.Column(db.Integer, nullable=False)

    user = db.relationship('User', back_populates='products')
    product_reviews = db.relationship('ProductReview', back_populates='product', cascade='all, delete-orphan')
    product_images = db.relationship('ProductImage', back_populates='product', cascade='all, delete-orphan')
    carts = db.relationship('Cart', secondary=add_prefix_for_prod('carts_items'), back_populates='products')

    def to_dict(self):
        return {
            'product_id': self.id,
            'seller_id': self.seller_id,
            "upc": self.upc,
            "name": self.name,
            "category": self.category,
            "subcategory": self.subcategory,
            "price": self.price,
            "condition": self.condition,
            "description": self.description,
            "details": self.details,
            "stock": self.stock
        }
