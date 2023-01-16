const http = require('http');
const express = require('express');
const dotenv = require('dotenv');
const path =require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();

const app = express();
const server = http.createServer(app);
let port = process.env.PORT;
const useRoutes = require('./Routes/router');

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended : true }));
app.use(cors());
app.use(express.json());

//===== creating a session middleware
let oneDay = 1000*60*60*24;
app.use(session({
    secret:'sdgsdryhnfmnhdfdfhdfjh',
    saveUninitialized:true,
    cookie:{maxAge: oneDay},
    resave: false
}));
app.use(cookieParser());

app.use('/',useRoutes);

if(port == null || port == ""){
    port=5000
}

server.listen(port, ()=>{
    console.log(`server running at port ${port} `);
});