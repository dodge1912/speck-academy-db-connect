const db = require ('../../db/connect');
const uuidv4 = require('uuid/v4');

const getHalls = (req, res, next) => {
    db.query('SELECT * FROM halls', (err, result) =>{
        if(err) { return next (err); }
        res.send(result.rows)
    })
}

const getHallById = (req, res, next) => {
    const hall_uid = req.params.hall_uid;
    db.query("SELECT * FROM halls WHERE hall_uid = $1", 
    [hall_uid],  (err, result) => {
        if(err) { return next (err); }
        res.status(201).send(result.rows)
    })
}

const createHall = (req, res, next) => {
    const hall_uid = uuidv4();
    const hall_name = req.body.hall_name;
    const hall_address = req.body.hall_address;
    const size = parseInt(req.body.size);
    const dateCreated = new Date();
    const dateUpdated = new Date();

    db.query('INSERT INTO halls ( hall_uid, hall_name, hall_address, size, dateCreated, dateUpdated ) VALUES ( $1, $2, $3, $4, $5, $6)', 
    [hall_uid, hall_name, hall_address, size, dateCreated, dateUpdated], (err, result) => {
        if(err) { return next (err); }
        res.status(201).send('New hall ' +hall_name+ ' is successfully created')  
    })
  }

const updateHall = (req, res, next) => {
    const hall_uid = req.params.hall_uid;
    const hall_name = req.body.hall_name;
    const hall_address = req.body.hall_address;
    const size = req.body.size;
    const dateUpdated = new Date();
    db.query('UPDATE halls SET hall_name = $2, hall_address = $3, size = $4, dateUpdated = $5  WHERE hall_uid = $1', 
    [hall_uid, hall_name, hall_address, size, dateUpdated], (err, result) => {
        if(err) { return next (err); }
        res.status(201).send('Hall ' +hall_name+ ' is successfully edited')
    })
}

const deleteHall = (req, res, next) => {
    const hall_uid = req.params.hall_uid;
    db.query('DELETE FROM halls WHERE hall_uid = $1', [hall_uid], (err, result) => {
        if(err) { return next (err); }
        res.status(201).send('Hall is successfully deleted')
    })
}

module.exports = {
    getHalls,
    getHallById,
    createHall,
    updateHall,
    deleteHall
};