const app = require("./app")
require("dotenv").config()

const port = process.env.PORT || 8000

const mongoose = require('mongoose');
async function main() {
    await mongoose.connect( process.env.MONGODB_URL);
}

main().catch(err => console.log(err)).then(() => console.log("database is connected"));


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})