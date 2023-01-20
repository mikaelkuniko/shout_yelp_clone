from .db import db, environment, SCHEMA, add_prefix_for_prod
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .join_tables import business_types

class Type(db.Model):
    __tablename__ = 'types'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True), default=func.now())
    updated_at = db.Column(db.DateTime(timezone=True), default=func.now())

    business = db.relationship('Business',
                                secondary=business_types,
                                back_populates='business_type')

    def to_dict(self):
        """
        Returns a dict representing Type
        {
            id,
            type
        }
        """
        return {
            "id": self.id,
            "type": self.type,
        }
