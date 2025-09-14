const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogroutes');

const app = express();

const dbURI = "mongodb+srv://shaswatjain05112005:shaswatjain05112005@nodetuts.dlvk1j6.mongodb.net/test?retryWrites=true&w=majority&appName=nodetuts";

mongoose.connect(dbURI)
  .then(() => {
    console.log('✅ Connected to DB');
    app.listen(4000, () => console.log('Server running on port 4000'));
  })
  .catch(err => console.log('❌ DB Connection Error:', err));

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

/*
app.get('/add-blog', (req, res)=> {
  const blog = new Blog({
    title: 'New Blog 2',
    snippet: 'About my new blog',
    body: 'More about my new blog'
  });
  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});
app.get('/all-blogs', (req, res) => {
  Blog.find()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
})

app.get('/single-blog', (req, res) => {
  Blog.findById('68c17b0d775d8ce8880f4842')
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
})
  */
    
app.get('/', (req, res) => {
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});

app.use('/blogs',blogRoutes);


app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});
