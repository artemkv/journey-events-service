"use strict";

const chai = require('chai');
const expect = chai.expect;
const Readable = require('stream').Readable;

const actionController = require('../actioncontroller');
const errorController = require('../errorcontroller');
const pubSubConnector = require('./pubsubconnectormock');

it(':) Post action', function (done) {
    let action = {
        "aid": "9735965b-e1cb-4d7f-adb9-a4adf457f61a",
        "uid": "ceb2a540-48c7-40ec-bc22-24ffd54d880d",
        "act": "act_complete_trial",
        "par": "dummy"
    };

    let req = new Readable();
    req.push(JSON.stringify(action));
    req.push(null);

    req.method = 'POST';
    req.headers = {
        'content-type': 'application/json'
    };

    let res = {
        end: verify,
        setHeader: () => {}
    };

    let counter = pubSubConnector.allCallData.counter;

    function verify(err) {
        if (err) {
            return done(err);
        }

        expect(res.statusCode).to.equal(200);

        expect(pubSubConnector.allCallData.counter).to.equal(counter + 1);
        let actualAction = pubSubConnector.lastCallData.action;
        expect(actualAction.aid).to.equal('9735965b-e1cb-4d7f-adb9-a4adf457f61a');
        expect(actualAction.uid).to.equal('ceb2a540-48c7-40ec-bc22-24ffd54d880d');
        expect(actualAction.act).to.equal('act_complete_trial');
        expect(actualAction.par).to.equal('dummy');
        expect(actualAction.dts).not.be.null;

        return done();
    }

    actionController.postAction(req, res, verify);
});

it(':) Post action overrides dts with server-generated value', function (done) {
    let action = {
        "aid": "9735965b-e1cb-4d7f-adb9-a4adf457f61a",
        "uid": "ceb2a540-48c7-40ec-bc22-24ffd54d880d",
        "act": "act_complete_trial",
        "par": "dummy",
        "dts": "some externally passed value"
    };

    let req = new Readable();
    req.push(JSON.stringify(action));
    req.push(null);

    req.method = 'POST';
    req.headers = {
        'content-type': 'application/json'
    };

    let res = {
        end: verify,
        setHeader: () => {}
    };

    let counter = pubSubConnector.allCallData.counter;

    function verify(err) {
        if (err) {
            return done(err);
        }

        expect(res.statusCode).to.equal(200);

        expect(pubSubConnector.allCallData.counter).to.equal(counter + 1);
        let actualAction = pubSubConnector.lastCallData.action;
        expect(actualAction.aid).to.equal('9735965b-e1cb-4d7f-adb9-a4adf457f61a');
        expect(actualAction.uid).to.equal('ceb2a540-48c7-40ec-bc22-24ffd54d880d');
        expect(actualAction.act).to.equal('act_complete_trial');
        expect(actualAction.par).to.equal('dummy');
        expect(actualAction.dts).to.not.equal('some externally passed value');
        expect(actualAction.dts).not.be.null;

        return done();
    }

    actionController.postAction(req, res, verify);
});

it(':) Post error', function (done) {
    let error = {
        "aid" : "9735965b-e1cb-4d7f-adb9-a4adf457f61a",
        "uid" : "ceb2a540-48c7-40ec-bc22-24ffd54d880d",
        "msg" : "divide by zero",
        "dtl" : "amF2YS5sYW5nLklsbGVnYWxTdGF0ZU..."
      };

    let req = new Readable();
    req.push(JSON.stringify(error));
    req.push(null);

    req.method = 'POST';
    req.headers = {
        'content-type': 'application/json'
    };

    let res = {
        end: verify,
        setHeader: () => {}
    };

    let counter = pubSubConnector.allCallData.counter;

    function verify(err) {
        if (err) {
            return done(err);
        }

        expect(res.statusCode).to.equal(200);

        expect(pubSubConnector.allCallData.counter).to.equal(counter + 1);
        let actualError = pubSubConnector.lastCallData.error;
        expect(actualError.aid).to.equal('9735965b-e1cb-4d7f-adb9-a4adf457f61a');
        expect(actualError.uid).to.equal('ceb2a540-48c7-40ec-bc22-24ffd54d880d');
        expect(actualError.msg).to.equal('divide by zero');
        expect(actualError.dtl).to.equal('amF2YS5sYW5nLklsbGVnYWxTdGF0ZU...');
        expect(actualError.dts).not.be.null;

        return done();
    }

    errorController.postError(req, res, verify);
});