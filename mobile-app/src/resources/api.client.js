import qs from 'querystring';

const baseApiUrl = 'http://159.89.23.3:3001';

let _token = null;

export function setToken(token) {
  _token = token;
}

function buildUrl(path, queryStringObject) {
  return `${baseApiUrl}/${path}?${qs.stringify(queryStringObject)}`;
}

const getJsonHeaders = () => ({
  Accept: 'application/json',
  Authorization: `Bearer ${_token}`,
});

const postJsonHeaders = () => ({
  ...getJsonHeaders(),
  'Content-Type': 'application/json',
});

const responseHandler = (response) => {
  if (response.status >= 500) {
    return response.text()
      .then((text) => { throw new Error(text); });
  }

  if (response.status >= 400) {
    const isJSON = response.headers.get('Content-Type').includes('application/json');

    if (isJSON) {
      return response.json()
        .then((data) => {
          const firstError = data.errors[0];
          const message = Object.values(firstError)[0];

          throw new Error(message);
        });
    }

    return response.text()
      .then((text) => { throw new Error(text); });
  }

  return response.json();
};

export function get(path, queryStringObject) {
  return fetch(buildUrl(path, queryStringObject), {
    headers: getJsonHeaders(),
  })
    .then(responseHandler);
}

export function put(path, queryStringObject, body) {
  return fetch(buildUrl(path, queryStringObject), {
    method: 'PUT',
    headers: postJsonHeaders(),
    body: JSON.stringify(body),
  })
    .then(responseHandler);
}

export function post(path, queryStringObject, body) {
  return fetch(buildUrl(path, queryStringObject), {
    method: 'POST',
    headers: postJsonHeaders(),
    body: JSON.stringify(body),
  })
    .then(responseHandler);
}

export function del(path, queryStringObject, body) {
  return fetch(buildUrl(path, queryStringObject), {
    method: 'DELETE',
    headers: postJsonHeaders(),
    body: JSON.stringify(body),
  })
    .then(responseHandler);
}
