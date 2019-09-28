"use strict";

const MAX_LENGTH = 10000;

const statusCodes = require('@artemkv/statuscodes');
const statusMessages = require('@artemkv/statusmessages');
const RestError = require('@artemkv/resterror');
const restStats = require('@artemkv/reststats');
const readJsonStream = require('@artemkv/readjsonstream');
const contentTypeParser = require('content-type');
const pubSubConnector = require('./connectorprovider').getPubSubConnector();

const postError = async function (req, res, next) {
    if (req.method !== 'POST') {
        throw new RestError(statusCodes.MethodNotAllowed, statusMessages.MethodNotAllowed);
    }
    let contentType = req.headers['content-type'];
    if (!contentType) {
        throw new RestError(statusCodes.BadRequest, 'content-type header was not found.');
    }
    let contentTypeParsed = contentTypeParser.parse(contentType);
    if (contentTypeParsed.type !== 'application/json') {
        let message = `invalid value of content-type header. Expected: 'application/json', Actual: ${contentTypeParsed.type}.`;
        throw new RestError(statusCodes.BadRequest, message);
    }

    try {
        let error = await new Promise(readJsonStream(req, MAX_LENGTH));
        error.dts = new Date();
        await pubSubConnector.publishError(error);

        res.statusCode = statusCodes.OK;
        res.end();

        restStats.countRequestByEndpoint("error");
        restStats.updateResponseStats(req, res);
    } catch(err) {
        next(err);
    }
}

exports.postError = postError;