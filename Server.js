const express = require('express');
const mapget = require('./MapGet');
const hbs = require("hbs");
const fs = require("fs");
const BookmarkElement = require('./BookmarkElement');

const app = express();

hbs.registerPartials("./views/partials");

app.use(express.json());
app.use(express.static("./public"));

app.set('view engine', 'hbs');
app.set('views', './views');

hbs.registerHelper('getBackButton', function () {
    return new hbs.SafeString('<input type="button" class="btn btn-danger" value="Отмена" onclick="back()"/>');
});

if (!fs.existsSync('./data.json')){
    let arr = new Array();
    let el = new BookmarkElement();
    el.Name = "Dima O."; el.Number = "+375298422939";

    arr.push(el)

    fs.writeFileSync('./data.json', JSON.stringify(arr));
}

/**
 * @type {Array<BookmarkElement>}
 */
let Elements = JSON.parse(fs.readFileSync("./data.json")); 

app.get("/", (req, res) => {
    res.render('index.hbs', { elements: Elements, def: true, add: false, upd: false });
});

app.get("/update", (req, res) => {
    let name = req.query.name;
    
    let element = Elements.find(i => i.Name === name);

    res.render('index.hbs', { elements: Elements, def: false, add: false, upd: true, updateElement: element });
});

app.get("/add", (req, res) => {
    res.render('index.hbs', { elements: Elements, def: false, add: true, upd: false});
});

app.post("/add", (req, res) => {
    let nelement = new BookmarkElement();

    nelement.Name = req.body.Name.trim();
    nelement.Number = req.body.Number.trim();

    Elements.push(nelement);

    fs.writeFileSync('./data.json', JSON.stringify(Elements));

    res.end("ok");
});

app.post("/update", (req, res) => {

    Elements.forEach(i => {
        if (i.Name === req.body.OriginalName.trim()){
            i.Name = req.body.Name.trim();
            i.Number = req.body.Number.trim();

            return;
        }
    });

    fs.writeFileSync('./data.json', JSON.stringify(Elements));

    res.end("ok");
});


app.post("/delete", (req, res) => {
    let delIndex = Elements.findIndex(i => i.Name === req.body.Name);

    Elements.splice(delIndex, 1);

    fs.writeFileSync('./data.json', JSON.stringify(Elements));

    res.end("ok");
});



app.listen(process.env.PORT || 3000, () => console.log("Сервре работает: http://localhost:3000"));