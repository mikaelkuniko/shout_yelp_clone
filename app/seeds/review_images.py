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
    etta2 = Review_Image(
        review_id = 3,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/4iJQNZesEmBZwWPIAqumSg/180s.jpg'
    )
    fiveguys3 = Review_Image(
        review_id = 9,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/0KJhSPv01l5yUrI8DgEbTg/348s.jpg'
    )
    ini4 = Review_Image(
        review_id = 10,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/QKxW6SLK4j4yQRCdSetjrQ/o.jpg'
    )
    tatsu3 = Review_Image(
        review_id = 11,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/3m45eEN004_jKeWzOgXFqQ/o.jpg'
    )
    papajohns3 = Review_Image(
        review_id = 12,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/w_H_JfN-haiHFpCcKwAlgQ/o.jpg'
    )
    beast_company = Review_Image(
        review_id = 13,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/ZeugZ5JtH1v4fKtJ0WuysQ/o.jpg'
    )
    beast_company2 = Review_Image(
        review_id = 14,
        url= 'https://s3-media0.fl.yelpcdn.com/bphoto/5F0Qn6-LObiItcwydGEW9g/o.jpg'
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
    db.session.add(etta2)
    db.session.add(fiveguys3)
    db.session.add(ini4)
    db.session.add(tatsu3)
    db.session.add(papajohns3)
    db.session.add(beast_company)
    db.session.add(beast_company2)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_review_images():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.review_images RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM review_images")

    db.session.commit()
