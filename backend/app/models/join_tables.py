from .db import add_prefix_for_prod, db, environment, SCHEMA
from sqlalchemy.sql import func

favorites = db.Table(
    "favorites",
    db.Model.metadata,
    db.Column("user_id", db.ForeignKey(
        add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("business_id", db.ForeignKey(
        add_prefix_for_prod("businesses.id")), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())
)

business_amenities = db.Table(
    "business_amenities",
    db.Model.metadata,
    db.Column("amenity_id", db.ForeignKey(
        add_prefix_for_prod("amenities.id")), primary_key=True),
    db.Column("business_id", db.ForeignKey(
        add_prefix_for_prod("businesses.id")), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())
)

business_types = db.Table(
    "business_types",
    db.Model.metadata,
    db.Column("type_id", db.ForeignKey(
        add_prefix_for_prod("types.id")), primary_key=True),
    db.Column("business_id", db.ForeignKey(
        add_prefix_for_prod("businesses.id")), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())
)

useful_reviews = db.Table(
    "useful_review",
    db.Model.metadata,
    db.Column("review_id", db.ForeignKey(
        add_prefix_for_prod("reviews.id")), primary_key=True),
    db.Column("user_id", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())
)

cool_reviews = db.Table(
    "cool_review",
    db.Model.metadata,
    db.Column("review_id", db.ForeignKey(
        add_prefix_for_prod("reviews.id")), primary_key=True),
    db.Column("user_id", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())
)

funny_reviews = db.Table(
    "funny_review",
    db.Model.metadata,
    db.Column("review_id", db.ForeignKey(
        add_prefix_for_prod("reviews.id")), primary_key=True),
    db.Column("user_id", db.ForeignKey(add_prefix_for_prod("users.id")), primary_key=True),
    db.Column("created_at", db.DateTime(timezone=True), default=func.now())
)

if environment == "production":
    favorites.schema = SCHEMA
    business_amenities.schema = SCHEMA
    business_types.schema = SCHEMA
    useful_reviews.schema = SCHEMA
    cool_reviews.schema = SCHEMA
    funny_reviews.schema = SCHEMA
