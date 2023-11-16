const mongoose = require( 'mongoose' );

const treatmentSchema = new mongoose.Schema( {

    title: {
        type: String,
        required: [ true, 'Treatment: Title/titel er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Treatment: Content-text (beskrivelse) er påkrævet!' ]
    },
    image: {
        type: String,
        required: [ true, 'Treatment: Image/foto er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'Treatment', treatmentSchema, 'treatment' )