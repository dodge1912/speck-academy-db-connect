const db = require('../../db/connect');
const uuidv4 = require('uuid/v4');

const getUsers = (req, res, next) => {
    db.query('SELECT * FROM users', (err, result) => {
        if(err) { return next (err); }
        res.send(result.rows)
    })
}

const getUserById = (req, res, next) => {
    const user_uid = req.params.user_uid;
    db.query('SELECT * FROM users WHERE user_uid = $1', [user_uid], (err, result) => {
        if(err) { return next (err); }
        res.send(result.rows)
    })
}

const createUser = (req, res, next) => {
    const user_uid = uuidv4();
    const date_created = new Date();
    const date_updated = new Date();
    const {
        first_name,
        last_name, 
        email,
        user_password
    } = req.body

    db.query('INSERT INTO users ( user_uid, first_name, last_name, email, user_password, date_created, date_updated ) VALUES ( $1 , $2, $3, $4, $5, $6, $7)', 
    [user_uid, first_name, last_name, email, user_password, date_created, date_updated], (err, result) => {
        if(err) { return next (err); }
        res.status(201).send('User ' +first_name+ ' ' +last_name+ ' is successfully created')
    })
}

const updateUser = (req, res, next) => {
    const user_uid = req.params.user_uid;
    const date_updated = new Date();
    const {
        first_name,
        last_name,
        email,
        user_password
    } = req.body;
    
    db.query('UPDATE users SET first_name = $2, last_name = $3, email = $4, user_password = $5, date_updated = $6 WHERE user_uid = $1', 
    [user_uid, first_name, last_name, email, user_password, date_updated], (err, result) => {
        if(err) { return next (err); }
        res.status(201).send('User ' +first_name+ ' ' +last_name+ ' is edited')
    })
}

const deleteUser = (req, res, next) => {
    const user_uid = req.params.user_uid;

    db.query('DELETE FROM users WHERE user_uid = $1', [user_uid], (err, result) => {
        if(err) { return next (err); }
        res.status(201).send('User is successfully deleted')
    })
}

module.exports = {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
}