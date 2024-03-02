#!/bin/bash


envsubst < /templates/client.properties.template > /tmp/client.properties
envsubst < /templates/kafka_server_jaas.conf.template > /etc/kafka/kafka_server_jaas.conf

kafka-configs --zookeeper zookeeper:2181 --alter --add-config "SCRAM-SHA-256=[password=${BROKER_PASSWORD}],SCRAM-SHA-512=[password=${BROKER_PASSWORD}]" --entity-type users --entity-name ${BROKER_USERNAME}
kafka-configs --zookeeper zookeeper:2181 --alter --add-config "SCRAM-SHA-256=[password=${CLIENT_PASSWORD}],SCRAM-SHA-512=[password=${CLIENT_PASSWORD}]" --entity-type users --entity-name ${CLIENT_USERNAME}

# Call the original entrypoint script to start broker
exec /etc/confluent/docker/run