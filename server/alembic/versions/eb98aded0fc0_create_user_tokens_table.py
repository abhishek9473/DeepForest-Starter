"""Create user_tokens table

Revision ID: eb98aded0fc0
Revises: 9d91716f1bc3
Create Date: 2024-07-20 21:55:30.480257

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision: str = 'eb98aded0fc0'
down_revision: Union[str, None] = '9d91716f1bc3'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        'user_tokens',
        sa.Column('id', sa.Integer(), nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('token', sa.String(length=255), nullable=False),
        sa.Column('createdAt', sa.TIMESTAMP(), server_default=sa.func.current_timestamp(), nullable=False),
        sa.Column('updatedAt', sa.TIMESTAMP(), server_default=sa.func.current_timestamp(), onupdate=sa.func.current_timestamp(), nullable=False),
        sa.PrimaryKeyConstraint('id'),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
    )

def downgrade() -> None:
    op.drop_table('user_tokens')