from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from app.models import User, Business, db
from app.models.join_tables import favorites

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>/favorite', methods=['DELETE'])
@login_required
def delete_favorite(id):
    """
    Delete the business from user_businesses if they decide to unfavorite it
    """
    current = current_user.to_dict()
    user = User.query.get(current['id'])

    if len(user.user_businesses):
        for i in range(len(user.user_businesses)):
            if user.user_businesses[i].id == id:
                user.user_businesses.pop(i)

                db.session.add(user)
                db.session.commit()

                return {'message': 'deleted favorited business'}
        
    # print(user.user_businesses[0])
    return {"errors": "Business not found"}, 404

@user_routes.route('/<int:id>/favorite', methods=['POST'])
@login_required
def add_favorite(id):
    """
    Adds the business to user_businesses if they decide to favorite it
    """
    current = current_user.to_dict()
    user = User.query.get(current['id'])
    business = Business.query.get(id)

    user.user_businesses.append(business)
    db.session.add(user)
    db.session.commit()

    return {"message": "Business added"}, 200
    

# @business_routes.route('/<int:id>', methods=['DELETE'])
# @login_required
# def delete_item(id):
#     biz = Business.query.get(id)
#     db.session.delete(biz)
#     db.session.commit()
#     if not biz:
#         return {"errors": "Business not found"}, 404
#     return {"message": "business deleted"}