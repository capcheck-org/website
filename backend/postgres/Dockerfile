FROM postgres:17

# Copy custom entrypoint wrapper that fixes volume permissions
COPY docker-entrypoint-wrapper.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint-wrapper.sh

# Change postgres user's home directory to /data (like fly-apps/postgres-flex)
RUN usermod -d /data postgres

# Set default environment variables
ENV POSTGRES_DB=strapi
ENV POSTGRES_USER=strapi
ENV PGDATA=/data/postgresql

EXPOSE 5432

# Use wrapper as entrypoint - runs as root, fixes permissions, then calls docker-entrypoint.sh
ENTRYPOINT ["docker-entrypoint-wrapper.sh"]
CMD ["postgres"]
