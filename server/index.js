const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

require('dotenv').config();

//mongodb connnection
const mongoose = require('mongoose');
const dbUsername = process.env.MONGODB_USERNAME;
const dbPassword = process.env.MONGODB_PASSWORD;
const dbUri = `mongodb+srv://${dbUsername}:${dbPassword}@cluster0.vpsvnqs.mongodb.net/sharewithme?retryWrites=true&w=majority`;
mongoose.connect(dbUri, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(res => console.log('Connected to database'))
    .catch(err => console.log(err));

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});

app.use(cors());
app.use(bodyParser.json({
    limit: '50mb',
    extended: true,
}));

const API_NAME_LIST = ['post', 'login'];

for (let apiName of API_NAME_LIST){
    // console.log(apiName);
    require(`./api/${apiName}`)(app);
}