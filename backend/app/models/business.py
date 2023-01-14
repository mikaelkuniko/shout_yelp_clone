from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from .join_tables import favorites, business_amenities, business_types

class Business(db.Model):
    __tablename__ = 'businesses'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(2000), nullable=False)
    phone_number = db.Column(db.String(10), nullable=False)
    business_url = db.Column(db.String(500), nullable=False)
    address = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    state = db.Column(db.String(100), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    zip_code = db.Column(db.String(5), nullable=False)
    preview_image = db.Column(db.Integer, nullable=False)
    open = db.Column(db.String(15))
    close = db.Column(db.String(15))

    user = relationship('User', back_populates='business')
    images = relationship('Business_Image', back_populates='business')
    reviews = relationship('Review', back_populates='business')

    user_favorites = relationship("User",
                                secondary=favorites,
                                back_populates='user_businesses')

    business_amenity = relationship('Amenity',
                                    secondary=business_amenities,
                                    back_populates='business')

    business_type = relationship('Type',
                                secondary=business_types,
                                back_populates='business')


    def to_dict(self):
        """
        Returns a dict representing Business
        {
            id,
            owner_id,
            name,
            description,
            phone_number,
            business_url,
            address,
            city,
            state,
            country,
            preview_image,
            open,
            close
        }
        """
        return {
            "id": self.id,
            "owner_id": self.owner_id,
            "name": self.name,
            "description": self.description,
            "phone_number": self.phone_number,
            "business_url": self.business_url,
            "address": self.address,
            "city": self.city,
            "state": self.state,
            "country": self.country,
            "preview_image": self.preview_image,
            "open": self.open,
            "close": self.close
        }


class Business_Image(db.Model):
    __tablename__ = 'business_images'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    business_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("businesses.id")))
    url = db.Column(db.String(500), nullable=False)

    business = relationship('Business', back_populates='images')

    def to_dict(self):
        """
        Returns a dict representing Business Image
        {
            id,
            business_id,
            url
        }
        """
        return {
            "id": self.id,
            "business_id": self.business_id,
            "url": self.url
        }
