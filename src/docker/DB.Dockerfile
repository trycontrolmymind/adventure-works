FROM library/postgres

RUN apt-get update
RUN apt-get -y install unzip ruby dos2unix

RUN mkdir /data
COPY src/sql/install.sql /data/
# COPY src/sql/update_csvs.rb /data/
# COPY src/sql/adventure_works_2014_OLTP_script.zip /data/
RUN cd /data
    # unzip adventure_works_2014_OLTP_script.zip && \
    # rm adventure_works_2014_OLTP_script.zip && \
    # ruby update_csvs.rb && \
    # rm update_csvs.rb

COPY src/sql/install.sh /docker-entrypoint-initdb.d/
RUN dos2unix /docker-entrypoint-initdb.d/*.sh
