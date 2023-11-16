const mongoose = require( 'mongoose' );

const recommendationSchema = new mongoose.Schema( {

    name: {
        type: String,
        required: [ true, 'Recommendation: Name/navn er påkrævet!' ],
    },
    title: {
        type: String,
        required: [ true, 'Recommendation: Title/titel er påkrævet!' ]
    },
    content: {
        type: String,
        required: [ true, 'Recommendation: Content-tekst er påkrævet!' ],
    },
    created: {
        type: Date,
        default: Date.now()
    },
    image: {
        type: String,
        required: [ true, 'Recommendation: Image/foto er påkrævet!' ],
    }
} )


module.exports = mongoose.model( 'Recommendation', recommendationSchema, 'recommendation' )