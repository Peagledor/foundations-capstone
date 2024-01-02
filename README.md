Video Presentation Link: https://drive.google.com/file/d/1yG2BLKhW6RAOZCfAMgOfu-u2mC9xYLrf/view?usp=sharing

Hello everyone,

My name is Jorge Peraza, and this is my Devmountain foundations capstone project — zippyWeather. I built this  web app using vanilla JavaScript, HTML, CSS, axios, and express.

My goal was to reinforce my understanding of APIs, both internal and external, as well as get hands-on practice with building a microservice application.

zippyWeather is a simple web app that uses two APIs from Open Weather Map to grab local weather data based on the entered zip code. The Geocoding API and the One Call 3.0 API. I  decided to use zip codes instead of city names for more precise location data, considering that weather can vary within different areas of a city.

A challenge that I encountered was fetching the weather data, as the One Call API requires latitude and longitude to do so. This led to the two-step API call process

Here is how it works:

User Input:

The user enters their zip code, and the front end sends it in an axios request to the back end.

API Calls:

The back end server then extracts the zip code, and injects it into the api url along with my api key which hits the Geocoding API to get latitude and longitude.

Then, it uses those coordinates in the One Call 3.0 API to fetch current weather data which is returned in JSON format. It is then sent to the front end along with the city name and zip code that also gets extracted from the geocoding api.

Display:

The front end processes the data, converts time using JavaScript's methods, and injects the received data into an HTML string template to be displayed to the user.


A neat feature that I was able to implement is using Open Weather Map's weather icons that correspond to the current weather conditions.

After displaying the weather card, users can save locations for quick retrieval. Clicking on a saved location triggers a similar axios request to the back end, repeating the process in order to display weather data for the saved location.

Overall, I had a lot of fun building this application and I am excited to continue expanding my development skills in specializations here at Devmountain.

