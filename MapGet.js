const express = require('express');


/**
 * @param {express.Request} req 
 * @param {express.Response} res 
 */
function Index(req, res) {
    res.render('index.hbs');
}

module.exports = {
    Index : Index
};