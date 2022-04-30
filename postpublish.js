/*
 * We can write any code to perform some actions after publishing the site
 * Example : To create a directory, Run a DB operation etc
*/

var fs = require('fs');

// To create a directory in the given location
var dir = 'public/images';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    dir = 'public/images/profilepics/';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    dir = 'public/images/bannerpics/';
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    console.log('Img dir created...');
}

dir = 'public/images/bannerpics/';
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}
