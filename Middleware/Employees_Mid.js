const { addSlashes, stripSlashes } = require('slashes');

async function Addemployees(req,res,next){
    let name   = addSlashes(req.body.name);
    let shift_tybe=addSlashes(req.body.shift_tybe);
    const Query = `INSERT INTO users (name) VALUES('${name}','${shift_tybe}')`;
    // console.log(Query);
    const promisePool = db_pool.promise();
    let rows=[];
    try {
        [rows] = await promisePool.query(Query);
        req.success=true;
        req.insertId=rows.insertId;
    } catch (err) {
        console.log(err);
        req.success=false;
        req.insertId=-1;
    }

    next();
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
            rows[idx].shift_tybe= htmlspecialchars(stripSlashes(rows[idx].shift_tybe));
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
    let shift_tybe = addSlashes(req.body.shift_tybe);

    let Query = `UPDATE employees SET `;
    Query += ` name = '${name}' `;
    Query += ` shift_tybe = '${shift_tybe}' `;
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