from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def seed_users():
    demo = User(username='Demo', email='demo@aa.io', password='password')
    justin = User(username='Justin', email='justin@aa.io', password='password')
    astro = User(username='Astro', email='astro@umail.com', password='password')
    spike = User(username='SpikeSpiegel', email='spike@umail.com', password='password')

    db.session.add(demo)
    db.session.add(justin)
    db.session.add(astro)
    db.session.add(spike)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == 'production':
        db.session.execute(f'TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;')
    else:
        db.session.execute(text('DELETE FROM users'))
    db.session.commit()
