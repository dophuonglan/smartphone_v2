const { response } = require('express');
var express = require('express');
var app = express();
var router = express.Router();
const sql = require('mssql')
var cors = require('cors');
app.use(cors());
const config = {
  user: 'sa',
  password: '123',
  server: "localhost\\SQLEXPRESS",
  database: 'WebShop',
  port: 1433,
  options: {
    encrypt: false
  }
};
const pool1 = new sql.ConnectionPool(config);
const pool1Connect = pool1.connect().then(pool => {
  console.log('ok');
  return pool
});
const port = 4000;
const bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyParser.json());
app.get('/', async function (req, res, next) {

});

app.get('/getdata', async function (req, res, next) {
  const test = await pool1Connect;
  const result = await test.request().query("insert into Account(Account,Address,Name,Password,Phone,Status) values ('langahsjis','quangtrung','phuonglan','lan7w87q897987981',24246354,1)");
  console.log(result);
  console.log('0kkkkkkkkkkkkkkkkkk');
  const { recordset: users } = result
  return res.status(200).send(users);
});

app.get('/getdata01', async function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  const test = await pool1Connect;
  const result = await test.request().query('select * from Account');
  console.log(result);
  const { recordset: users } = result
  return res.status(200).send(users);
});

app.post('/signin', async function (req, res, next) {
  var user_name = req.body.email.toString();
  var pass = req.body.password.toString();
  const test = await pool1Connect;
  const result = await test.request().query('select * from Account');
  if ((result.recordset.find((ac) =>
  (ac.Password.trim() === pass && ac.Account === user_name )))) {
    res.status(200).send(true);
  }
  else res.status(200).send(false);

})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = router;
