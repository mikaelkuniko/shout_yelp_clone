from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, URL

class ReviewImageForm(FlaskForm):
    review_id = IntegerField('review_id', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired(), URL()])
    submit = SubmitField('submit')
