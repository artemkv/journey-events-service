[![CircleCI](https://circleci.com/gh/artemkv/journey-events-service.svg?style=svg)](https://circleci.com/gh/artemkv/journey-events-service)

Journey Events Service

# API

```
POST /action

{
  "aid" : "9735965b-e1cb-4d7f-adb9-a4adf457f61a",
  "uid" : "ceb2a540-48c7-40ec-bc22-24ffd54d880d",
  "act" : "act_complete_trial",
  "par" : ""
}
```

Pre-defined actions:
- act_land_on_site - just open the page
- act_complete_trial - minimal interaction that explains what site is about
- act_begin_signup - click on signup link and sees the signup form
- act_complete_signup - completes signup
- act_payment - makes a single payment


```
POST /apperror

{
  "aid" : "9735965b-e1cb-4d7f-adb9-a4adf457f61a",
  "uid" : "ceb2a540-48c7-40ec-bc22-24ffd54d880d",
  "msg" : "divide by zero",
  "dtl" : "amF2YS5sYW5nLklsbGVnYWxTdGF0ZU..."
}
```

# Environment Variables

```
NODE_PORT=8600
NODE_IP=localhost
ACTION_TOPIC=projects/journey-250514/topics/action-topic
ERROR_TOPIC=projects/journey-250514/topics/error-topic
```
