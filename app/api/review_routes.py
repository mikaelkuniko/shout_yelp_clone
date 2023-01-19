from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review
from sqlalchemy import or_
from ..models import db, Review, Review_Image
from ..forms import ReviewImageForm, ReviewForm

review_routes = Blueprint('review', __name__)

@review_routes.route('')
def all_reviews():
    '''
    Queries for the all of the reviews in the database
    '''
    reviews = Review.query.all()
    all_reviews = []
    for review in reviews:
        # print(review.to_dict())
        all_reviews.append(review.to_dict())
        # print("Hi there")
        # print({"Reviews": all_reviews})
    # return {"Reviews": [review.to_dict() for review in reviews]}
    return {"Reviews": all_reviews}


@review_routes.route('/current')
@login_required
def user_reviews():
    '''
    Queries for all of the reviews for the current logged in user
    '''
    user = current_user.to_dict()

    return {"userReviews": [review for review in user["reviews"]]}


@review_routes.route('/<int:id>/images', methods=["POST"])
@login_required
def review_image(id):
    '''
    Creates a review image to the review you are adding
    '''
    review = Review.query.get_or_404(id)

    if not review:
        return { "errors": "Review not found"}, 404

    form = ReviewImageForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_review_image = Review_Image()
        form.populate_obj(new_review_image)
        review.images.append(new_review_image)
        db.session.add(new_review_image)
        db.session.commit()

        return new_review_image.to_dict(), 200

    if form.errors:
        return {
            "errors": form.errors
        }, 400


@review_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_review(id):
    '''
    Edits the specified review
    '''
    review = Review.query.get(id)

    if not review:
        return { "errors": "Review not found"}, 404

    if current_user != review.user_id:
        return { "errors": "Forbidden"}, 403

    form = ReviewForm()

    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        form.populate_obj(review)
        db.session.add(review)
        db.session.commit()

        return review.to_dict(), 201

    if form.errors:
        return {
            "errors": form.errors
        }, 400


@review_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_review(id):
    '''
    Deletes the specified review
    '''
    review = Review.query.get(id)

    if not review:
        return { "errors": "Review not found"}, 404

    if current_user != review.user:
        return { "errors": "Forbidden"}, 403

    db.session.delete(review)
    db.session.commit()

    return { "message": "Successfully deleted review"}, 200
