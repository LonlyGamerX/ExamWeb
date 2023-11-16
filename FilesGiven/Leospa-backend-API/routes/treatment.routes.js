const Treatment = require( '../models/treatment.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/treatment' );   // path til image-folder
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );


// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT ALLE - treatments" );

    try {
        const treatments = await Treatment.find(); 
        res.json( treatments );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );


// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get( '/:id', findTreatment, async ( req, res ) => { //

    console.log( "HENT UDVALGT - treatment" )

    res.json( res.treatment );

} );



// ----- OPRET/POST NY - ADMIN ---------------------------------------------------------------------------------------

router.post( '/admin', upload.single( 'image' ), async ( req, res ) => {

    console.log( "POST - treatment" )

    try {

        let treatment = new Treatment( req.body );
        treatment.image = req.file ? req.file.filename : "paavej.jpg";
        
        await treatment.save();
        res.status( 201 ).json( { message: "Ny er oprettet", oprettet: treatment } );

    } catch ( error ) {
        res.status( 400 ).json( { message: "Der er sket en fejl", error: error } );
    }

} );



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete( '/admin/:id', findTreatment, async ( req, res ) => {

    console.log( "DELETE - treatment" )

    try {

        await res.treatment.remove();
        res.status( 200 ).json( { message: 'Treatment er nu slettet' } )

    } catch ( error ) {
        res.status( 500 ).json( { message: 'Der kan ikke slettes - der er opstået en fejl: ' + error.message } )
    }

} );



// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/:id', upload.single( 'image' ), findTreatment, async ( req, res ) => {

    console.log( "PUT - treatment" )

    try {

        res.treatment.title = req.body.title;
        res.treatment.content = req.body.content;

        // håndterer at billedet måske ikke skal udskiftes
        if ( req.file ) {
            res.treatment.image = req.file.filename;
        }

        await res.treatment.save();
        res.status( 200 ).json( { message: 'Der er rettet', rettet: res.treatment } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'Der kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );



// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findTreatment ( req, res, next ) {

    console.log( "FIND UD FRA ID - treatment" )

    let treatment;

    try {

        treatment = await Treatment.findById( req.params.id );

        if ( treatment == null ) {
            return res.status( 404 ).json( { message: 'Ingen treatment med den ID' } );
        }


    } catch ( error ) {

        console.log( error );
        return res.status( 500 ).json( { message: "Problemer: " + error.message } );
    }

    res.treatment = treatment;
    next();
}

module.exports = router;