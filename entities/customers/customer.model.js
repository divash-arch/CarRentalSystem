const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

const customerSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    Address: String
});