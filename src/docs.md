# Microservices

## Who Am I?

### Who Am I? Request

```js
GET /api/whoami
```
### Who Am I? Response

```js
200 Ok
```

```js
{
    ipaddress: "::1",
    language: "en-US,en;q=0.9",
    software: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36"
}
```

## Timestamp

### Timestamp Request

```js
GET /api/timestamp/:date?
```

### Timestamp Response
```js
200 Ok
```
```js
{
    "unix": 1,
    "utc": "Thu, 01 Jan 1970 00:00:00 GMT",
    "Johannesburg": "1970/01/01, 02:00:00",
    "New_York": "1969/12/31, 19:00:00",
    "Los_Angeles": "1969/12/31, 16:00:00",
    "Chicago": "1969/12/31, 18:00:00",
    "London": "1970/01/01, 01:00:00",
    "Paris": "1970/01/01, 01:00:00",
    "Berlin": "1970/01/01, 01:00:00",
    "Sydney": "1970/01/01, 10:00:00",
    "Toronto": "1969/12/31, 19:00:00",
    "Shanghai": "1970/01/01, 08:00:00",
    "Tokyo": "1970/01/01, 09:00:00",
    "Sao_Paulo": "1969/12/31, 21:00:00",
    "Lagos": "1970/01/01, 01:00:00"
}
```
```js
400 Bad Request
```

```js
{
    error: "Invalid Date"
}
```
## URL Shortener

### URL Shortener Request
<-----------------------------------INSERT URL INPUT HEREE----------------------------->


```js
POST /api/url
```

```js
{
    original: "string"
}
```

### URL Shortener Response
```js
201 Created
```

```js
{
    original: "https://cossie.onrender.com/",
    short: "/api/url/0"
}
```
```js
200 Ok
```

```js
{
    original: "https://cossie.onrender.com/",
    short: "/api/url/0"
}
```
```js 
400 Bad Request
```
```js
{
    error: "Invalid URL"
}
```

## File Metadata

### File Metadata Request
<-------------------------------------ADD FILE INPUT HERE----------------------------------->

### File Metadata Response
```js
200 Ok
```
```js
{
    originalname: "App.tsx",
    encoding: "7bit",
    mimetype: "text/plain",
    size: 2426
}
```

## Quotes As A Service

### Quotes Request

```js
GET /api/quotes/?limit={{number}}
```

### Quotes Response
```js
200 Ok
```

```js
{
    quotes: [
        {
            quote: "To iterate is human, to recurse divine.",
            author: "Peter Deutsh",
            tags: [
                "humor"
            ]
        }
    ]
}
```

## Exercise Tracker

### Create User Request
 
<---------------------------------INSERT USERNAME INPUT------------------------------>

```js 
POST /api/exercisetracker
```

```js
{
    username: "John Doe"
}
```

### Create User Response
```js
201 Created
```

```js
{
    username: "John Doe",
    _id: "63b74fd0bbc598b8fa544c5d"
}
```

### Create Exercise Request
<-----------------------------------INSERT EXERCISE INPUT---------------------------------------------->
```js
POST /api/exercisetracker/:_id/logs
```
```js
{
    _id: "63b74fd0bbc598b8fa544c5d",
    duration: 120
    date: "2020-01-01",
    description: "Dodge, dip, duck, dive, dodge"    
}
```

### Create Exercise Response
```js
201 Created
```

```js
{
    _id: "63b74fd0bbc598b8fa544c5d",
    username: "John Doe",
    date: "Wed Jan 01 2020",
    description: "Dodge, dip, duck, dive, dodge"
}
```

### Get Exercise Logs Request

```js
GET /api/exercisetracker/:_id/logs?to={{date}}&from={{date}}&limit={{number}}
```

### Exercise Logs Response

```js
200 Ok
```

```js
{
    _id: "63b74fd0bbc598b8fa544c5d",
    count: 1,
    username: "John Doe",
    log: [
        {
            description: "Dodge, dip, duck, dive, dodge",
            duration: 120,
            date: "Wed Jan 01 2020"
        }
    ]
}
```

## Metric / Imperial Converter

### Converter Request
```js
GET /api/converter?input={{input}}
```
Example
```js
GET /api/converter?input=123mi
```
Supported units: km, mi, L, gal, kg, lbs

### Converter Response
```js
200 Ok
```

```js
{
    initNum: 123,
    initUnit: "mi",
    returnNum: 197.94882,
    returnUnit: "km",
    string: "123 miles converts to 197.94882 kilometers"
}
```

## British / American Translator

### Translator Request
<----------------------------------INSERT TRANSLATOR INPUT------------------------------------------->
```js
POST /api/translate
```
```js
{
    text: "lorry bank holiday 1.15",
    locale: "british-to-american"
}
```

### Translator Response
```js
200 Ok
```

```js
{
    text: "lorry bank holiday 1.15",
    translation: "<span class=\"highlight\">truck</span> <span class=\"highlight\">public holiday</span> <span class=\"highlight\">1:15</span>"
}
```

```js
400 Bad Request
```

```js
{
    error: "Required field(s) missing"
}
```

## Issue Tracker

### Add Issue Request

```js
POST /api/issues/:project
```
```js
{
    "issue_title": "test",
    "issue_text": "this is a test",
    "created_by": "admin",
    "assigned_to": "admin"
}
```
### Add Issue Response
```js
201 Created
```
```js
{
    "assigned_to": "admin",
    "status_text": "",
    "open": true,
    "_id": "63b75ef85ca1072dcc0b9b38",
    "issue_title": "test",
    "issue_text": "this is a test",
    "created_by": "admin",
    "created_on": "2023-01-05T23:36:24.644Z",
    "updated_on": "2023-01-05T23:36:24.644Z"
}
```
```js
400 Bad Request
```
```js
{
    error: "required field(s) missing"
}
```

### Update Issue Request
```js
PUT /api/issues/:project
```
```js
{
    "_id": "63b75ef85ca1072dcc0b9b38",
    "issue_title": "test",
    "issue_text": "this is a test",
    "created_by": "admin",
    "assigned_to": "admin",
    "status_text": "test complete",
    "open": false
}
```

### Update Issue Response
```js
200 Ok
```
```js
{
    "result": "successfully updated",
    "_id": "63b75ef85ca1072dcc0b9b38"
}
```
### Delete Issue Request
```js
DELETE /api/issues/:project
```
```js
{
    "_id": "63b75ef85ca1072dcc0b9b38",
}
```

### Delete Issue Response
```js
200 Ok
```
```js
{
    "result": "successfully deleted",
    "_id": "63b75ef85ca1072dcc0b9b38"
}
```

### Get Issues Request
```js
GET /api/issues/:project?created_by={{creator}}&assigned_to={{person}}&open={{boolean}}
```

### Get Issues Response

```js
200 Ok
```

```js
[
    {
        _id: "63b75ef85ca1072dcc0b9b38",
        issue_title: "test",
        issue_text: "this is a test",
        created_by: "admin",
        assigned_to: "admin",
        status_text: "test complete",
        created_on: "2023-01-05T23:36:24.644Z",
        updated_on: "2023-01-06T00:10:58.852Z",
        open: false,
        __v: 0
    }
]
```