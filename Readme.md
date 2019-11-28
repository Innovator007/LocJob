# LocJob

## Project Setup

Create a folder named config in the main project folder root and in that create a file named index.js and add the following content:

```
module.exports = {
	googleApiKey: "<your_google_api_key_goes_here>", // used for reversegeolocation
	facebookAppKey: "<your_facebook_app_id_goes_here>" // used for facebook authentication
}

```

Now open a terminal and change into the project directory and run the following commands to start the app in expo

```
npm install
npm start

```

##### Note: You will need expo-cli installed and a simulator or expo app in your mobil to test it out.
