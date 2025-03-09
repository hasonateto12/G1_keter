const { addSlashes, stripSlashes } = require('slashes');

async function Addshifts(req, res, next) {
    let shift_name = addSlashes(req.body.shift_name);
    let start_date = addSlashes(req.body.start_date);
    let end_date = addSlashes(req.body.end_date);

    // Validation: Ensure all fields are provided
    if (!shift_name || !start_date || !end_date) {
        return res.status(400).json({ message: 'shift_name, start_date, and end_date are required' });
    }

    // Corrected SQL query with three placeholders for shift_name, start_date, and end_date
    const Query = `INSERT INTO shifts (shift_name, start_date, end_date) VALUES (?, ?, ?)`;

    const promisePool = db_pool.promise();
    let rows = [];

    try {
        // Use the correct variables in the query
        [rows] = await promisePool.query(Query, [shift_name, start_date, end_date]);

        req.success = true;
        req.insertId = rows.insertId;

        // Respond with success message and inserted ID
        res.status(200).json({ msg: "Shift added successfully", Last_Id: req.insertId });
    } catch (err) {
        console.log(err);
        req.success = false;
        req.insertId = -1;

        // Return error if something goes wrong
        return res.status(500).json({ message: 'Error adding shift', error: err });
    }
}

async function Readshifts(req, res, next) {
    const Query = `SELECT * FROM shifts`;

    const promisePool = db_pool.promise();
    let rows = [];

    try {
        [rows] = await promisePool.query(Query);

        // Prepare data, no need to use htmlspecialchars if you don't need HTML escaping
        // Strip slashes if needed
        for (let idx in rows) {
            rows[idx].shift_name = stripSlashes(rows[idx].shift_name);
            rows[idx].start_date = stripSlashes(rows[idx].start_date);
            rows[idx].end_date = stripSlashes(rows[idx].end_date);
        }

        req.success = true;
        req.shifts_data = rows;  // Store the shifts data

        // Return the shifts data in the response
        res.status(200).json({
            msg: "Shifts data retrieved successfully",
            shifts: rows
        });

    } catch (err) {
        req.success = false;
        console.log(err);

        // Return error response if something goes wrong
        return res.status(500).json({
            message: 'Error reading shifts',
            error: err
        });
    }

    next();
}



async function Updateshifts(req, res, next) {
    let idx = parseInt(req.body.idx);  // Get shift ID from the request
    let shift_name = addSlashes(req.body.shift_name);  // Get new shift name
    let start_date = addSlashes(req.body.start_date);  // Get new start date
    let end_date = addSlashes(req.body.end_date);  // Get new end date

    if (!shift_name || !start_date || !end_date || isNaN(idx)) {
        return res.status(400).json({ message: 'Shift name, start date, end date, and ID are required' });
    }

    // Build the update query
    let Query = `UPDATE shifts SET `;
    Query += `shift_name = '${shift_name}', `;
    Query += `start_date = '${start_date}', `;
    Query += `end_date = '${end_date}' `;
    Query += `WHERE id = ${idx}`;

    const promisePool = db_pool.promise();
    let rows = [];

    try {
        [rows] = await promisePool.query(Query);

        // Check if the update was successful
        if (rows.affectedRows === 0) {
            return res.status(404).json({ message: 'Shift not found or no changes made' });
        }

        req.success = true;
        res.status(200).json({ msg: "Shift updated successfully", shiftId: idx });

    } catch (err) {
        req.success = false;
        console.log(err);
        return res.status(500).json({ message: 'Error updating shift', error: err });
    }

    next();
}


async function Deleteshifts(req,res,next){
    let idx    = parseInt(req.body.idx);
    let Query = `DELETE FROM shifts  `;
    Query += ` WHERE id = ${idx} `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}

module.exports = {
    Addshifts: Addshifts,
    Readshifts:Readshifts,
    Updateshifts:Updateshifts,
    Deleteshifts:Deleteshifts,
}
