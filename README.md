# MEAN-Auth-Template
This repo will be a template i can clone to use as a foundation for authentication via express/angular for my web-apps

This is a MEAN stack authentication template.

The app is meant to be cloned and serve as a starting point for any application.

What went wrong with the app.
-It has angulars default testing packages in the package.json by default.These can easily be removed although are left there
 as i believe i might use these as my choice.
 -I added @Angular/material + @angular/flex in the dependencies.These can easily be removed.
    -Only the navbar and modals inside Auth dialog component are made with @angular material.However the navbar can be substituted for 
      a div and you can remove the modals as there are still routes for login/register.
    -@Angular/Flex is unused but will be my choice for the app being made off of this template.
    
    
What went right.
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



