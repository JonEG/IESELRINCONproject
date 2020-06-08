const express = require('express');
const app = express();

//process.env.PORT -> enviroment variable hosted in our pc
app.set('PORT', process.env.PORT || 8000);

app.use(express.json());


// Configure headers and cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});


//routes
app.use(require('./src/routes/departmentRoutes'));
app.use(require('./src/routes/roleRoutes'));
app.use(require('./src/routes/dateStateRoutes'));
app.use(require('./src/routes/dateTypeRoutes'));
app.use(require('./src/routes/tutorRoutes'));
app.use(require('./src/routes/professionalRoutes'));
app.use(require('./src/routes/timetableRoutes'));
app.use(require('./src/routes/dateRoutes'));


app.listen(app.get('PORT'),'192.168.1.122', ()=>{
    console.log(`SERVER IN PORT ${app.get('PORT')}`);
});
