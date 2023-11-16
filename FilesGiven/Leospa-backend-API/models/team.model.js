const mongoose = require( 'mongoose' );

const teamSchema = new mongoose.Schema( {

    firstname: {
        type: String,
        required: [ true, 'Team: Firstname/fornavn er påkrævet!' ]
    },
    lastname: {
        type: String,
        required: [ true, 'Team: Lastname/efternavn er påkrævet!' ]
    },
    role: {
        type: String,
        required: [ true, 'Team: Role/rolle er påkrævet!' ]
    },
    image: {
        type: String,
        required: [ true, 'Team: Image/foto er påkrævet!' ]
    }
} )


module.exports = mongoose.model( 'Team', teamSchema, 'team' )