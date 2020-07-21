'use strict';
let apikey = "R1tVbBqeFM1FqrcfNjgsK4YzfprI1oZ81gMlSXLb";

function getPark(searchTerm, maxResults) {

  let url = 'https://developer.nps.gov/api/v1/parks?';
  url = url + "q=" + searchTerm +
    "&limit=" + maxResults + "&api_key=" + apikey;

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