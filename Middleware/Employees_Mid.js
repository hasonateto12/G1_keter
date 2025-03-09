const { addSlashes, stripSlashes } = require('slashes');

async function Addemployees(req, res, next) {
    let name = addSlashes(req.body.name);

    if (!name) {
        return res.status(400).json({ message: 'Name  are required' });
    }

    const Query = `INSERT INTO employees (name) VALUES (?)`;
    const promisePool = db_pool.promise();
    let rows = [];

    try {
        [rows] = await promisePool.query(Query, [name]);
        req.success = true;
        req.insertId = rows.insertId;
        res.status(200).json({ msg: "Employee added", Last_Id: req.insertId });
    } catch (err) {
        console.log(err);
        req.success = false;
        req.insertId = -1;
        return res.status(500).json({ message: 'Error adding employee', error: err });
    }
}

async function Reademployees(req,res,next){
    const Query = `SELECT * FROM employees `;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    req.employee_by_id=[];
    try {
        [rows] = await promisePool.query(Query);
        for(let idx in rows){
            rows[idx].name= htmlspecialchars(stripSlashes(rows[idx].name));
            req.employee_by_id[rows[idx].id] = rows[idx].name;
        }
        req.success=true;
        req.employees_data=rows;
    } catch (err) {
        req.success=false;
        console.log(err);
    }
    next();
}


async function Updateemployees(req,res,next){
    let idx    = parseInt(req.body.idx);
    let name   = addSlashes(req.body.name);
    let Query = `UPDATE employees SET `;
    Query += ` name = '${name}' `;
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

async function Deleteemployees(req,res,next){
    let idx    = parseInt(req.body.idx);
    let Query = `DELETE FROM employees  `;
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
    Addemployees: Addemployees,
    Reademployees:Reademployees,
    Updateemployees:Updateemployees,
    Deleteemployees:Deleteemployees,
}