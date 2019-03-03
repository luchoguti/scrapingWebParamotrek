const express = require ('express');
const path = require('path');
const exhbs = require('express-handlebars');

//Initilizations
const app = express();

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exhbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');

//Routes
app.use(require('./routes/routeHome'));
app.use(require('./routes/routeScraping'));

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Server is listenning
app.listen(app.get('port'),()=>{
    console.log('Server on port', app.get('port'));
});