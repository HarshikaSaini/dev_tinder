const mongooes = require("mongoose")

const connection = async () => {
   await mongooes.connect(process.env.URL)
}

module.exports = connection