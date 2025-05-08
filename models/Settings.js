const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema({
    logo: {
        type: String,
    },
    banners: [],
    fbLink: {
        type: String,
    },
    instaLink: {
        type: String,
    },
    emailLink: {
        type: String,
    },
    xLink: {
        type: String,
    },
    whatsapp: {
        type: String,
    }
},{timeseries: true})

module.exports = mongoose.model("Settings", settingsSchema)