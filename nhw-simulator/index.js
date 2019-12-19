var reqestify = require('requestify');
var uuid = require('uuid/v4');

var jsonBody = {};
var series = 'b';
var preOrderAmount = 1000;
var preTaxAmount = 100;
var variation = 6;
for(var i=0; i<=10; i++) {
    var v = Math.floor(Math.random() * Math.floor(variation));
    jsonBody.clientId = "c" + v;
    jsonBody.orderId = uuid();
    jsonBody.userName = "u" + v;
    jsonBody.userMobile = "um" + v;
    var d = new Date();
    d.setDate(d.getDate() - v);
    jsonBody.orderDate = d.toISOString();
    jsonBody.orderAmount = v + preOrderAmount;
    jsonBody.orderTax = v + preTaxAmount;
    var prodcutsList = [];
    let productCount = Math.floor(Math.random() * Math.floor(6));
    for(var p=0; p <= productCount; p++) {
        var product = {};
        product.productId = "pid" +  p;
        product.productName = "pn" + p;
        product.quantity = p;
        product.subTotal = preTaxAmount + p;
        prodcutsList.push(product);
    }
    jsonBody.products = prodcutsList;
    // console.log(jsonBody)
    reqestify.post('https://asia-east2-mailgmailapi.cloudfunctions.net/ecotilly-function/v1/create', jsonBody).then(function(response){
        console.log(response.getBody());
    })
}

