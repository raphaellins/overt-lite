# Simple project using Firebase functions (NodeJs) and ReactJs to manager Lottery Game (Lotofacil)

**Functions**

1. Create a config.js file on `util` folder with firebase configurations
  
```diff
  module.exports = {
    apiKey: "apiKey",
    authDomain: "project.firebaseapp.com",
    databaseURL: "https://project.firebaseio.com",
    projectId: "project",
    storageBucket: "project.appspot.com",
    messagingSenderId: "882928",
    appId: "appId",
    measurementId: "qadsd1"
}; 
```

2. Install NodeJs dependencies
  ```sh 
  $ npm install 
  ```
3. Initiate Firebase Functions
```sh 
  $ firebase init 
```
4. Start api locally
```sh 
  $ firebase serve 
```
  
**View**

1. Install ReactJs dependencies
```sh 
  $ npm install
```

export GOOGLE_APPLICATION_CREDENTIALS="/Users/raphaellins/developer/overt-lite/functions/overtlite-credentials.json"