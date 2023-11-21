const assert = require("assert");
const { Given, When, Then } = require("cucumber");
const axios = require('axios');
const { Console } = require("console");
let json_response;
let statusCode;
let url_string;

Given('this url {string}', function (string) {
    url_string = string;
    assert(url_string.includes("https://") || string.includes("http://"), `Error: url is missing either "https://" or "http://"`)
  });

When('the premium user request is sent', async function () {

      let res = await axios.get(url_string).catch((error) => { 
        return error.response;
        });
                
      json_response = res.data;
      statusCode = res.status;
  });

Then('we should receive a {string} reponse', function (string) {
    assert.equal(string, statusCode, `Error: status coded expected ${string}, actual value ${statusCode}`)
});

Then('{string} has field {string} and should contain {string}', function (string, string2, string3) {
  let list_name = string;
  let expected_field = string2;
  let expected_string = string3;
  response_name_values = []

  if (json_response && (list_name in json_response)){

    let playlist = json_response[list_name];

    for (let index = 0; index < playlist.length; index++) {
      if (playlist[index].hasOwnProperty(expected_field)){
        response_name_values.push(playlist[index][expected_field])
      }
    }
  } else {
    assert(false, `Error:  get response, list name missing , expected "${list_name}"`);    
  }

  assert(response_name_values.includes(expected_string), `Error: expected "${expected_string}", actual value "${response_name_values}" with field name "${expected_field}"`);

  });

  Then('{string} has field {string} and DOES NOT contain {string}', function (string, string2, string3) {
    let list_name = string;
    let expected_field = string2;
    let expected_string = string3;
    response_name_values = []
  
    if (json_response && (list_name in json_response)){
  
      let playlist = json_response[list_name];
  
      for (let index = 0; index < playlist.length; index++) {
        if (playlist[index].hasOwnProperty(expected_field)){
          response_name_values.push(playlist[index][expected_field])
        }
      }
    } else {
      assert(false, `Error:  get response, list name missing , expected "${list_name}"`);    
    }

    assert(!(response_name_values.includes(expected_string)), `Error: expected "${expected_string}", SHOULD NOT be present, actual values "${response_name_values}" with field name "${expected_field}"`);
  });

  Then('response has field {string} and should contain {string}', function (string, string1) {
    let expected_field = string;
    let expected_string = string1;

    assert(expected_field in json_response, `Error: get response, expected field "${expected_field}", actual response "${json_response}"`);
    assert(json_response[expected_field] == expected_string, `Error: get response, expected "${expected_string}", actual \"${json_response[expected_field]}"`);
  });
