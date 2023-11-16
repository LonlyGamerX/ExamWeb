const mongoose = require( 'mongoose' );

const footerSchema = new mongoose.Schema( {

    name: {
        type: String,
        required: [ true, 'Footer: Name/firmanavn er påkrævet!' ],
    },
    cvr: {
        type: String,
        required: [ true, 'Footer: CVR-nummer er påkrævet' ],
    },
    address: {
        type: String,
        required: [ true, 'Footer: Adresse er påkrævet' ],
    },
    zipncity: {
        type: String,
        required: [ true, 'Footer: Zip/postnummer og city/by er påkrævet' ],
    },
    phone: {
        type: String,
        required: [ true, 'Footer: Phone/telefonnummer er påkrævet' ],
    },
    email: {
        type: String,
        required: [ true, 'Footer: Mail er påkrævet' ],
    },
    openinghours: {
        type: String,
        required: [ true, 'Footer: Openinghours/åbningstider er påkrævet' ]
    }
} )


module.exports = mongoose.model( 'Footer', footerSchema, 'footer' )