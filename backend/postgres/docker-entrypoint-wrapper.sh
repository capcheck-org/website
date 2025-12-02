#!/bin/bash
set -e

# This script runs as root before the postgres entrypoint
# It creates and fixes permissions on the PGDATA directory

echo "==> Running permission fix as $(whoami)"

# The volume is mounted at /data with root:root ownership
# We need to create the postgresql subdirectory and give it to postgres
PGDATA_DIR="/data/postgresql"

if [ ! -d "$PGDATA_DIR" ]; then
    echo "==> Creating $PGDATA_DIR"
    mkdir -p "$PGDATA_DIR"
fi

echo "==> Setting ownership of $PGDATA_DIR to postgres:postgres"
chown -R postgres:postgres "$PGDATA_DIR"
chmod 700 "$PGDATA_DIR"

# Also ensure the parent /data directory allows postgres to traverse
chown postgres:postgres /data
chmod 755 /data

echo "==> Permissions fixed, starting PostgreSQL"

# Now call the original docker-entrypoint.sh
exec docker-entrypoint.sh "$@"
