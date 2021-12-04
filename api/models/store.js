import mongoose from 'mongoose'

const storeSchema = mongoose.Schema({

    fristname: String,
    phone : Number,
    address: String

})

export default mongoose.model('store',storeSchema)