const Recommendation = require( '../models/recommendation.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/recommendation' );   // path til image-folder
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT ALLE - recommendations" );

    try {
        const recommendations = await Recommendation.find(); //.sort([['alttext', 1]]);
        res.json( recommendations );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );


// ----- HENT/GET X ANTAL NYESTE ------------------------------------------------------------------------------------------

router.get( '/antal/:antal', async ( req, res ) => {

    console.log( "HENT X ANTAL NYESTE - recommendations" );

    try {

        let antal;
        if (!isNaN(parseInt(req.params.antal))) antal = parseInt(req.params.antal);

        const recommendations = await Recommendation.find().limit(antal).sort([['created', 1]]);
        res.json( recommendations );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );



// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get( '/:id', findRecommendation, async ( req, res ) => { //

    console.log( "HENT UDVALGT - recommendation" )

    res.json( res.recommendation );

} );



// ----- OPRET/POST NY - ADMIN ---------------------------------------------------------------------------------------

router.post( '/admin', upload.single( 'image' ), async ( req, res ) => {

    console.log( "POST - recommendation" )

    try {

        let recommendation = new Recommendation( req.body );
        recommendation.image = req.file ? req.file.filename : "paavej.jpg";
        
        await recommendation.save();
        res.status( 201 ).json( { message: "Ny er oprettet", oprettet: recommendation } );

    } catch ( error ) {
        res.status( 400 ).json( { message: "Der er sket en fejl", error: error } );
    }

} );



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete( '/admin/:id', findRecommendation, async ( req, res ) => {

    console.log( "DELETE - recommendation" )

    try {

        await res.recommendation.remove();
        res.status( 200 ).json( { message: 'Recommendation er nu slettet' } )

    } catch ( error ) {
        res.status( 500 ).json( { message: 'Der kan ikke slettes - der er opstået en fejl: ' + error.message } )
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/:id', upload.single( 'image' ), findRecommendation, async ( req, res ) => {

    console.log( "PUT - recommendation" )

    try {

        res.recommendation.name = req.body.name;
        res.recommendation.title = req.body.title;
        res.recommendation.content = req.body.content;
        // created skal ikke kunne redigeres

        // håndterer at billedet måske ikke skal udskiftes
        if ( req.file ) {
            res.recommendation.image = req.file.filename;
        }

        await res.recommendation.save();
        res.status( 200 ).json( { message: 'Der er rettet', rettet: res.recommendation } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'Der kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );



// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findRecommendation ( req, res, next ) {

    console.log( "FIND UD FRA ID - recommendation" )

    let recommendation;

    try {

        recommendation = await Recommendation.findById( req.params.id );

        if ( recommendation == null ) {
            return res.status( 404 ).json( { message: 'Ingen recommendation med den ID' } );
        }


    } catch ( error ) {

        console.log( error );
        return res.status( 500 ).json( { message: "Problemer: " + error.message } );
    }

    res.recommendation = recommendation;
    next();
}

module.exports = router;