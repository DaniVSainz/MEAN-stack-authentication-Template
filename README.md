# MEAN-Auth-Template
This repo will be a template i can clone to use as a foundation for authentication via express/angular for my web-apps  
This is a MEAN stack authentication template.    
The app is meant to be cloned and serve as a starting point for any application.    

#### Heroku Deploy instructions at end of document.Takes 1 minute to config.

##### What went wrong with the app.  
-It has angulars default testing packages in the package.json by default.These can easily be removed although are left there
 as i believe i might use these as my choice.They don't get installed in prod so it dosent really matter.    
 -I added @Angular/material + @angular/flex in the dependencies.These can easily be removed.  
    -Only the navbar and modals inside Auth dialog component are made with @angular material.However the navbar can be substituted for 
      a div and you can remove the modals as there are still routes for login/register.  
    -@Angular/Flex is unused but will be my choice for the app being made off of this template.  
    
    
## What went right.
Lightweight  
Verification emails(with tokens created with expiration time of 12 hours)  
Reset password tokens(with resetTokens set to 1 hour)  
Emails service with nodeemailer using gmail as its default which can easily be changed.  
.env file with these email and password for nodemailer  
Angular+Node api bundled together on same port to some this may be a bonus and to others not so much.You can easily seperate them.  
Easily deployed to heroku.  

How to use.  
Git clone the repo  
touch .env and set  
userEmail=XXXXXX@gmail.com  
userPass=XXXXXX  
This is used for nodeemailer user registration and password reset emails  

cd auth-template/  
npm install  
cd angular-src  
npm install  
ng build  

cd..  
node or nodemon bin/www  

your app should be hosted on localhost:3000 now  


## Heroku Deploy instructions
Since dependancies from angular / Node app were seperated in the case of me ever splitting it into two apps this causes issues with heroku.  

##### However it takes 1 minute to fix.Go into angular-src/ package.json and copy the dependancies.Add them to them to the dependancies of the root folder's package.json.Deploy to heroku and done.  

Go into config/database.js and set a mlab mongodb url.There's free tiers that take a minute to setup.  

Then you must go into heroku and set the .env variables.You can do this from their website or the console.  
Takes 1 min  
set  
##### The provider must be gmail as that is set in our emailing service, you get around 500 emails daily with this and avoids   
##### the hassle of registering on real emailing services.
userEmail=XXXXXX@gmail.com  
userPass=XXXXXX  




