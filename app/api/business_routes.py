from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Business, Review, Business_Image
import json
from sqlalchemy import or_
from ..models.db import db
from ..forms import Search_Form, Business_Form, BusinessImageForm, ReviewForm

business_routes = Blueprint('business', __name__)


# Search businesses
@business_routes.route('/search', methods=['GET'])
def search():
    print('HELLO FROM BACKEND')
    business_search = ""
    location_search = ""
    form = Search_Form()
    if form.errors:
        return {
        "errors": form.errors
        }
    args = request.args
    print("ARGS IN BACKEND", args)
    if "business" in args:
        business_search = args.get('business')
    if "location" in args:
        location_search = args.get('location')
        print("LOCATION IN BACKEND", location_search)

    if not location_search and not business_search:
        businesses = Business.query.all()
        return { "businesses": [business.to_dict() for business in businesses] }

        
    business_id_list = []
    business_query = []
    location_query = []
    businesses = []
    business_set = set()
    if business_search:
        business_list = business_search.split(' ')
        for business_args in business_list:
            business_set.add(business_args)

    if business_search:
        for business_search_params in business_set:
            business_query.append(Business.name.like(f'%{business_search_params}%'))
    if location_search:
        location_query.append(Business.city.ilike(f'%{location_search}%'))
        location_query.append(Business.zip_code.ilike(f'%{location_search}%'))
        location_query.append(Business.state.ilike(f'%{location_search}%'))
        print('LOCATION QUERY', location_query)
        for l_query in location_query:
            # the comma in the filter params is an AND statement
            if business_query:
                for b_query in business_query:
                    business = Business.query.filter(b_query, l_query).all()
                    if business:
                        for biz in business:
                            if biz.id not in business_id_list:
                                businesses.append(biz)
                                business_id_list.append(biz.id)
            else:
                business = Business.query.filter(l_query).all()
                if business:
                        for biz in business:
                            if biz.id not in business_id_list:
                                businesses.append(biz)
                                business_id_list.append(biz.id)

    else:
       for b_query in business_query:
                business = Business.query.filter(b_query).all()
                if business:
                    for biz in business:
                        if biz.id not in business_id_list:
                            businesses.append(biz)

    # print('businesses', businesses)

    return { "businesses": [business.to_dict() for business in businesses] }

# GET ONE
@business_routes.route('/<int:id>')
def get_one(id):
    biz = Business.query.get(id)
    biz_to_dict = biz.to_dict()
    if not biz:
        return {"errors": "Business not found"}, 404
    reviews = Review.query.filter(Review.id == biz_to_dict["id"]).all()
    if biz_to_dict["num_reviews"] == 0:
        review_avg = 0
    else:
        review_avg = biz_to_dict['sum_rating'] / biz_to_dict["num_reviews"]
    biz_to_dict["reviews"] = [review.to_dict() for review in reviews]
    biz_to_dict["review_avg"] = review_avg
    return {"business": biz_to_dict}


# CREATE
@business_routes.route('/new', methods=['POST'])
@login_required
def new_form():
    form = Business_Form()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('This is form data', form.data)
    # print('-------------current
    #  user-----------', current_user.id)
    if form.validate_on_submit():
        new_business = Business()
        form.populate_obj(new_business)
        new_business.owner_id = current_user.id
        db.session.add(new_business)
        db.session.commit()
        return new_business.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400

# UPDATE
@business_routes.route('/<int:id>', methods=['PUT'])
@login_required
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
@login_required
def delete_item(id):
    biz = Business.query.get(id)
    db.session.delete(biz)
    db.session.commit()
    if not biz:
        return {"errors": "Business not found"}, 404
    return {"message": "business deleted"}


# CREATE BUSINESS IMAGE (untested)
@business_routes.route('/<int:id>/images', methods=['POST'])
@login_required
def add_biz_image(id):
    '''
    Creates a new business image to the current business.
    '''
    current_biz = Business.query.get_or_404(id)
    form = BusinessImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    # print('----------this is image form data------------', form.data)
    if not current_biz:
        return {"errors": "Business not found"}, 404

    if form.validate_on_submit():
        new_business_image = Business_Image()
        form.populate_obj(new_business_image)
        current_biz.images.append(new_business_image)
        db.session.add(new_business_image)
        db.session.commit()
        return new_business_image.to_dict(), 201

    if form.errors:
        return {
             "errors": form.errors
        }, 400

# GET ALL REVIEWS FOR BUSINESS (untested)
# @business_routes.route('/<int:id>/reviews')
# def current_reviews(id):
#     '''
#     Gets all the reviews of the business
#     '''

#     current_biz = Business.query.get_or_404(id)
#     if not current_biz:
#         return {"errors": "Business not found"}, 404
#     # if len(current_biz.reviews == 0):
#     #     return {"alert": "Business has not been reviewed"}
#     else:
#         return {"businessReviews": [review.to_dict() for review in current_biz.reviews]}

# CREATE REVIEW FOR BUSINESS (untested)
@business_routes.route('/<int:id>/reviews', methods=['POST'])
@login_required
def create_review(id):
    '''
    Creates a review for a business
    '''
    current_biz = Business.query.get_or_404(id)

    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if not current_biz:
        return {"errors": "Business not found"}, 404

    if form.validate_on_submit():
        new_review = Review()
        form.populate_obj(new_review)
        new_review.business_id = id
        new_review.user = current_user
        current_biz.reviews.append(new_review)
        db.session.add(new_review)
        db.session.commit()

        return new_review.to_dict(), 200

    if form.errors:
        return {
            "errors": form.errors
        }, 400
