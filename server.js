const express = require("express");
const apiroutes = require('./routes/api-routes');
const htmlroutes = require('./routes/html-routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

app.use('/api', apiroutes);
app.use('/', htmlroutes);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);

