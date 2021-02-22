const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./route/blogRoutes');

//express app
const app = express();


//register view engine
app.set('view engine', 'ejs');

//connect to mongodb

const dbURI = 'mongodb+srv://<user.name>:<password>@<mongodbURI>';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(result => {
        app.listen(3000);
    })
    .catch( err => {
        console.log(err);
    })

//middleware and static files
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));


//routes
app.get('/', (req, res) => {

   res.redirect('/blogs');
});

app.get('/about', (req, res) => {
   res.render('about', { title: 'About' })
});

//blog routes
app.use('/blogs', blogRoutes);


//404
app.use((req, res) => {
    //res.send('<p>About page</p>');
    res.status(404).render('404', { title: '404'});
});
