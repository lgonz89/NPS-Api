'use strict';
let apikey = "R1tVbBqeFM1FqrcfNjgsK4YzfprI1oZ81gMlSXLb";

function getPark(searchTerm, maxResults) {
  let url = 'https://developer.nps.gov/api/v1/parks?';

searchTerm = searchTerm.replace(/  /g," ");// looks to see if there is two spaces and removes any double spaces

  
  let cleanArray = searchTerm.split(" "); // Creates an array and split on spaces so we can replace with commas per the api

  let cleanSearch = cleanArray.join(",") //join to make a string and only adds comma before last item if more than one


  url = url + "&stateCode=" + cleanSearch + "&limit=" + maxResults +"&api_key=" + apikey;

  

  console.log(url);


  fetch(url)
    .then(response => {
      if (response.statusText == "OK") {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });

}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++) {
    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].url}</p>
      <a href ='${responseJson.data[i].directionsUrl}'>${responseJson.data[i].directionsUrl}</a>
      <p> Park Address:</p>
      <p>${responseJson.data[i].addresses[0].line1}</p><span>${responseJson.data[i].addresses[0].city},</span>
      <span>${responseJson.data[i].addresses[0].stateCode}.</span>
      <span>${responseJson.data[i].addresses[0].postalCode}</span>
      </li>`
   
    )
  };
  //display the results section  
  $('#results').removeClass('hidden');
};


function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getPark(searchTerm, maxResults);
  });
}

$(watchForm);
