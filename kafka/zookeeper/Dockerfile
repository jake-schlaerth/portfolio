FROM confluentinc/cp-zookeeper:latest

USER root
RUN dnf update -y && \
    dnf install -y gettext && \
    dnf clean all

USER appuser

WORKDIR /

COPY ./templates/zookeeper_server_jaas.conf.template /templates/
COPY ./entrypoint.sh /etc/confluent/docker/entrypoint.sh