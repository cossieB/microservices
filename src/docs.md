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

```js
POST /api/url
```

```js
{
    original: "https://cossie.onrender.com/"
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