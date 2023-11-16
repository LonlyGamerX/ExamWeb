const Team = require( '../models/team.model' );

const express = require( 'express' );
const router = express.Router();


// ----- Multer til upload af images -----------------------------------------------------------------------------

const multer = require( 'multer' );
const upload = multer( {

    storage: multer.diskStorage( {
        destination: function ( req, file, cb ) {
            cb( null, 'public/images/team' );   // path til image-folder
        },
        filename: function ( req, file, cb ) {
            //cb(null, Date.now() + '-' + file.originalname)
            cb( null, file.originalname )
        }
    } )
} );



// ----- HENT/GET ALLE ------------------------------------------------------------------------------------------

router.get( '/', async ( req, res ) => {

    console.log( "HENT ALLE - team" );

    try {
        const teams = await Team.find(); 
        res.json( teams );

    } catch ( err ) {
        res.status( 500 ).json( { message: "Der var en fejl i: " + err.message } );
    }

} );


// ----- HENT/GET UDVALGT  ------------------------------------------------------------------------------------------------------------- 

router.get( '/:id', findTeam, async ( req, res ) => { //

    console.log( "HENT UDVALGT - team" )

    res.json( res.team );

} );



// ----- OPRET/POST NY - ADMIN ---------------------------------------------------------------------------------------

router.post( '/admin', upload.single( 'image' ), async ( req, res ) => {

    console.log( "POST - team" )

    try {

        let team = new Team( req.body );
        team.image = req.file ? req.file.filename : "paavej.jpg";
        
        await team.save();
        res.status( 201 ).json( { message: "Ny er oprettet", oprettet: team } );

    } catch ( error ) {
        res.status( 400 ).json( { message: "Der er sket en fejl", error: error } );
    }

} );



// ----- SLET/DELETE - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.delete( '/admin/:id', findTeam, async ( req, res ) => {

    console.log( "DELETE - team" )

    try {

        await res.team.remove();
        res.status( 200 ).json( { message: 'Team er nu slettet' } )

    } catch ( error ) {
        res.status( 500 ).json( { message: 'Der kan ikke slettes - der er opstået en fejl: ' + error.message } )
    }

} );


// ----- RET/PUT - ADMIN ------------------------------------------------------------------------------------------------------------ 

router.put( '/admin/:id', upload.single( 'image' ), findTeam, async ( req, res ) => {

    console.log( "PUT - team" )

    try {

        res.team.firstname = req.body.firstname;
        res.team.lastname = req.body.lastname;
        res.team.role = req.body.role;

        // håndterer at billedet måske ikke skal udskiftes
        if ( req.file ) {
            res.team.image = req.file.filename;
        }

        await res.team.save();
        res.status( 200 ).json( { message: 'Der er rettet', rettet: res.team } );

    } catch ( error ) {
        res.status( 400 ).json( { message: 'Der kan ikke rettes - der er opstået en fejl: ' + error.message } )
    }

} );



// MIDDLEWARE: FIND UD FRA ID  ---------------------------------------------------------------------------------------------

async function findTeam ( req, res, next ) {

    console.log( "FIND UD FRA ID - team" )

    let team;

    try {

        team = await Team.findById( req.params.id );

        if ( team == null ) {
            return res.status( 404 ).json( { message: 'Ingen team med den ID' } );
        }


    } catch ( error ) {

        console.log( error );
        return res.status( 500 ).json( { message: "Problemer: " + error.message } );
    }

    res.team = team;
    next();
}

module.exports = router;