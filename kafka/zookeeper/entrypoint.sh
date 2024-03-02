#!/bin/bash

envsubst < /templates/zookeeper_server_jaas.conf.template > /etc/kafka/zookeeper_server_jaas.conf

# Call the original entrypoint script to start zookeeper
exec /etc/confluent/docker/run