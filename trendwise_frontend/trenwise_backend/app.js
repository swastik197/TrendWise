const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('passport');
require('./services/passport');

const project = require('./routes/project')
const { connectDB } = require('./connectDB');
const authRoute = require('./routes/authroute')

const app = express()
dotenv.config()
connectDB(process.env.MONGO_URL);

app.use(cors())
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({extended: true }))


// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false,
// }));

app.use(passport.initialize());
// app.use(passport.session());


app.use('/auth',authRoute)
app.use('/api/article', project)
// app.get('/',(req,res)=>{
//     res.send('hello world')
// })








const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));





