from flask.cli import AppGroup
from .users import seed_users, undo_users
from .types import seed_types, undo_types
from .businesses import seed_businesses, undo_businesses
from .amenities import seed_amenities, undo_amenities
from .reviews import seed_reviews, undo_reviews
from .business_images import seed_business_images, undo_business_images

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_types()
        undo_businesses()
        undo_amenities()
        undo_reviews()
        undo_business_images()
    seed_users()
    seed_types()
    seed_businesses()
    seed_amenities()
    seed_reviews()
    seed_business_images()


# Creates the `flask seed users` command
@seed_commands.command('users')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
    seed_users()
    # Add other seed functions here

# types
@seed_commands.command('types')
def seed():
    if environment == 'production':
        undo_types()
    seed_types()

# businesses
@seed_commands.command('businesses')
def seed():
    if environment == 'production':
        undo_businesses()
    seed_businesses()

# amenities
@seed_commands.command('amenities')
def seed():
    if environment == 'production':
        undo_amenities()
    seed_amenities()

# reviews
@seed_commands.command('reviews')
def seed():
    if environment == 'production':
        undo_reviews()
    seed_reviews()

# business images
@seed_commands.command('business_images')
def seed():
    if environment == 'production':
        undo_business_images()
    seed_business_images()

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    # Add other undo functions here
    undo_types()
    undo_businesses()
    undo_amenities()
    undo_reviews()
    undo_business_images()

# # types
# @seed_commands.command('undo')
# def undo():
#     undo_types()

# # businesses
# @seed_commands.command('undo')
# def undo():
#     undo_businesses()

# # amenities
# @seed_commands.command('undo')
# def undo():
#     undo_amenities()

# # reviews
# @seed_commands.command('undo')
# def undo():
#     undo_reviews()
