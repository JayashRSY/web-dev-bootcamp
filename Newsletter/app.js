const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res) {
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    
    const url ="mail-service-url";
    
    const options ={
        method: "POST",
        auth: "user:mailchimp-api-key"
    };

    const request = https.request(url, options, function(response) {
        if(response.statusCode === 200) {
            res.sendFile(__dirname+"/success.html");
        }
        else {
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data", function(data) {
        console.log(JSON.parse(data));
        });
    });
    
    request.write(jsonData);
    request.end();
});

app.get("/failure.html", function(req, res) {
    res.redirect("/");
});

app.listen(3000, function() {
    console.log("Server is running on port: 3000...");
});
