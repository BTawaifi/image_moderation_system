FROM mysql

#For Standalone
ENV MYSQL_HOST = mysqldb
ENV MYSQL_USERNAME = root
ENV MYSQL_PASSWORD = root
ENV MYSQL_ROOT_PASSWORD = root
ENV MYSQL_DATABASE = moderation_db
ENV MYSQL_LOCAL_PORT = 3306
ENV MYSQL_DOCKER_PORT = 3306

COPY ./create-local-db.sql /tmp

CMD [ "mysqld", "--init-file=/tmp/create-local-db.sql" ]