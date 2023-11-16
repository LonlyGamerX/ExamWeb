const mongoose = require( 'mongoose' );

const heroSchema = new mongoose.Schema( {

    title1: {
        type: String,
        required: [ true, 'Hero: Title1/øverste titel er påkrævet!' ]
    },
    title2: {
        type: String,
        required: [ true, 'Hero: Title2/næste titel er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Hero: Content-tekst er påkrævet!' ]
    },
    link: {
        type: String
    },
    show: {
        type: Boolean,
        default: false
    }
} )


module.exports = mongoose.model( 'Hero', heroSchema, 'hero' )