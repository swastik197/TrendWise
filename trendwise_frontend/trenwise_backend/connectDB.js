const mongoose = require('mongoose')
function connectDB(url){
    mongoose.connect(url)
    .then(console.log('mongodb connected'))
    .catch(err=>{console.log('error in connecting mongodb',err)})

}
module.exports = {connectDB}
