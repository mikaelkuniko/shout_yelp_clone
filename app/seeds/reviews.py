from app.models import db, Review, environment, SCHEMA


def seed_reviews():
    papajohns = Review(
        user_id = 1,
        business_id= 4,
        review = "I always love coming to this location. They always make the pizza's quickly and the quality never diminishes with each visit",
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
        review = 'I heard Five Guys are known to give large batches of fries; however, this particular location did not seem to be as generous with their fries. Their Patty Melt Double Cheeseburger was absolutely greasy and filling! Just how I liked it. The burger was good but the rest of the service was not to par',
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
    etta2  = Review(
        user_id = 2,
        business_id= 3,
        review = "I've been here three or four times already and sampled most of the menu. their focaccia bread is some of the best i've ever had, i'm in love with the pork jowl and oysters, i've never had a bad bite of pizza or pasta, and the meat plates rotate often and are absolutely magnificent. if you're feeling adventurous, pair your meal with a fromage noir cocktail and end it with a celebration shot - you will not be disappointed.",
        stars = 5,
        )
    five_guys2  = Review(
        user_id = 3,
        business_id= 4,
        review = 'Food is good esp when you can order your burger or hot dog with "all the way" toppings which includes onions, pickles, tomatoes and even mushrooms and more!  But watch out, all those toppings makes the burger soggy and sloppy to eat!  Love that they\'re still giving peanuts!',
        stars = 4,
        )
    ini2  = Review(
        user_id = 4,
        business_id= 5,
        review = "Overall, I can say lunch was ok but for $60, I was not full or completely satisfied. Let's be honest, it's a copy cat of North Italia with a flair..but North Italia wins.",
        stars = 3,
        )
    tatsu3  = Review(
        user_id = 5,
        business_id= 2,
        review = "Waited 2+ hours for our party of 8 to be seated. People who arrived while we were 1st in line and waiting for a table were seated before us. It wasn't until we started asking why smaller parties were being seated in the tables that were supposed to be set aside for us that they stopped seating people in the areas that could accommodate large parties.",
        stars = 2,
        )
    papajohns3  = Review(
        user_id = 7,
        business_id= 1,
        review = "Ordered a one topping  (half sausage/half mushroom) large $8.99 pizza this evening. The pizza was one of the most delicious pizzas  I have ever had and the price was great.",
        stars = 5,
        )
    beast_company  = Review(
        user_id = 9,
        business_id= 6,
        review = "I need to preface this with, I have never left a review for a restaurant or anything else for that matter before. I have nothing but good things to say about this place. The service is the best. The art in the restrooms is surprising. The food  is delicious. Order the fish collars, just trust me. Needless to say, they'll be seeing us again.",
        stars = 4,
        )
    beast_company2  = Review(
        user_id = 13,
        business_id= 6,
        review = "Wow! What a great experience this restaurant was. We had an awesome server who helped us pick dishes. None of them disappointed! The lobster bisque was amazing and I think the smoked duck with white beans was our favorite. The drinks were also so well done. Can't wait to come back!",
        stars = 5,
        )
    five_guys3  = Review(
        user_id = 14,
        business_id= 4,
        review = "Overpriced food ! I used to love this place and thought the burgers were bomb but the food is crazy overpriced, not worth it, workers are rude and don't acknowledge you . Take your hard earned money elsewhere",
        stars = 2,
        )


    db.session.add(papajohns)
    db.session.add(tatsu)
    db.session.add(etta)
    db.session.add(five_guys)
    db.session.add(ini)
    db.session.add(papajohns2)
    db.session.add(tatsu2)
    db.session.add(etta2)
    db.session.add(five_guys2)
    db.session.add(ini2)
    db.session.add(tatsu3)
    db.session.add(papajohns3)
    db.session.add(beast_company)
    db.session.add(beast_company2)
    db.session.add(five_guys3)
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
