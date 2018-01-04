# ReactJS Express Docker Starter  

This is an opinionated starter/boilerplate project for a ReactJS Single Page Application.
We are using:  
+ React V16, with `prop-types` for prop validation  
+ React Router V4  

Also, 
+ The ES6/JSX code is transpiled via Babel, 
+ We support Linting via ESLint,  
+ We run Unit Tests using Jest and Enzyme,  

Lastly, We are using 
+ Webpack to bundle modules and  
+ NPM scripts to run the build processes.


## Getting Started  

+ Checkout the repository  
+ Install the dependencies  
+ [Optional] Add an environment settings file (see notes below)  
+ [Optional] Build the ReactJS application using Webpack  
+ Start the web server  

```sh  
> git clone https://github.com/sntnupl/reactjs-express-docker-starter.git  
> cd src  
> npm install  
```
The following command is optional, do this only if you make changes to this repository
```sh
> npm run build:prod  
```
This will start the Express Server that will serve the ReactJS application.
```sh  
> npm run serve  
```

## Deploy the app as a container  

This project comes with a *Dockerfile*, that is required to deploy the app as a container.  
To build the container, run the following commands (assuming you have docker installed in your setup)  
```sh  
> cd src  
> docker build -t <image-name of your choice> .  
> docker run -p 5000:5000 -d <image-name of your choice>  
```  

## Other Commands  

Note, all of the following commands should be run from `src` directory.  
+ Run ESLint:  
   - `npm run lint`, or  
   - `npm run lint -- --watch` for watch mode 
+ Run Unit Tests:  
   - `npm test`, or  
   - `npm test -- --watch`, for watch mode, or  
   - `npm test -- --silent --watch` if in addition, you do not want to see the console logs  
+ Run a 'DevBuild':  
   - `npm run build:dev` - this runs in watch mode, perfect for rapid development 🙌   


## Adding an Environment Settings file
Instead of hard-coding the host address, port number etc, our application reads them from an environment settings file.  
A sample file is located at `src/settings/sample.env`, which you can use to create a `settings.env` in `src/settings` directory, based your specific requirements.  

Note, this is required only if you wish to make changes to the application, which would need you to rebuild the application.  

*A quick note on 'WEATHER_API_KEY'*  
Our application uses [Openweathermap](https://openweathermap.org/api) API to get the weather information.  
Usage of these APIs requirs registration on their web site, which would provide you access to an API key.  


