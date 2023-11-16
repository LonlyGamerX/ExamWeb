const mongoose = require( 'mongoose' );

const appointmentSchema = new mongoose.Schema( {

    name: {
        type: String,
        required: [ true, 'Appointment: Name/navn er påkrævet!' ],
    },
    email: {
        type: String,
        required: [ true, 'Appointment: Email er påkrævet!' ],
    },
    phone: {
        type: String,
        required: [ true, 'Appointment: Phone/telefonnummer er påkrævet!' ],
    },
    dateandtime: {
        type: Date, // dato og tid - lægges sammen i route
        required: [ true, 'Appointment: Date/dato og tid er påkrævet!' ],
    },
    notes: {
        type: String
    },
    treatment: {
        type: mongoose.Schema.ObjectId,
        ref: 'Treatment',
        required: [ true, 'Appointment: Appointments/aftalens valg af treatment/behandling er påkrævet!' ],
    }
} )


module.exports = mongoose.model( 'Appointment', appointmentSchema, 'appointment' )