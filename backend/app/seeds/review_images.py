from app.models import db, Review_Image, environment, SCHEMA


def seed_review_images():

    papajohns = Review_Image(
        review_id = 4,
        url = 'https://s3-media0.fl.yelpcdn.com/bphoto/wIUiyCceCG5pFT_s5altEA/o.jpg'
    )
    papajohns2 = Review_Image(
        review_id = 4,
        url = 'https://s3-media0.fl.yelpcdn.com/bphoto/PKgnR-GJ3Ypp2WSZdA9gog/300s.jpg'
    )
    tatsu = Review_Image(
        review_id = 2,
        url = 'https://s3-media0.fl.yelpcdn.com/bphoto/AMl4ZRA-i3ngcL2sBQICEg/o.jpg'
    )
    tatsu2 = Review_Image(
        review_id = 7,
        url = 'https://s3-media0.fl.yelpcdn.com/bphoto/8qZFkpOSZEj1Trmur1lWZw/o.jpg'
    )
    ini = Review_Image(
        review_id = 5,
        url = 'https://s3-media0.fl.yelpcdn.com/bphoto/QZQWnkmBr7p0mMEFJ_6f8A/258s.jpg'
    )
    ini2 = Review_Image(
        review_id = 5,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/338ZvIOuE_KFpebKKWQDDg/258s.jpg'
    )
    ini3 = Review_Image(
        review_id = 5,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/A0D-gA4tNduVwQpqWoLqGw/o.jpg'
    )
    fiveguys = Review_Image(
        review_id = 4,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/whpNRA83FPtjfdFcCTPxSA/o.jpg'
    )
    fiveguys2 = Review_Image(
        review_id = 1,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/tZb4JqT-RYQttiW7n2mhCg/o.jpg'
    )
    etta = Review_Image(
        review_id = 3,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/c2DQvXKpgA_R8roH79tluA/o.jpg'
    )





    db.session.add(papajohns)
    db.session.add(tatsu)
    db.session.add(etta)
    db.session.add(fiveguys)
    db.session.add(fiveguys2)
    db.session.add(ini)
    db.session.add(ini2)
    db.session.add(ini3)
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
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM review_images")

    db.session.commit()
