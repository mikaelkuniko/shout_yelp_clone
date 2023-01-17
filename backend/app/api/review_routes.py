from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Review
from sqlalchemy import or_
from ..models.db import db
from ..forms import Search_Form, Business_Form

review_routes = Blueprint('review', __name__)

@review_routes.route('/')
def all_reviews():
    reviews = Review.query.all()
    return jsonify(reviews)
