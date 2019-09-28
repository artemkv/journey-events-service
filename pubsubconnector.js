"use strict";

const dotenv = require('dotenv');
const { PubSub } = require('@google-cloud/pubsub');

dotenv.config();

const actionTopicName = process.env.ACTION_TOPIC // TODO: failfast if not set
const errorTopicName = process.env.ERROR_TOPIC
const pubsub = new PubSub();

function publish(data, topicName) {
    const dataBuffer = Buffer.from(data);
    return pubsub.topic(topicName).publish(dataBuffer);
}

function publishAction(action) {
    const data = JSON.stringify(action);
    return publish(data, actionTopicName);
}

function publishError(error) {
    const data = JSON.stringify(error);
    return publish(data, errorTopicName);
}

exports.publishAction = publishAction;
exports.publishError = publishError;