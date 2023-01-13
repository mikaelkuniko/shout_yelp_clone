from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
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

    #--------------------------------------USER CLASS----------------------------------------
    business = relationship('Business', back_populates='user')
    reviews = relationship('Review', back_populates='user')

    user_businesses = relationship("Business",
                                    secondary=favorites,
                                    back_populates='user_favorites')

    useful_review = relationship("Review",
                                secondary=useful_reviews,
                                back_populates="useful")

    cool_review = relationship("Review",
                                secondary=cool_reviews,
                                back_populates="cool")

    funny_review = relationship("Review",
                                secondary=funny_reviews,
                                back_populates="funny")
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
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
