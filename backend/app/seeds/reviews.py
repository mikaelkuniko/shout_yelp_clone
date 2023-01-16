from app.models import db, Review, environment, SCHEMA


def seed_reviews():
    papajohns = Review(
        user_id = 1,
        business_id= 4,
        review = "I always love coming to this location. They always make the pizza's quickly and the quality never diminishes with each visit.",
        stars = 4,
        )
    papajohns2 = Review(
        user_id = 12,
        business_id= 1,
        review = "I used to love Papa John's but unfortunately the quality has gone down immensely. I normally wouldn't say things like this but its quality is close to cardboard. I still love the garlic dip though!",
        stars = 1,
        )
    tatsu = Review(
        user_id = 11,
        business_id= 2,
        review = 'I absolutely love the Bold Ramen here. The broth is super rich and filling and the egg is always soft boiled and cooked to perfection.',
        stars = 5,
        )
    ini = Review(
        user_id = 11,
        business_id= 5,
        review = 'We ordered the Miso Carbonara, Seafood Malfadine, Bone Marrow Toast, as well as a Margehrita Pizza. They were all delicious and our particular favorite was the Seafood Malfadine. The drinks were also delicious! We ordered a Harvest Moon and Yuzu-Rita.',
        stars = 5,
        )
    five_guys = Review(
        user_id = 14,
        business_id= 4,
        review = 'I heard Five Guys are known to give large batches of fries; however, this particular location did not seem to be as generous with their fries. Their Patty Melt Double Cheeseburger was absolutely greasy and filling! Just how I liked it. The burger was good but the rest of the service was not to par.',
        stars = 3,
        )
    etta = Review(
        user_id = 12,
        business_id= 3,
        review = "The Focaccia bread is to die for! Crispy and flavorful on the outside, soft and fluffy on the inside. It is cooked to perfection. I also enjoyed the alla vodka pasta. Paired so well with the seasonal drinks from the bar! Awesome place.",
        stars = 5,
    )
    tatsu2  = Review(
        user_id = 12,
        business_id= 2,
        review = "What a great way to end my day. The hot and deep flavor of the soup healed my soul after a long day at work. The noodles had great texture and service was amazing even at such a late time. Will definitely come again.",
        stars = 4,
        )


    db.session.add(papajohns)
    db.session.add(tatsu)
    db.session.add(etta)
    db.session.add(five_guys)
    db.session.add(ini)
    db.session.add(papajohns2)
    db.session.add(tatsu2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM reviews")

    db.session.commit()
