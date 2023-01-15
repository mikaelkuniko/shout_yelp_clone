from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .join_tables import business_amenities

class Amenity(db.Model):
    __tablename__ = 'amenities'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    business = relationship('Business',
                                    secondary=business_amenities,
                                    back_populates='business_amenity')

    def to_dict(self):
        """
        Returns a dict representing Amenity
        {
            id,
            name
        }
        """
        return {
            "id": self.id,
            "name": self.name
        }
