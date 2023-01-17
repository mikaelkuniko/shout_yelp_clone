from app.models import db, Amenity, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_amenities():
    takeout = Amenity(
        name="Offers Takeout"
        )
    delivery = Amenity(
        name="Offers Delivery"
        )
    credit_card = Amenity(
        name="Accepts Credit Cards"
        )
    apple_pay = Amenity(
        name="Accepts Apple Pay"
        )
    wifi = Amenity(
        name="Offers Wi-Fi"
        )
    masks = Amenity(
        name='Masks Required'
    )



    db.session.add(takeout)
    db.session.add(delivery)
    db.session.add(credit_card)
    db.session.add(apple_pay)
    db.session.add(wifi)
    db.session.add(masks)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_amenities():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.amenities RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM amenities")

    db.session.commit()
