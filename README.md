

# Blood Buddy

### Description

BloodBuddy is an App intended for booking an appointment for blood donation at the nearest medical facility  

## Gallery

![Alt Text for image](https://i.imgur.com/YQ7ol3V.jpeg "Login")

![Alt Text for image](https://i.imgur.com/6vXLJBj.pngg "Profile")

![enter image description here](https://i.imgur.com/TgtdaHZ.png)

![Alt Text for image](https://i.imgur.com/4X9mkLN.png "Map")

![Alt Text for image](https://i.imgur.com/94TA1b5.jpg "Chart")

![Alt Text for image](https://i.imgur.com/ruJDKzH.png "Chart")

## Website demo
- [Link to website on Vercel](https://team-project-iota.vercel.app/)

## Installation

clone repository

```
git clone https://github.com/MichaelKorost/team-project.git
```
enter the relevant folder

```
cd bloodBuddy
```

install all project dependencies

```
npm install
```

start the development server

```
npm start
```
### Firebase account

- add a Database, storage and Auth to your Firebase project
- in Database, create a collection called "users"
- create an "`.env.local`" file inside the root directory
- in the  "`.env.local`" make sure your credentials are as shown below:

```js
REACT_APP_FIREBASE_API_KEY=_______________
REACT_APP_FIREBASE_AUTH_DOMAIN=___________
REACT_APP_FIREBASE_PROJECT_ID=____________
REACT_APP_FIREBASE_STORAGEBUCKET=_________
REACT_APP_FIREBASE_MESSAGIN_SENDER_ID=____
REACT_APP_FIREBASE_APP_ID=________________
```


## Technologies

- HTML
- CSS
- JavaScript
- React
	- React Router DOM
	- React Leaflet
	- React chartJS
- MUI
- Firebase
* API's used
	* Geoapify
	* OpenStreetMap

## Contributers

- [MichaelKorost](https://github.com/MichaelKorost)
- [mdgta](https://github.com/mdgta)
- [NoamRivlin](https://github.com/NoamRivlin)

## Sources

* http://en.netzah.org/ - List of cities (there was no available API in english that provided all every city)
* [Geometry and decoding](https://stackoverflow.com/questions/15924834/decoding-polyline-with-new-google-maps-api) - decoding function for encoded geometry path
