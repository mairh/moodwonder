# moodwonder


##Instructions

###Configuration

####secrets.js

Create a secrets.js file with the following lines of code inside server/config directory.

    module.exports = {
        db: 'mongodb://localhost/moodwonder',
        sessionSecret: 'Your Session Secret goes here',
        portnumber: PORT_NUMBER
    };

Replace PORT_NUMBER with your port number.

####blocked-domains.js

You can add or remove domain names here.

####config.js

You can change the admin `email ID`, `from email ID`, `static url` etc in this file

###Setting up

####Install all dependencies

    npm install

####Bundling with webpack

#####In development mode

It will bundle the files based on the configurations within webpack.config.js.

    npm run build

    npm run watch  # To watch and recompile for changes.

#####In production mode

It will build a minified bundle file - It may take more time to complete the process.

    npm run postinstall

#####Run

    npm start # To run locally

    pm2 start server/index.js # In production mode

###Setting up your Database

MongoDB

    Run queries given in the files within the `sql` directory before starting the application.
