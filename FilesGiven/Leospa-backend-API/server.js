require( 'dotenv' ).config(); // KUN TIL DEV/test lokalt - 

const cors = require( 'cors' );
const express = require( 'express' );

const app = express();
const PORT = process.env.PORT;



// ----- Mongoose og MongoDB -------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

const mongoose = require( 'mongoose' );

mongoose.connect( process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true } );
//mongoose.connect(process.env.DATABASE_URL_EXT, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
const db = mongoose.connection;
db.on( 'error', ( error ) => console.error( error ) );
db.once( 'open', () => console.log( "/// ---> MongoDATABSE: Ohøj der - jeg er klar til indsats og er sulten efter data!  ¯\\_(ツ)_/¯ " ) );



// ----- APP -----------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------

app.use( cors( { credentials: true, origin: true } ) );         // CORS
app.use( express.static( 'public' ) )                           // Kald til statiske filer -> public-folder
app.use( express.json() );                                    // Mulighed for json
app.use( express.urlencoded( { extended: true } ) );            // Aht post/put x-www-form-urlencoded



// ----- SESSION - (stored/opbevares i mongoDB) ------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------


const session = require( 'express-session' );
const MongoStore = require( 'connect-mongo' )( session ); // downgrade til v3 - se _om.txt

const FOUR_DAYS = 1000 * 60 * 60 * 24 * 4;
// Session med config-object i sig https://www.youtube.com/watch?v=OH6Z0dJ_Huk ca. 3:00
app.use( session( {
    name: process.env.SESSION_NAME,
    resave: false, // oprindelig true
    saveUninitialized: false, // hvis true sættes der en session-cookie ved hvert besøg til api'et - uden userID hvis ikke logget ind. False så er der kun cookie ved login
    store: new MongoStore( { mongooseConnection: db } ), // session gemmes i mongo
    secret: process.env.SESS_SECRET,
    cookie: {
        maxAge: FOUR_DAYS,
        sameSite: 'strict', // 'strict' 'none' og 'lax' giver problemer i browser
        secure: false, //process.env.NODE_ENV === 'production', ... om http eller https
        httpOnly: true // kun serverside adgang til cookie - ikke adgang fra js clientside med fx document.cookie
    }
} ) )



// ----- ROUTES --------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------


//  INDEX
app.get( '/', async ( req, res ) => {
    console.log( "Velkommen til serverens startside - vælg 1 route hvis du vil andet end denne console-log-sniksnak!" );
    res.status( 200 ).json( {
        message: 'Velkommen til serverens startside',
        port: "5029",
        about_endpoint: "http://localhost:5029/about",
        appointment_endpoint: "http://localhost:5029/appointment",
        footer_endpoint: "http://localhost:5029/footer",
        hero_endpoint: "http://localhost:5029/hero",
        newssubscription_endpoint: "http://localhost:5029/newssubscription",
        recommendation_endpoint: "http://localhost:5029/recommendation",
        recommendation_images: "http://localhost:5029/images/recommendation/",
        team_endpoint: "http://localhost:5029/team",
        team_images: "http://localhost:5029/images/team/",
        treatment_endpoint: "http://localhost:5029/treatment",
        treatment_images: "http://localhost:5029/images/treatment/"
    } );

} );


// OBS OBS OBS UDKOMMENTER DENNE DEL - hvis login-tjek på serverplan skal slås fra ... og omvendt!
// Hvis slået til, er der kun adgang til routes med "admin" hvis man er logget ind (session cookie!)

// ----- TJEK OM AUTHORIZED (der er logget ind og sessioncookie er sat) hvis route indeholder ordet admin
app.use('*/admin*', async (req, res, next) => {


    if (req.session && req.session.userId) {
        console.log("Login godkendt - brugers ID: ", req.session.userId, " sessionID: ", req.sessionID)
        return next()
    } else {
        return res.status(401).json({ message: 'Du har ikke adgang - du skal være logget ind' }) //route
    }

})



app.use( '/about', require( './routes/about.routes' ) );
app.use( '/appointment', require( './routes/appointment.routes' ) );
app.use( '/recommendation', require( './routes/recommendation.routes' ) );
app.use( '/hero', require( './routes/hero.routes' ) );
app.use( '/treatment', require( './routes/treatment.routes' ) );
app.use( '/team', require( './routes/team.routes' ) );
app.use( '/newssubscription', require( './routes/newssubscription.routes' ) );
app.use( '/footer', require( './routes/footer.routes' ) );
app.use( '/user', require( './routes/user.routes' ) );
app.use( '/login', require( './routes/login.routes' ) );




// ----- LISTEN --------------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------------------------------------
app.listen( PORT, () => {
    console.log( '/// ---> API-SERVER: Jeg er eksamensklar, fuld af energi, ønsker dig held og lykke - og så lytter jeg efter alle dine ønsker på PORT ' + PORT + "  ۜ¯\\_(ツ)_/¯" )
    console.log( '/// ---> LINK til API startside: http://localhost:' + PORT + "/" )
} );
