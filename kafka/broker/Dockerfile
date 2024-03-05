FROM confluentinc/cp-kafka:6.1.1

# bad
USER root
RUN dnf update -y && \
    dnf install -y gettext && \
    dnf clean all

WORKDIR /

COPY ./templates/client.properties.template /templates/
COPY ./templates/kafka_server_jaas.conf.template /templates/
COPY ./entrypoint.sh /etc/confluent/docker/entrypoint.sh

