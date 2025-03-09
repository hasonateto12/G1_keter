const express = require('express');
const router = express.Router();
const Shifts_Mid = require("../Middleware/Shifts_Mid");


router.post('/', [Shifts_Mid.Addshifts], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", Last_Id: req.insertId });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});

router.get('/', [Shifts_Mid.Readshifts], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok", data: req.shifts_data });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});


router.put('/', [Shifts_Mid.Updateshifts], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});

router.delete('/', [Shifts_Mid.Deleteshifts], (req, res) => {
    if (req.success) {
        res.status(200).json({ msg: "ok" });
    } else {
        return res.status(500).json({ message: req.error || 'An error occurred' });
    }
});
module.exports = router;