const https = require("https");
const api = require("./api.json")

// Console message with weather
function weatherMessage(userInput, weather){
  console.log(`The weather right now in ${userInput} is: ${weather.weather[0].description}. Have a lovely day!`);
};

// Error message
function errorMessage(error){
  console.error(error.message);
};

// Get function to take user input and add to api string query
function get(userInput){

// Try and Catch added to catch http protocal errors
    try {
            const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=${api.key}`,(response) => {

            if (response.statusCode === 200){

            	let body = "";
          		// Read the data
              	response.on("data", (data) => {
                body += data.toString();
              	});

             	response.on("end", () => {
             		try {
             			// Parse data
             			const weather = JSON.parse(body);
             			// Print the data
                		weatherMessage(userInput, weather)
                	} catch (error){
                		errorMessage(error);
                	}
              });
            } else {
            	// Status Error Code
            	const statusErrorCode = new Error(`There was a problem getting the weather for $(userInput).`);
            	errorMessage(statusErrorCode);
            }	

            
            
      });

    } catch (error) {
      errorMessage(error);
    }

};

// Export the http get request
module.exports.get = get;
