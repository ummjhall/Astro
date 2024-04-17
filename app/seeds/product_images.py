from app.models import db, ProductImage, environment, SCHEMA
from sqlalchemy.sql import text


def seed_product_images():
    seeds = [
        ProductImage(
            product_id=1,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=True
        ),
        ProductImage(
            product_id=2,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=True
        ),
        ProductImage(
            product_id=2,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=3,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=True
        ),
        ProductImage(
            product_id=3,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=3,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=4,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=True
        ),
        ProductImage(
            product_id=4,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=4,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=4,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=5,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=True
        ),
        ProductImage(
            product_id=5,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=5,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=6,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=True
        ),
        ProductImage(
            product_id=6,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=6,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=7,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=True
        ),
        ProductImage(
            product_id=7,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=7,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=8,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=True
        ),
        ProductImage(
            product_id=8,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        ),
        ProductImage(
            product_id=8,
            url='https://res.cloudinary.com/dt2uyzpbn/image/upload/v1705078503/samples/balloons.jpg',
            thumbnail=False
        )
    ]

    for product_image in seeds:
        db.session.add(product_image)
    db.session.commit()


def undo_product_images():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.product_images RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM product_images'))
    db.session.commit()
