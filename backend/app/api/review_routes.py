from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Review
from sqlalchemy import or_
from ..models.db import db

review_routes = Blueprint('review', __name__)

@review_routes.route('/')
def all_reviews():
    reviews = Review.query.all()
    all_reviews = []
    for review in reviews:
        # print(review.to_dict())
        all_reviews.append(review.to_dict())
        # print({"Reviews": all_reviews})
    # return {"Reviews": [review.to_dict() for review in reviews]}
    return {"Reviews": all_reviews}
