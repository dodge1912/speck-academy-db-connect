const express = require('express');
const bodyParser = require('body-parser');
const { hallsHandler } = require('./route-handlers');

const router = new express.Router();
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// TODO: Base routes
router.use('/halls', hallsHandler);
// Test route
router.get('/', (req, res) => {
  res.send('ok');
});

app.use('/', router);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));