from app.models import db, Type, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_types():
    american = Type(
        type="American"
        )

    japanese = Type(
        type="Japanese"
    )

    italian = Type(
        type='Italian'
    )

    southern = Type(
        type="Southern"
    )


    db.session.add(american)
    db.session.add(japanese)
    db.session.add(italian)
    db.session.add(southern)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_types():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.types RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM types")

    db.session.commit()
