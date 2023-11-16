const Footer = require( '../models/footer.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require('express-form-data');  // multipart formdata - x-www-form-urlencoded håndteres i server.js
router.use(formData.parse());

/*
    OBS!
    About findes som 1 instans i databasen og kan derfor kun rettes (ikke opret/slet)
*/


// ----- HENT/GET  ------------------------------------------------------------------------------------------------------------- 

router.get( '/', async ( req, res ) => { 

    console.log( "GET/hent - footer" )

    try {

        let footer = await Footer.findOne();

        if ( footer == null ) {
            return res.status( 404 ).json( { message: 'Footer kunne ikke findes' } );
        }

        res.json( footer );

    } catch ( error ) {

        console.log( error );
        return res.status( 500 ).json( { message: "Problemer: " + error.message } ); // problemer med server
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/', async ( req, res ) => {

    console.log( "PUT - footer" )

    try {

        let footer = await Footer.findOne();

        footer.name = req.body.name;
        footer.cvr = req.body.cvr;
        footer.address = req.body.address;
        footer.zipncity = req.body.zipncity;
        footer.phone = req.body.phone;
        footer.email = req.body.email;
        footer.openinghours = req.body.openinghours;
        await footer.save();

        res.status( 200 ).json( { message: 'Footer er rettet', rettet: footer } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'Footer kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );



module.exports = router;