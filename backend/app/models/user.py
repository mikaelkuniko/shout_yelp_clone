from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .join_tables import favorites, useful_reviews, cool_reviews, funny_reviews




class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    profile_pic = db.Column(db.String(1000))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    #--------------------------------------USER CLASS----------------------------------------
    business = relationship('Business', back_populates='user')
    reviews = relationship('Review', back_populates='user', cascade='all, delete')

    user_businesses = relationship("Business",
                                    secondary=favorites,
                                    back_populates='user_favorites',
                                    cascade='all, delete')

    useful_review = relationship("Review",
                                secondary=useful_reviews,
                                back_populates="useful",
                                cascade='all, delete')

    cool_review = relationship("Review",
                                secondary=cool_reviews,
                                back_populates="cool",
                                cascade='all, delete')

    funny_review = relationship("Review",
                                secondary=funny_reviews,
                                back_populates="funny",
                                cascade='all, delete')
    #----------------------------------------------------------------------------------------

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        '''
        Returns a dict representing User
        {
            id,
            username,
            email,
            profile_pic,
            business,
            reviews,
            user_businesses
        }
        '''
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profile_pic": self.profile_pic,
            "business": [business.to_dict_no_user() for business in self.business],
            "reviews": [review.to_dict() for review in self.reviews],
            "user_businesses": [business.to_dict_no_user() for business in self.user_businesses],
            # "useful_review": [useful.to_dict() for useful in self.useful_review],
            # "cool_review": [cool.to_dict() for cool in self.cool_review],
            # "funny_review": [funny.to_dict() for funny in self.funny_review],
        }

    def to_dict_none(self):
        '''
        Returns a dict representing User without relationships
        {
            id,
            username,
            email,
            profile_pic
        }
        '''
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            "profile_pic": self.profile_pic,
        }
