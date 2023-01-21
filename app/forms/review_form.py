from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, NumberRange

class ReviewForm(FlaskForm):
    review = StringField('review', validators=[DataRequired()])
    stars = IntegerField('user_id', validators=[DataRequired(), NumberRange(1, 5)])
    submit = SubmitField('submit')
