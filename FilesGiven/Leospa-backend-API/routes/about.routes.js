const About = require( '../models/about.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require('express-form-data');  // multipart formdata - x-www-form-urlencoded håndteres i server.js
router.use(formData.parse());



// ----- HENT/GET  ------------------------------------------------------------------------------------------------------------- 

router.get( '/', async ( req, res ) => { 

    console.log( "GET/hent - about" )

    try {

        let about = await About.findOne();

        if ( about == null ) {
            return res.status( 404 ).json( { message: 'About kunne ikke findes' } );
        }

        res.json( about );

    } catch ( error ) {

        console.log( error );
        return res.status( 500 ).json( { message: "Problemer: " + error.message } ); // problemer med server
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/', async ( req, res ) => {

    console.log( "PUT - about" )

    try {

        let about = await About.findOne();

        about.title = req.body.title;
        about.content = req.body.content;
        await about.save();

        res.status( 200 ).json( { message: 'About er rettet', rettet: about } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'About kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );


module.exports = router;