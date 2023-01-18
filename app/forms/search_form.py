from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Business

class Search_Form(FlaskForm):
    search = StringField('search')
    location = StringField('location')
    submit = SubmitField('submit')
