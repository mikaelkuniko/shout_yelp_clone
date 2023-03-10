from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from .join_tables import useful_reviews, cool_reviews, funny_reviews

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")))
    review = db.Column(db.String(2000), nullable=False)
    stars = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    user = db.relationship('User', back_populates='reviews')
    business = db.relationship('Business', back_populates='reviews')
    images = db.relationship('Review_Image', back_populates='review', cascade='all, delete-orphan')

    useful = db.relationship("User",
                        secondary=useful_reviews,
                        back_populates="useful_review")

    cool = db.relationship("User",
                        secondary=cool_reviews,
                        back_populates="cool_review")

    funny = db.relationship("User",
                        secondary=funny_reviews,
                        back_populates="funny_review")

    def to_dict(self):
        """
        Returns a dict representing Review
        {
            id,
            user,
            business_id,
            review,
            stars,
            images,
            useful,
            cool,
            funny
            created_at,
            updated_at,
        }
        """
        return {
            "id": self.id,
            "user": self.user.to_dict_info(),
            "business_id": self.business_id,
            "review": self.review,
            "stars": self.stars,
            "images": [image.to_dict() for image in self.images],
            "useful": len(self.useful),
            "cool": len(self.cool),
            "funny": len(self.funny),
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

class Review_Image(db.Model):
    __tablename__ = 'review_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("reviews.id")))
    url = db.Column(db.String(500), nullable=False)

    review = relationship('Review', back_populates='images')

    def to_dict(self):
        """
        Returns a dict representing Review Image
        {
            id,
            review_id,
            url
        }
        """
        return {
            "id": self.id,
            "review_id": self.review_id,
            "url": self.url,
        }
