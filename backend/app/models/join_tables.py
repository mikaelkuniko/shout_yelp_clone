from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.schema import Column, ForeignKey, Table
from .db import add_prefix_for_prod
Base = declarative_base()

favorites = Table(
    "favorites",
    Base.metadata,
    Column("user_id", ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    Column("business_id", ForeignKey(add_prefix_for_prod("businesses.id")), primary_key=True)
)

business_amenities = Table(
    "business_amenities",
    Base.metadata,
    Column("amenity_id", ForeignKey(add_prefix_for_prod("amenities.id")), primary_key=True),
    Column("business_id", ForeignKey(add_prefix_for_prod("businesses.id")), primary_key=True)
)

business_types = Table(
    "business_types",
    Base.metadata,
    Column("type_id", ForeignKey(add_prefix_for_prod("types.id")), primary_key=True),
    Column("business_id", ForeignKey(add_prefix_for_prod("businesses.id")), primary_key=True)
)

useful_reviews = Table(
    "useful_review",
    Base.metadata,
    Column("review_id", ForeignKey(add_prefix_for_prod("review.id")), primary_key=True),
    Column("user_id", ForeignKey(add_prefix_for_prod("user.id")), primary_key=True)
)

cool_reviews = Table(
    "cool_review",
    Base.metadata,
    Column("review_id", ForeignKey(add_prefix_for_prod("review.id")), primary_key=True),
    Column("user_id", ForeignKey(add_prefix_for_prod("user.id")), primary_key=True)
)

funny_reviews = Table(
    "funny_review",
    Base.metadata,
    Column("review_id", ForeignKey(add_prefix_for_prod("review.id")), primary_key=True),
    Column("user_id", ForeignKey(add_prefix_for_prod("user.id")), primary_key=True)
)
