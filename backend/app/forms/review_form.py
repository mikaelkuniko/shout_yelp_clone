from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired

class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    stars = IntegerField('user_id', validators=[DataRequired()])
    submit = SubmitField('submit')
