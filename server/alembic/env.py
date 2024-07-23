# alembic/env.py

import sys
from pathlib import Path
from sqlalchemy import engine_from_config, pool
from alembic import context
from app.database import Base
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv(dotenv_path=Path(__file__).resolve().parent.parent / '.env')

# Add the app directory to the path
sys.path.append(str(Path(__file__).resolve().parent.parent))

# Configuration object
config = context.config

# Set the SQLAlchemy URL for database connection from environment variable
config.set_main_option('sqlalchemy.url', os.getenv('DATABASE_URL'))

# Target metadata for automatic generation of migration scripts
target_metadata = Base.metadata

def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online() -> None:
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix='sqlalchemy.',
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )

        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
