const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');

const urlencodedParser = bodyParser.urlencoded({ extended: false })

var info = {}; 

app.set('view engine', 'ejs');

router.get('/', function (req, res) {
    //res.sendFile(path.join(__dirname + '/views/index.html'));
    res.render('home');
});

router.post('/result', urlencodedParser, (req, res) => {
    
    var value = convert(req.body);
    info.srcCurrency = req.body.currency[0];
    info.srcAmount = req.body.amount;
    info.convCurrency = req.body.currency[1];
    info.convAmount = value;
    res.render('result', { data: req.body, result: value.toFixed(2) });
});

router.get('/result', (req, res) => {
    console.log(info);
    res.end(JSON.stringify(info,null,2));
});

function convert(data) {
    if (data.currency[0] == data.currency[1]) return 'invalid options selected';
    switch(data.currency[0]){
        case "dollar" :
        switch (data.currency[1]) {
            case 'rupee': return 75.45 * data.amount; break;
            case 'yen': return 108.35 * data.amount; break;
            case 'pound': return 0.79 * data.amount; break;
            default: break;
        }
        case "rupee" :
        switch (data.currency[1]) {
            case 'dollar': return 0.013 * data.amount; break;
            case 'yen': return 1.44 * data.amount; break;
            case 'pound': return 0.010 * data.amount; break;
            default: break;
        }
        case "yen" :
        switch (data.currency[1]) {
            case 'rupee': return 0.70 * data.amount; break;
            case 'dollar': return 0.0092 * data.amount; break;
            case 'pound': return 0.0073 * data.amount; break;
            default: break;
        }
        case "pound" :
        switch (data.currency[1]) {
            case 'rupee': return 95.88 * data.amount; break;
            case 'yen': return 137.70 * data.amount; break;
            case 'dollar': return 1.27 * data.amount; break;
            default: break;
        }
    }
}

//add the router
app.use('/', router);
app.listen( 3000);

console.log('Running at Port 3000');