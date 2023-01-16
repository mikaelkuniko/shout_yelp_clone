from app.models import db, User, Business, Review, Amenity, environment, SCHEMA
from app import app
import random

with app.app_context():
    users = User.query.all()
    businesses = Business.query.all()
    reviews = Review.query.all()
    amenities = Amenity.query.all()
    # amenities = amenity.query.all()

    # print('Users', users)
    # print('Businesses', businesses)
    # print('Reviews', reviews)
    # print('Amenitites', amenities)
    # print('amenities', amenities)

    def randomBusiness():
        return businesses[random.randint(0, len(businesses)-1)]

    # users[0].user_businesses.append(randomBusiness())
    # db.session.add(users[0])
    # db.session.commit()

    # user favorites---------------------------
    # for user in users:
    #      business = randomBusiness()
    #      user.user_businesses.append(business)
    #      db.session.add(user)
    #      print(user.user_businesses)
    #      db.session.commit()

    # business types----------------------------
    # businesses[0].business_type.append(type[0])    
    # businesses[1].business_type.append(type[1])    
    # businesses[2].business_type.append(type[0])    
    # businesses[3].business_type.append(type[0])    
    # businesses[4].business_type.append(type[1])       
    # businesses[4].business_type.append(type[2])       
    # businesses[5].business_type.append(type[3])    


    # business amenities------------------------
    # businesses[0].business_amenity.append(amenities[0])    
    # businesses[0].business_amenity.append(amenities[1])    
    # businesses[0].business_amenity.append(amenities[4])    
    # businesses[1].business_amenity.append(amenities[1])    
    # businesses[1].business_amenity.append(amenities[2])    
    # businesses[1].business_amenity.append(amenities[5])    
    # businesses[2].business_amenity.append(amenities[0])    
    # businesses[2].business_amenity.append(amenities[3])    
    # businesses[2].business_amenity.append(amenities[2])    
    # businesses[3].business_amenity.append(amenities[5])    
    # businesses[3].business_amenity.append(amenities[4])    
    # businesses[3].business_amenity.append(amenities[1])    
    # businesses[4].business_amenity.append(amenities[2])       
    # businesses[4].business_amenity.append(amenities[3])       
    # businesses[4].business_amenity.append(amenities[0])       
    # businesses[5].business_amenity.append(amenities[5])    
    # businesses[5].business_amenity.append(amenities[4])    
    # businesses[5].business_amenity.append(amenities[1])    

    # for business in businesses:
    #     db.session.add(business)
    # db.session.commit()

    # review useful
    


# # Adds a demo user, you can add other users here if you want
# def seed_users():
#     demo = User(
#         username='Demo', email='demo@aa.io', password='password')
#     marnie = User(
#         username='marnie', email='marnie@aa.io', password='password')
#     jimbo = User(
#         username='jimbo', email='jimbo@aa.io', password='password')
#     bobbert = User(
#         username='bobbert', email='bobbert@aa.io', password='password')
#     chaddington = User(
#         username='chaddington', email='chaddington@aa.io', password='password')
#     ted = User(
#         username='ted', email='ted@aa.io', password='password')
#     kate = User(
#         username='kate', email='kate@aa.io', password='password')
#     bud = User(
#         username='bud', email='bud@aa.io', password='password')
#     ricky = User(
#         username='ricky', email='ricky@aa.io', password='password')
#     ashton = User(
#         username='ashton', email='ashton@aa.io', password='password')
#     mikael = User(
#         username='mikael', email='mikael@aa.io', password='password')
#     joyce = User(
#         username='joyce', email='joyce@aa.io', password='password')
#     marc = User(
#         username='marc', email='marc@aa.io', password='password')
#     brandon = User(
#         username='brandon', email='brandon@aa.io', password='password')


#     db.session.add(demo)
#     db.session.add(marnie)
#     db.session.add(jimbo)
#     db.session.add(bobbert)
#     db.session.add(chaddington)
#     db.session.add(ted)
#     db.session.add(kate)
#     db.session.add(bud)
#     db.session.add(ricky)
#     db.session.add(ashton)
#     db.session.add(mikael)
#     db.session.add(joyce)
#     db.session.add(marc)
#     db.session.add(brandon)
#     db.session.commit()



# # Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# # have a built in function to do this. With postgres in production TRUNCATE
# # removes all the data from the table, and RESET IDENTITY resets the auto
# # incrementing primary key, CASCADE deletes any dependent entities.  With
# # sqlite3 in development you need to instead use DELETE to remove all data and
# # it will reset the primary keys for you as well.
# def undo_users():
#     if environment == "production":
#         db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
#     else:
#         db.session.execute("DELETE FROM users")

#     db.session.commit()
