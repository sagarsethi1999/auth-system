const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./db/sequelize');
const User = require('./models/User');
const cors = require('cors');
const fs = require('fs');
const url = require('url');
const path = require('path');
const { FORCE } = require('sequelize/lib/index-hints');


const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Sync Sequelize models with the database
sequelize
.sync()
// .sync({force : true})
  .then(() => {
    console.log('Database synchronized');
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });

app.use('/api/users', userRoutes);

// app.use((req, res) => {
//   console.log(`url`, req.url);
//   res.sendFile(path.join(__dirname,`public/${req.url}`))
// })
app.use((req, res, next) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname;
  const sanitizedPath = path.normalize(pathname).replace(/^(\.\.[\/\\])+/, '');
  const filePath = path.join(__dirname, 'public', sanitizedPath);

  console.log(`Request URL: ${req.url}`);
  console.log(`Sanitized Path: ${sanitizedPath}`);

  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).send('File not found');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
