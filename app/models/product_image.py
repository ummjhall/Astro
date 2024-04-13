from .db import db, environment, SCHEMA, add_prefix_for_prod


class ProductImage(db.Model):
    __tablename__ = 'product_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    url = db.Column(db.String(255), nullable=False)
    thumbnail = db.Column(db.Boolean, nullable=False)

    product = db.relationship('Product', back_populates='product_images', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'image_id': self.id,
            'product_id': self.product_id,
            'url': self.url,
            'thumbnail': self.thumbnail
        }
