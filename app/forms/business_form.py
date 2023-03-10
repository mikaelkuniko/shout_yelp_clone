from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, IntegerField ,SubmitField
from wtforms.validators import DataRequired, Email, ValidationError, URL
from app.models import Business

class Business_Form(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    description = TextAreaField('description', validators=[DataRequired()])
    phone_number = StringField('phone number', validators=[DataRequired()])
    business_url = StringField('business url', validators=[DataRequired(), URL()])
    address = StringField('address', validators=[DataRequired()])
    city = StringField('city', validators=[DataRequired()])
    state = StringField('state', validators=[DataRequired()])
    country = StringField('country', validators=[DataRequired()])
    zip_code = StringField('zip code', validators=[DataRequired()])
    preview_image = StringField('preview image', validators=[DataRequired(), URL()])
    menu_url = StringField('menu url', validators=[DataRequired(), URL()])
    open = StringField('open', validators=[DataRequired()])
    close = StringField('close', validators=[DataRequired()])
    submit = SubmitField('submit')
