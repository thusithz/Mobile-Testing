# Mobile-Testing
Hybrid mobile application with node server (SailsJs) example
### Pre-Requirement 
 - Node js, Sails Js , Ionic 

 - Install NodeJs setup file
 - $npm -g install sails
 - $npm install -g cordova ionic
 
## Mobile App Setup steps 

Go to Mobile folder
 
#### Run 
    - $npm install 
    - $bower install
 
 
## Mobile Server Setup Steps

 
 Go to mobile server folder
 
  - run $npm install
  
  - DB Configure 
  
  and then go to      api->services->service.js 
  
  DB: {
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '1234',
    database: 'mobile'
  }
  add DB Credential 
  
  Finally go to root folder of server (mobile server)
  
 ### Up System 
 - # $sails lift



