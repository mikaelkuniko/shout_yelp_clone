from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Business
from sqlalchemy import or_
from ..models.db import db
from ..forms import Search_Form, Business_Form

business_routes = Blueprint('business', __name__)



@business_routes.route('/search', methods=['POST'])
def search():
    business_search = request.form.get("search")
    print("BUSINESS SEARCH: ", business_search, not business_search)
    location_search = request.form.get("location")
    print("LOCATION SEARCH: ", location_search, not location_search)
    print("BOOLEAN STUFF: ", not business_search and not location_search)
    if(not business_search and not location_search):
        businesses = Business.query.all()
        return { 'businesses': [business.to_dict() for business in businesses] }
    else:
        # if(business_search):
        #     business_query = business_search.strip()
        # if(location_search):
        #     location_query = location_search.strip()
        business_query =business_search.strip() if business_search else 'blosmoga'
        location_query =location_search.strip() if location_search else 'blosmoga'
        print('BUSINESS QUERY', business_query)
        print('BUSINESS TYPE: ', Business.query.get(1).business_type)
        results = Business.query.filter(
        or_(
        Business.name.ilike('%' + business_query + '%'),
        Business.city.ilike('%' + location_query + '%'),
        Business.zip_code.ilike('%' + location_query + '%'),
        Business.state.ilike('%' + location_query + '%')
        ))
        # businesses = Business.query.all()
        # for business in businesses:
        #     for type in business.business_type:
        #         if(business_search.lower()==type.lower() and ):

        #             results.append(business.to_dict())
        return {'businesses': [result.to_dict() for result in results]}


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
    if not biz:
        return {"errors": "Business not found"}, 404
    return {"message": "business deleted"}
