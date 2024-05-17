from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text # type: ignore


def seed_users():
    seeds = [
        User(username='Demo', email='demo@aa.io', password='password'),
        User(username='Justin', email='justin@aa.io', password='password'),
        User(username='Astro', email='astro@umail.com', password='password'),
        User(username='SpikeSpiegel', email='spike@umail.com', password='password'),
        User(username='PeppyHare', email='peppyhare@umail.com', password='password'),
        User(username='DocBrown', email='docbrown@umail.com', password='password'),
        User(username='CaptainFalcon', email='captainfalcon@umail.com', password='password'),
        User(username='MasterChief', email='masterchief@umail.com', password='password'),
        User(username='SamusAran', email='samusaran@umail.com', password='password'),
        User(username='BuyNLarge', email='buynlarge@umail.com', password='password'),
        User(username='HSolo', email='hsolo@umail.com', password='password'),
        User(username='Hyperion', email='hyperion@umail.com', password='password'),
        User(username='NERV', email='nerv@umail.com', password='password'),
        User(username='Starfleet', email='starfleet@umail.com', password='password'),
        User(username='MIB', email='mib@umail.com', password='password'),
        User(username='DMaul', email='dmaul@umail.com', password='password'),
        User(username='Chell', email='chell@umail.com', password='password'),
        User(username='VaultDweller', email='vaultdweller@umail.com', password='password'),
        User(username='TenRings', email='tenrings@umail.com', password='password'),
        User(username='Lando', email='lando@umail.com', password='password'),
        User(username='Goku', email='goku@umail.com', password='password'),
        User(username='TheCollector', email='thecollector@umail.com', password='password'),
        User(username='CJones', email='cjones@umail.com', password='password'),
        User(username='WeylandYutaniCorp', email='weylandyutani@umail.com', password='password')
    ]

    for user in seeds:
        db.session.add(user)
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
