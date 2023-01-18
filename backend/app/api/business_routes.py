from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Business, Review
import json
from sqlalchemy import or_
from ..models.db import db
from ..forms import Search_Form, Business_Form

business_routes = Blueprint('business', __name__)



@business_routes.route('/search', methods=['POST'])
def search():
    form = Search_Form()

    data = form.data
    business_search = data["search"] # request.args.get["search"]
    location_search = data["location"] # request.args.get["location"]

    business_query = []
    location_query = []
    businesses = []

    if business_search:
        business_query.append(Business.name.like(f'%{business_search}%'))
    if location_search:
        location_query.append(Business.city.ilike(f'%{location_search}%'))
        location_query.append(Business.zip_code.ilike(f'%{location_search}%'))
        location_query.append(Business.state.ilike(f'%{location_search}%'))

        for query in location_query:
            business = Business.query.filter(*business_query, query).all()
            print('BUSINESS -----------', business)
            if business:
                for biz in business:
                    businesses.append(biz)
    else:
        business = Business.query.filter(*business_query).all()
        if business:
            businesses.append(*business)

    print('businesses', businesses)

    return { "businesses": [business.to_dict() for business in businesses] }

# GET ONE
@business_routes.route('/<int:id>')
def get_one(id):
    biz = Business.query.get(id)
    biz_to_dict = biz.to_dict()
    if not biz:
        return {"errors": "Business not found"}, 404
    reviews = Review.query.filter(Review.id == biz_to_dict["id"]).all()
    print("-------------------------", reviews)
    review_avg = biz_to_dict['sum_rating'] / biz_to_dict["num_reviews"]
    biz_to_dict["reviews"] = [review.to_dict() for review in reviews]
    biz_to_dict["review_avg"] = review_avg
    print("----------------------------", biz_to_dict)
    return {"business": biz_to_dict}


# CREATE
@business_routes.route('/new', methods=['POST'])
def new_form():
    form = Business_Form()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_business = Business()
        form.populate_obj(new_business)

        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400

# UPDATE
@business_routes.route('/<int:id>', methods=['PUT'])
def update_business_by_id(id):
    current_biz = Business.query.get(id)

    if not current_biz:
        return {"errors": "Business not found"}, 404

    form = Business_Form()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(current_biz)

        db.session.add(current_biz)
        db.session.commit()
        return current_biz.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400

# DELETE
@business_routes.route('/<int:id>', methods=['DELETE'])
def delete_item(id):
    biz = Business.query.get(id)
    db.session.delete(biz)
    db.session.commit()
    if not biz:
        return {"errors": "Business not found"}, 404
    return {"message": "business deleted"}
