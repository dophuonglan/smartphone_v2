const { response } = require('express');
var express = require('express');
var app=express();
var router = express.Router();
const sql = require('mssql')
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
const pool1Connect = pool1.connect().then(pool =>{
  console.log('ok');
  return pool
});

const port = 4000;

// connect
/* GET home page. */
app.get('/',async function(req, res, next) {
  
});

app.post('/postdata',async function(req, res, next) {
  // res.render('index', { title: 'Express' });
  const test = await pool1Connect;
  const result = await test.request().query("insert into Account(Account,Address,Name,Password,Phone,Status) values ('langahsjis','quangtrung','phuonglan','lan7w87q897987981',24246354,1)");
  console.log(result);
  console.log('0kkkkkkkkkkkkkkkkkk');
  const {recordset :users } = result
  return res.status(200).send(users);
});

app.get('/getdata01',async function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  const test = await pool1Connect;
  const result = await test.request().query('select * from Account');
  console.log(result);
  console.log('ok1sdeg')
  const {recordset :users } = result
  return res.status(200).send(users);
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

module.exports = router;
