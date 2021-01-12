const express = require('express');
const router = express.Router();

const mysqlConnection = require('../database.js');

// GET all Employees
router.get('/offices', (req, res) => {
    mysqlConnection.query('SELECT * FROM offices WHERE active = 1', (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        } else {
            console.log(err);
        }
    });
});

// GET An Employee
router.get('/offices/:id', (req, res) => {
    const { id } = req.params;
    mysqlConnection.query('SELECT * FROM offices WHERE id = ? AND active = 1', [id], (err, rows, fields) => {
        if (!err) {
            mysqlConnection.query('SELECT * FROM office_services WHERE office_id = ?', [id], (error, officeServices, fields) => {
                if (!error) {
                    const office = rows[0];
                    const anotherOffice = [];
                    office.officeServices = officeServices;
                    anotherOffice.push(office);
                    res.json(office);
                }
            });
        } else {
            console.log(err);
        }
    });
});

module.exports = router;
