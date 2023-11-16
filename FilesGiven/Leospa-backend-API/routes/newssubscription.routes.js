const Newssubscription = require( '../models/newssubscription.model' );

const express = require( 'express' );
const router = express.Router();


const formData = require('express-form-data');  // multipart formdata - x-www-form-urlencoded håndteres i server.js
router.use(formData.parse());


/*
    OBS! Alle metoder - bortset fra POST - er admin. 
    Det skal kræve login at se alle kontakter/beskeder - men en bruger skal kunne sende en besked uden at være logget ind.

*/

// ----- HENT/GET  ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT - newssubscription" );

    try {
        res.json( { message: "Newssubscription kræver authorized adgang" } );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );


// ----- HENT/GET ALLE - ADMIN -----------------------------------------------------------------------------------------

router.get( '/admin', async ( req, res ) => {

    console.log( "HENT ALLE - newssubscription" );

    try {

        const newssubscription = await Newssubscription.find();
        res.json( newssubscription );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } ); // 500 = serverproblem
    }

} );



// ----- HENT/GET UDVALGT nyhedsbrevtilmelding - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.get( '/admin/:id', findNewssubscription, async ( req, res ) => { //

    console.log( "HENT UDVALGT - newssubscription" )

    res.json( res.newssubscription );

} );



// ----- OPRET/POST NY - IKKE ADMIN! - (brugere skal kunne poste en tilmelding til nyhedsbrev) --------------------------------------------------------------------

router.post( '/', async ( req, res ) => {

    console.log( "POST - newssubscription" );

    // Tjek først om email findes i forvejen....    
    let findesallerede = await Newssubscription.findOne( { email: req.body.email } )

    if ( findesallerede ) {
        return res.status( 201 ).json( { message: "Bruger findes allerede (OBS - denne besked skal laves om - GDPR!)" } )
    }

    
    try {
        
        const newssubscription = new Newssubscription( req.body );
        await newssubscription.save();
        res.status( 201 ).json( { message: "Ny newssubscription er oprettet", newssubscription: newssubscription } );

    } catch ( error ) {
        res.status( 400 ).json( { message: "Der er sket en fejl", error: error } );
    }

} );



// ----- SLET/DELETE UD FRA ID - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete( '/admin/:id', findNewssubscription, async ( req, res ) => {

    console.log( "DELETE ud fra ID - newssubscription" )

    try {

        await res.newssubscription.remove();
        res.status( 200 ).json( { message: 'newssubscription er nu slettet' } )

    } catch ( error ) {
        res.status( 500 ).json( { message: 'newssubscription kan ikke slettes - der er opstået en fejl: ' + error.message } )
    }

} );



// ----- SLET/DELETE UD FRA EMAIL - IKKE ADMIN (en besøgende skal kunne afmelde sig med sin email) ------------------------------------------------------------------------------------------------------------ 

router.delete( '/afmeld', async ( req, res ) => {

    console.log( "DELETE ud fra EMAIL - newssubscription" )

    try {

        let emailslettes = req.body.email;

        let newssubscription = await Newssubscription.findOne( { email: emailslettes } );

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: 'Ingen newssubscription med den email (pas på GDPR!' } );
        }

        await newssubscription.remove();
        res.status( 200 ).json( { message: 'newssubscription er nu slettet' } )

    } catch ( error ) {
        res.status( 500 ).json( { message: 'newssubscription kan ikke slettes - der er opstået en fejl: ' + error.message } )
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/:id', findNewssubscription, async ( req, res ) => {

    console.log( "PUT - newssubscription" )

    try {

        // Husk at id ikke er med i req.body - derfor dur det ikke med res.gaade = req.body;
        res.newssubscription.email = req.body.email;
        res.newssubscription.name = req.body.name;


        await res.newssubscription.save();
        res.status( 200 ).json( { message: 'newssubscription er rettet', newssubscription: res.newssubscription } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'newssubscription kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );



// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findNewssubscription ( req, res, next ) {

    console.log( "FIND UD FRA ID - newssubscription" )

    let newssubscription;

    try {

        newssubscription = await Newssubscription.findById( req.params.id );

        if ( newssubscription == null ) {
            return res.status( 404 ).json( { message: 'Ingen newssubscription med den ID' } );
        }


    } catch ( error ) {

        console.log( error );
        return res.status( 500 ).json( { message: "Problemer: " + error.message } );
    }

    res.newssubscription = newssubscription;
    next();
}


module.exports = router;