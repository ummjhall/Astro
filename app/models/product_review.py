from .db import db, environment, SCHEMA, add_prefix_for_prod


class ProductReview(db.Model):
    __tablename__ = 'product_reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=False)

    user = db.relationship('User', back_populates='product_reviews')
    product = db.relationship('Product', back_populates='product_reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'product_upc': self.product_upc,
            'rating': self.rating,
            'review_text': self.review_text
        }
