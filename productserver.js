let express = require("express");

var cors = require("cors");
let app = express();
app.use(cors());

app.use(express.json());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested=With,X-Auth-Token, Content-Type, Accept"
    );
    next();
});
var port = process.env.PORT || 2410;
app.listen(port, () => console.log(`Node app listening on port ${port}!`));

let { products } = require("./productdata");
let { users } = require("./user");


app.get("/productApp/products", function (req, res) {
    res.send(products);
});

app.post("/productApp/login", (req, res) => {
    const product = req.body;
    let index = users.findIndex(f => f.id === product.username && f.password === product.password)
    let userdata = users.find(f => f.id === product.username && f.password === product.password)

    if (index>= 0){
        let data = {username:userdata.id,name:userdata.name,role:userdata.role}
        res.send(data);
    
    }
    else {
    res.status (400)
    res.send ("username and password is invalid")

    }
});


app.post("/productApp/products", (req, res) => {
    const product = req.body;
    let index = products.findIndex(f => f.id === product.id)
    if (index>= 0){
        console.log(index)
        res.status (400)
        res.send ("Product id is already exists")
    }
    else {
    products.push(product);
    res.send(product);
    }
});


app.get("/productApp/users", function (req, res) {

    let userdata = users
    res.send (userdata)
});



app.get("/productApp/products/:id", function (req, res) {
    let id = req.params.id;
    let obj = products.find((obj1) => obj1.id === id);
    obj ? res.send(obj) : res.send("not found");
});


app.put("/productApp/products/:id", function (req, res) {
    console.log("Put called");
    let id = req.params.id;
    const product = req.body;
    console.log(id, product);
    let index = products.findIndex((obj1) => obj1.id === id);
    if (index >= 0) {
        products[index] = product;
        res.send(product);
    } else res.send("not found");
});



app.delete("/productApp/products/:id", function (req, res) {
    let id = req.params.id;
    let index = products.findIndex((obj1) => obj1.id === id);
    if (index >= 0) {
        let product = products.splice(index, 1);
        res.send(product);
    }
    res.send("not found");
});
