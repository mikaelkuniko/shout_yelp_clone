from app.models import db, User, Business, Review, Amenity, Type, environment, SCHEMA
from app.models.join_tables import *
import random

def seed_join_tables():
    users = User.query.all()
    businesses = Business.query.all()
    reviews = Review.query.all()
    amenities = Amenity.query.all()
    types = Type.query.all()

    def randomBusiness():
        return businesses[random.randint(0, len(businesses)-1)]
    def randomUser():
        return users[random.randint(0, len(users)-1)]
    def randomReviews():
        return reviews[random.randint(0, len(reviews)-1)]

    # user favorites---------------------------
    for user in users:
         business = randomBusiness()
         user.user_businesses.append(business)
         db.session.add(user)
         print(user.user_businesses)
         db.session.commit()

    # business types----------------------------
    businesses[0].business_type.append(types[0])
    businesses[1].business_type.append(types[1])
    businesses[2].business_type.append(types[0])
    businesses[3].business_type.append(types[0])
    businesses[4].business_type.append(types[1])
    businesses[4].business_type.append(types[2])
    businesses[5].business_type.append(types[3])


    # business amenities------------------------
    businesses[0].business_amenity.append(amenities[0])
    businesses[0].business_amenity.append(amenities[1])
    businesses[0].business_amenity.append(amenities[4])
    businesses[1].business_amenity.append(amenities[1])
    businesses[1].business_amenity.append(amenities[2])
    businesses[1].business_amenity.append(amenities[5])
    businesses[2].business_amenity.append(amenities[0])
    businesses[2].business_amenity.append(amenities[3])
    businesses[2].business_amenity.append(amenities[2])
    businesses[3].business_amenity.append(amenities[5])
    businesses[3].business_amenity.append(amenities[4])
    businesses[3].business_amenity.append(amenities[1])
    businesses[4].business_amenity.append(amenities[2])
    businesses[4].business_amenity.append(amenities[3])
    businesses[4].business_amenity.append(amenities[0])
    businesses[5].business_amenity.append(amenities[5])
    businesses[5].business_amenity.append(amenities[4])
    businesses[5].business_amenity.append(amenities[1])

    for business in businesses:
        db.session.add(business)
        db.session.commit()

    # review useful-----------------------------------------
    for review in reviews:
        user = randomUser()
        review.useful.append(user)
        db.session.add(review)
        db.session.commit()

    # review cool-----------------------------------------
    for review in reviews:
        user = randomUser()
        review.cool.append(user)
        # set_cool = set(review.cool)
        # list_cool = list(set_cool)
        # review.cool = list_cool
        db.session.add(review)
        db.session.commit()

    # review funny-----------------------------------------
    for review in reviews:
        user = randomUser()
        review.funny.append(user)
        db.session.add(review)
        db.session.commit()

def undo_join_tables():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_amenities RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.business_types RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.useful_review RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.cool_review RESTART IDENTITY CASCADE;")
        db.session.execute(f"TRUNCATE table {SCHEMA}.funny_review RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM favorites")
        db.session.execute("DELETE FROM business_amenities")
        db.session.execute("DELETE FROM business_types")
        db.session.execute("DELETE FROM useful_review")
        db.session.execute("DELETE FROM cool_review")
        db.session.execute("DELETE FROM funny_review")

    db.session.commit()

# def undo_join_tables():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.favorites RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM favorites")

#     db.session.commit()

# def undo_join_tables():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.business_amenities RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM business_amenities")

#     db.session.commit()

# def undo_join_tables():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.business_types RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM business_types")

#     db.session.commit()

# def undo_join_tables():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.useful_reviews RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM useful_reviews")

#     db.session.commit()

# def undo_join_tables():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.cool_reviews RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM cool_reviews")

#     db.session.commit()

# def undo_join_tables():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.funny_reviews RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM funny_reviews")

#     db.session.commit()