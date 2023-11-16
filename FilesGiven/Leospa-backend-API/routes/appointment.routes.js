const Appointment = require( '../models/appointment.model' );

const express = require( 'express' );
const router = express.Router();


const formData = require( 'express-form-data' );  // multipart formdata - x-www-form-urlencoded håndteres i server.js
router.use( formData.parse() );


// ----- HENT/GET  ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT - appointment" );

    try {
        res.json( { message: "Appointments kræver authorized adgang" } );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );



// ----- HENT/GET ALLE - ADMIN ------------------------------------------------------------------------------------------

router.get( '/admin', async ( req, res ) => {

    console.log( "HENT ALLE - appointment" );

    try {
        const appointments = await Appointment.find().populate( {path: 'treatment', select: '_id title'} ).sort( [ [ 'dateandtime', 1 ] ] );
        res.json( appointments );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );


// ----- POST! HENT/GET UDVALGTE UD FRA PHONE OG EMAIL - IKKE ADMIN  ------------------------------------------------------------------------------------------------------------- 

router.post( '/myappointments', async ( req, res ) => { //

    console.log( "HENT UDVALGT UD FRA PHONE OG EMAIL - appointment" )

    try {
        let email = req.body.email
        let phone = req.body.phone

        console.log( email, phone )

        let appointments = await Appointment.find( { email: email, phone: phone } )
        res.json( appointments );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );


// ----- HENT/GET UDVALGT - ADMIN ------------------------------------------------------------------------------------------------------------- 

router.get( '/admin/:id', findAppointment, async ( req, res ) => { //

    console.log( "HENT UDVALGT - appointment" )

    res.json( res.appointment );

} );


// ----- OPRET/POST NY - IKKE ADMIN!!!! ---------------------------------------------------------------------------------------

router.post( '/', async ( req, res ) => {

    console.log( "POST - appointment" )

    try {

        let appointment = new Appointment();
        appointment.name = req.body.name;
        appointment.email = req.body.email;
        appointment.phone = req.body.phone;
        appointment.treatment = req.body.treatment;  // id til treatment
        appointment.dateandtime = req.body.date + " " + req.body.time;
        appointment.notes = req.body.notes;

        await appointment.save();

        res.status( 201 ).json( { message: "Ny er oprettet", oprettet: appointment } );

    } catch ( error ) {
        res.status( 400 ).json( { message: "Der er sket en fejl", error: error } );
    }

} );



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete( '/admin/:id', findAppointment, async ( req, res ) => {

    console.log( "DELETE - appointment" )

    try {

        await res.appointment.remove();
        res.status( 200 ).json( { message: 'Appointment er nu slettet' } )

    } catch ( error ) {
        res.status( 500 ).json( { message: 'Der kan ikke slettes - der er opstået en fejl: ' + error.message } )
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/:id', findAppointment, async ( req, res ) => {

    console.log( "PUT - appointment" )

    try {



        res.appointment.name = req.body.name;
        res.appointment.email = req.body.email;
        res.appointment.phone = req.body.phone;
        res.appointment.treatment = req.body.treatment;  // id til treatment
        res.appointment.dateandtime = req.body.date + " " + req.body.time;
        res.appointment.notes = req.body.notes;

        await res.appointment.save();
        res.status( 200 ).json( { message: 'Der er rettet', rettet: res.appointment } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'Der kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );



// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findAppointment ( req, res, next ) {

    console.log( "FIND UD FRA ID - appointment" )

    let appointment;

    try {

        appointment = await Appointment.findById( req.params.id ).populate( 'treatment' );

        if ( appointment == null ) {
            return res.status( 404 ).json( { message: 'Ingen appointment med den ID' } );
        }


    } catch ( error ) {

        console.log( error );
        return res.status( 500 ).json( { message: "Problemer: " + error.message } );
    }

    res.appointment = appointment;
    next();
}

module.exports = router;