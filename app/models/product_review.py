from .db import db, environment, SCHEMA, add_prefix_for_prod


class ProductReview(db.Model):
    __tablename__ = 'product_reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_upc = db.Column(db.String(16), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    review_text = db.Column(db.Text, nullable=False)

    user = db.relationship('User', back_populates='product_reviews')

    def to_dict(self):
        return {
            'review_id': self.id,
            'product_upc': self.product_upc,
            'user_id': self.user_id,
            'rating': self.rating,
            'review_text': self.review_text
        }
