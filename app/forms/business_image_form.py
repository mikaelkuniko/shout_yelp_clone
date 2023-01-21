from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, URL

class BusinessImageForm(FlaskForm):
    business_id = IntegerField('business_id', validators=[DataRequired()])
    url = StringField('url', validators=[DataRequired(), URL()])
    submit = SubmitField('submit')
