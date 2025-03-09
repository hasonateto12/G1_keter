const express = require('express');
const router = express.Router();
const Employees_Mid = require("../Middleware/Employees_Mid");


router.post('/', [Employees_Mid.Addemployees], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", Last_Id: req.insertId });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});

router.get('/', [Employees_Mid.Reademployees], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", data: req.employees_data });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});


router.put('/', [Employees_Mid.Updateemployees], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});

router.delete('/', [Employees_Mid.Deleteemployees], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});
module.exports = router;