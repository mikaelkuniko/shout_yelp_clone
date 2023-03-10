"""empty message

Revision ID: 97e0a9b65630
Revises: f6e346c4d9a8
Create Date: 2023-01-22 21:23:13.334938

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = '97e0a9b65630'
down_revision = 'f6e346c4d9a8'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('businesses', sa.Column('menu_url', sa.String(length=1000), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('businesses', 'menu_url')
    # ### end Alembic commands ###
