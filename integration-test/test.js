"use strict";

const SERVICE_URL = `http://${process.env.NODE_IP || 'localhost'}:${process.env.NODE_PORT || 8600}`;

const chai = require('chai');
const expect = chai.expect;
const request = require('request');

describe('[REST Api Test Suite]', function () {
    it(':) Health check', function (done) {
        request.get(`${SERVICE_URL}/health`, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
            done();
        });
    });

    it(':( Try accessing root', function (done) {
        request.get(SERVICE_URL, function (error, response, body) {
            expect(response.statusCode).to.equal(404);

            let expectedError = {
                error: "Not Found"
            };
            let actual = JSON.parse(body);
            expect(actual).to.deep.equal(expectedError);

            done();
        });
    });

    it(':( Try accessing non-existing page', function (done) {
        request.get(`${SERVICE_URL}/xxx`, function (error, response, body) {
            expect(response.statusCode).to.equal(404);

            let expectedError = {
                error: "Not Found"
            };
            let actual = JSON.parse(body);
            expect(actual).to.deep.equal(expectedError);

            done();
        });
    });

    it(':( Handle error', function (done) {
        request.get(`${SERVICE_URL}/error`, function (error, response, body) {
            expect(response.statusCode).to.equal(500);

            let expectedError = {
                error: "Test error"
            };
            let actual = JSON.parse(body);
            expect(actual).to.deep.equal(expectedError);

            done();
        });
    });

    it(':( Handle REST error', function (done) {
        request.get(`${SERVICE_URL}/resterror`, function (error, response, body) {
            expect(response.statusCode).to.equal(501);

            let expectedError = {
                error: "Not Implemented"
            };
            let actual = JSON.parse(body);
            expect(actual).to.deep.equal(expectedError);

            done();
        });
    });

    it(':) Post action', function (done) {
        let action = {
            "aid": "9735965b-e1cb-4d7f-adb9-a4adf457f61a",
            "uid": "ceb2a540-48c7-40ec-bc22-24ffd54d880d",
            "act": "act_complete_trial",
            "par": "dummy"
        };
        let options = {
            url: `${SERVICE_URL}/action`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: Buffer.from(JSON.stringify(action))
        };
        request.post(options, function (error, response, body) {
            expect(response.statusCode).to.equal(200);

            done();
        });
    });

    it(':) Post error', function (done) {
        let error = {
            "aid" : "9735965b-e1cb-4d7f-adb9-a4adf457f61a",
            "uid" : "ceb2a540-48c7-40ec-bc22-24ffd54d880d",
            "msg" : "divide by zero",
            "dtl" : "amF2YS5sYW5nLklsbGVnYWxTdGF0ZU..."
          };
        let options = {
            url: `${SERVICE_URL}/apperror`,
            headers: {
                'Content-Type': 'application/json'
            },
            body: Buffer.from(JSON.stringify(error))
        };
        request.post(options, function (error, response, body) {
            expect(response.statusCode).to.equal(200);

            done();
        });
    });
});