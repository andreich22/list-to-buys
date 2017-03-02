export function postRequest(url, body, cb) {
  fetch(url, {
    method: 'post',
    headers: {
      'Content-type': 'application/json; charset=UTF-8'  
    },  
    body: JSON.stringify(body)
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    cb(response)
  })
  .catch( (e) => console.error(e) );

}

export function getRequest(url, cb) {
  fetch(url, {
    method: 'get',  
    headers: {
      'Content-type': 'application/json; charset=UTF-8'  
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(response) {
    cb(response)
  })
  .catch( (e) => console.error(e) );

}