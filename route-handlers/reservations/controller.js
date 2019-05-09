const db = require ('../../db/connect');
const uuidv4 = require ('uuid/v4');

const getReservations = (req, res, next) => {
    db.query('SELECT * FROM reservations', (err, result) => {
        if(err) { return next (err); }
        res.send(result.rows)
    })
}

const getReservationById = (req, res, next) => {
    const reservation_uid = req.params.reservation_uid;
    db.query("SELECT * FROM reservations WHERE reservation_uid = $1", 
    [reservation_uid],  (err, result) => {
        if(err) { return next (err); }
        res.status(201).send(result.rows)
    })
}

const createReservation = (req, res, next) => {
    const reservation_uid = uuidv4();
    const reservation_status = 1;
    const reserved_from = req.body.reserved_from;
    const reserverd_until = req.body.reserverd_until;
    const date_created = new Date();
    const date_updated = new Date();
    const hall_uid = req.body.hall_uid;

    db.query('INSERT INTO reservations VALUES ($1, $2, $3, $4, $5, $6, $7)', 
    [reservation_uid, reservation_status, reserved_from, reserverd_until, date_created, date_updated, hall_uid ], (err, result) => {
        if(err) { return next (err); }
        res.status(201).send('Reservation is created')
    })
}

const updateReservations = (req, res, next) => {
    const reservation_uid = req.params.reservation_uid;
    const reservation_status = req.body.reservation_status;
    const reserved_from = req.body.reserved_from;
    const reserverd_until = req.body.reserverd_until;
    const date_updated = new Date();

    db.query('UPDATE reservations SET reservation_status = $1, reserved_from = $2, reserverd_until = $3, date_updated = $4 WHERE reservation_uid = $5', 
    [reservation_status, reserved_from, reserverd_until, date_updated, reservation_uid], (err, result) => {
        if(err) { return next (err); }
        res.status(201).send('Reservation is edited')
    })
}

const deleteReservations = (req, res, next) => {
    const reservation_uid = req.params.reservation_uid;

    db.query('DELETE FROM reservations WHERE reservation_uid = $1', [reservation_uid], (err, result) => {
        if(err) { return next (err); }
        res.status(201).send('Reservation is deleted')
    })
}

module.exports = {
    getReservations,
    getReservationById,
    createReservation,
    updateReservations,
    deleteReservations
}
