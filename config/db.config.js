const mongoose = require("mongoose")

exports.dbConfig = () => {
    mongoose.connect(process.env.DB_URI).then(() => {
        console.log("Successfully connected to the database")
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err)
        process.exit()
    })
}