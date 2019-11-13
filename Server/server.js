const express = require('express');

const app = express();

const {port} = require('./config.json')

const allRouter = require('./routers');

app.use(express.static('./'));

app.use(allRouter);

app.listen(port, () => {
    console.log(`Server hello ${port}`)
})