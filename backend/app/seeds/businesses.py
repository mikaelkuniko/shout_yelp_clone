from app.models import db, environment, SCHEMA, Business

# Adds a demo user, you can add other users here if you want
def seed_businesses():
    papajohns = Business(
        owner_id=1,
        name='Papajohns',
        description='Mauris in aliquam sem fringilla ut morbi. Sed adipiscing diam donec adipiscing tristique risus. Id semper risus in hendrerit gravida rutrum.',
        phone_number='9781563214',
        business_url='https://www.papajohns.com/',
        address='1801 Alice Street',
        city='Denton',
        state='TX',
        country='USA',
        zip_code='76201',
        preview_image='https://s3-media0.fl.yelpcdn.com/bphoto/e0EPesEFpP9A7_TW1DYpAg/348s.jpg',
        open='9:00 AM',
        close='9:00 PM',
        )

    tatsu = Business(
        owner_id=1,
        name="Tatsu",
        description='''
        Your search for good ramen ends here Our not-so-secret recipe: Tonkotsu broth, slow-cooked & made fresh everyday right in front of you. Pork chashu simmered to perfection. Seasoned soft-boiled that is firm on the outside, soft and gooey on the inside. Marry that with noodles cooked perfectly al dente and you have a ramen bowl so good you have to come back for seconds! Want it spicy? Love garlic? With chicken instead of pork? You are in luck, all our bowls of ramen can be customized via an easy-to-use iPad® ordering system. Vegetarian/Vegan? Come on over, we have a broth-less ramen with oh-so-savory sweet sesame glaze. Oh, and corn, fresh garlic and seaweed toppings are always free!
        ''',
        phone_number='3238799332',
        business_url='https://tatsuramen.com',
        address='711 Melrose Ave',
        city='Los Angeles',
        state='CA',
        country='USA',
        zip_code = '90046',
        preview_image='https://s3-media0.fl.yelpcdn.com/bphoto/UyWh2n4YdPiDXbDThkZxCw/l.jpg',
        open='11:00 AM',
        close='11:00 PM'
        )

    etta = Business(
        owner_id=2,
        name='Etta',
        description='etta is a neighborhood restaurant that specializes in serving delicious, wood-fired food from our custom hearth in a fun, relaxed dining     environment. etta is where memories are made... where friends and family alike to eat and drink as if they are in their own home.',
        phone_number='1234567890',
        business_url='https://www.ettarestaurant.com/',
        address='password',
        city='Los Angeles',
        state='CA',
        country='USA',
        zip_code='90232',
        preview_image='https://s3-media0.fl.yelpcdn.com/bphoto/C0MbfZGgO_2VgL09LHrC_w/348s.jpg',
        open='5:00 PM',
        close='10:00 PM'
        )

    five_guys = Business(
        owner_id=3,
        name='Five Guys',
        description="Your nearby Five Guys is ready to offer you a classic take on burgers, hot dogs, fries, milkshakes and more. Whether it's using fresh ground beef (there are no freezers in our restaurants), double-cooking our fries in 100 percent peanut oil, hand-preparing fresh ingredients every morning or serving peanuts while you wait, we strive to provide the best experience each and every time you visit. With more than 250,000 ways to customize your burger and 1,000+ milkshake combinations, satisfying your craving is just a click away.",
        phone_number='4437815249',
        business_url='https://www.fiveguys.com/',
        address='3600 Boston St',
        city='Baltimore',
        state='MD',
        country='USA',
        zip_code='91745',
        preview_image='https://s3-media0.fl.yelpcdn.com/bphoto/qjRKSO__un5V7A4W-mPZ0Q/l.jpg',
        open='11:00 AM',
        close='10:00 PM'
        )

    ini =  Business(
        owner_id=4,
        name="INI Ristorante",
        description='''
        Established in 2022. Leave your assumptions at the door and come experience our Japanese-Italian
interpretation through unique culinary offerings, hospitality, and fine-casual ambiance. A restaurant
by Kei Concepts.
''',
        phone_number='7142774046',
        business_url='http://www.iniristorante.com',
        address='16129 Brookhurst Street',
        city='Fountain Valley',
        state='CA',
        country='USA',
        zip_code = '92708',
        preview_image='https://s3-media0.fl.yelpcdn.com/bphoto/jh7LHPoCj-nlh12eSwIv1A/l.jpg',
        open='10:00 AM',
        close='10:00 PM'
        )

    the_beast_and_company = Business(
        owner_id=1,
        name="The Beast and Company",
        description='''
        Chef/Owner Dustin Lee and Executive Chef Michael Arlt are telling the story of the diversity of southern cuisine through everyone's eyes. Housed in a former World War 2 era artillery warehouse, you'll find dishes inspired by Cajun, Creole, Southeast Asian, and Afro-Caribbean traditions at The Beast and Co. The Beast and Co. also offers a full bar with cocktails inspired by the food and one of Fort Worth's most interesting wine menus.
        ''',
        phone_number='8179451461',
        business_url='http://thebeastandco.com',
        address='1010 W Magnolia Ave',
        city='Fort Worth',
        state='TX',
        country='USA',
        zip_code='77018',
        preview_image='https://s3-media0.fl.yelpcdn.com/bphoto/Xr9EucTmLMFFpCqsPUDOXA/l.jpg',
        open='5:00 PM',
        close='11:00 PM'
        )

    db.session.add(papajohns)
    db.session.add(tatsu)
    db.session.add(etta)
    db.session.add(five_guys)
    db.session.add(ini)
    db.session.add(the_beast_and_company)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_businesses():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.businesses RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM businesses")

    db.session.commit()
