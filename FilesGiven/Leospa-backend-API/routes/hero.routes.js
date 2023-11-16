const Hero = require( '../models/hero.model' );

const express = require( 'express' );
const router = express.Router();

const formData = require('express-form-data');  // multipart formdata - x-www-form-urlencoded håndteres i server.js
router.use(formData.parse());


// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT ALLE - hero" );

    try {
        const heroes = await Hero.find(); //.sort([['alttext', 1]]);
        res.json( heroes );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );



// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get( '/:id', findHero, async ( req, res ) => { //

    console.log( "HENT UDVALGT - hero" )

    res.json( res.hero );

} );



// ----- OPRET/POST NY - ADMIN ---------------------------------------------------------------------------------------

router.post( '/admin', async ( req, res ) => {

    console.log( "POST - hero" )

    try {

        let hero = new Hero( req.body );
        await hero.save();
        res.status( 201 ).json( { message: "Ny er oprettet", oprettet: hero } );

    } catch ( error ) {
        res.status( 400 ).json( { message: "Der er sket en fejl", error: error } );
    }

} );



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete( '/admin/:id', findHero, async ( req, res ) => {

    console.log( "DELETE - hero" )

    try {

        await res.hero.remove();
        res.status( 200 ).json( { message: 'Hero er nu slettet' } )

    } catch ( error ) {
        res.status( 500 ).json( { message: 'Der kan ikke slettes - der er opstået en fejl: ' + error.message } )
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/:id', findHero, async ( req, res ) => {

    console.log( "PUT - hero" )

    try {

        res.hero.title1 = req.body.title1;
        res.hero.title2 = req.body.title2;
        res.hero.content = req.body.content;
        res.hero.link = req.body.link;
        await res.hero.save();
        res.status( 200 ).json( { message: 'Der er rettet', rettet: res.hero } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'Der kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );



// ----- RET SHOW STATUS/PATCH - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.patch( '/admin/:id', async ( req, res ) => {

    console.log( "PATCH - hero" )

    try {

        // Find alle heroes med show=true og sæt til show=false
        await Hero.updateMany( { show: 'true' }, { $set: { show: 'false' } } );
        // Udvalgte (ud fra id-parameter) sættes til show=true
        const hero = await Hero.findByIdAndUpdate( req.params.id, { $set: { show: 'true' } }, { new: true } )

        res.status( 200 ).json( { message: 'Der er rettet', rettet: hero } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'Der kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );



// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findHero ( req, res, next ) {

    console.log( "FIND UD FRA ID - hero" )

    let hero;

    try {

        hero = await Hero.findById( req.params.id );

        if ( hero == null ) {
            return res.status( 404 ).json( { message: 'Ingen hero med den ID' } );
        }


    } catch ( error ) {

        console.log( error );
        return res.status( 500 ).json( { message: "Problemer: " + error.message } );
    }

    res.hero = hero;
    next();
}

module.exports = router;