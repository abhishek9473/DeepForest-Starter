"""Create users table

Revision ID: 9d91716f1bc3
Revises: 
Create Date: 2024-07-19 22:26:27.924835

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision: str = '9d91716f1bc3'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # Create table `users`
    op.create_table(
        'users',
        sa.Column('id', sa.Integer, primary_key=True, autoincrement=True),
        sa.Column('name', sa.String(length=100), nullable=False),
        sa.Column('email', sa.String(length=255), nullable=False, unique=True),
        sa.Column('password', sa.String(length=255), nullable=False),
        sa.Column('createdAt', sa.TIMESTAMP, server_default=sa.func.current_timestamp(), nullable=False),
        sa.Column('updatedAt', sa.TIMESTAMP, server_default=sa.func.current_timestamp(), onupdate=sa.func.current_timestamp(), nullable=False),
    )

def downgrade() -> None:
    # Drop table `users`
    op.drop_table('users')
