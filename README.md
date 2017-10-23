# Timezones App
The timezones app is a simple app that allows users to:
* authenticate by logging in or creating an acount
* USERS can edit their own profile
* USERMANAGERS ADMIN can CRUD other profiles
* USERS and ADMIN can CRUD timezones
* Timezones and users (for USERMANAGERS and ADMINS) can be filtered

Timezones are based on a city (user entered), and the server will hit an api to retrieve the UTC offset.

## Starting the App
The app is built for a docker environment. If you do not have docker, you will need to install it. Once docker is installed, simply navigate to the root of the folder and in terminal / command prompt, enter "docker-compose up"

## Shutting down the App
Ctrl+C until you have access to enter new commands into the terminal / command prompt. Then enter "docker-compose down"

The database is seeded with a few profiles to start off. You can login as an admin with the acount:
* un: tedmosby@gmail.com
* pw: password

Please note that there may still be minor bugs and that a test suite still needs to be stood up around the application
