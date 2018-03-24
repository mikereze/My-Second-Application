'use-strict'
var express = require('express');
var fs = require('fs');
var app = express();
var Router1 = express.Router();

var main_data = require('./profile.json');
app.use(express.static('public'));

app.get('/dictionary', function(req, res){
    res.header('Content-Type', 'text/plain');
    var dict = fs.readFileSync(__dirname + "/profile.json", "utf-8");
    var dictionary = dict.trim();
    var profiles = JSON.parse(dictionary);
    var name = req.query['name'];
    var fullname = name.split(" ");
    var fname = fullname[0];
    if(fullname[1] != "" || fullname[1] != " "){
        var lname = fullname[1];
    }
    console.log();
    if(profiles[fname]){
        res.status(200).send(profiles[fname]);
        console.log(profiles[fname]);
    }
    else{
        res.status(200).send(" is not a correct value Please Enter the correct value");
    }
});

app.get('/suggestion',function(req,res){
    res.header("Content-Type" , "text/plain");
    var dict = fs.readFileSync(__dirname + "/profile.json", "utf-8");
    var dictionary = dict.trim();
    var profile = JSON.parse(dictionary);
    var input = req.query['input'];
    console.log(input);
    var container = "";
    var w;
    for (w in profile){
        if ((w+"").startsWith(input)){
            container += "<button class='button' onclick='suggested()' value='"+profile[w]+"'>"+w+"</button> <br/>";
            console.log(container);
        }
    }
    res.status(200).send(container);


});
// app.get('/profile',function(req,res){
    
//     res.sendFile(__dirname + "/public/add.html");

// });


app.get('/add',function(req,res){
   
var add_firstname = req.query['firstname'];
var add_lastname = req.query['lastname'];
var add_address = req.query['address'];
var add_email = req.query['email'];
var add_age = req.query['age'];
var add_phonenumber = req.query['phonenumber'];
var add_housenumber = req.query['housenumber'];
var add_subcity = req.query['subcity'];
var add_bio = req.query['bio'];
var info = add_firstname + "~" + add_lastname + "~" + add_address + "~" + add_email + "~" +add_age + "~" + add_phonenumber + "~" + add_housenumber +"~" + add_subcity + "~" + add_bio;
    main_data[add_firstname] = info;
    fs.writeFileSync("./profile.json", JSON.stringify(main_data));

    res.status(200).send(true);
});
app.listen(3000);


   