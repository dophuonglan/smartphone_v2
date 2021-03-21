const { response } = require('express');
var express = require('express');
const cookieParser = require('cookie-parser');
var app = express();
var router = express.Router();
const sql = require('mssql')
var cors = require('cors');
const bcrypt = require('bcrypt');
app.use(cors());
app.use(cookieParser());
const { sendEmail } = require('./mail');
const util = require('util');

const path = require("path");
const multer = require("multer");
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
let test;
const CreateQuery = async () => {
  test = await pool1Connect;
}


// connection
const pool1 = new sql.ConnectionPool(config);
const pool1Connect = pool1.connect().then(pool => {
  CreateQuery();
  return pool
});
const port = 4000;
const bodyParser = require('body-parser');
const { json } = require('body-parser');
app.use(bodyParser.json());

const storage = multer.diskStorage({
  destination: "./public/uploads/",
  filename: function (req, file, cb) {
    cb(null, "IMAGE-" + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
}).single("myImage");

const uploadAsync = (req, res) => {
  return new Promise(function (resolve, reject) {
    upload(req, res, function (err) {
      if (err) return reject(err);
      resolve(req.file);
    });
  });
}

app.post("/upload", async (req, res, next) => {
  console.log(req);
  const file = await uploadAsync(req, res);
  console.log(file);
  await test.request().query(`update Product set Image = '${file.path}'
  where  IDProduct = '${req.body.IDProduct}'`).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
});

app.post("/uploadSlide", async (req, res, next) => {
  console.log(req);
  const file = await uploadAsync(req, res);
  console.log(file);
  await test.request().query(`update Slides set ImageSlide = '${file.path}'
  where IDSlide = '${req.body.IDSlide}'`).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
});

app.post('/selectEditProduct', async function (req, res, next) {
  let IDProduct = req.body.id;
  console.log(req.body);
  const test = await pool1Connect;
  var result = await test.request().query(`select * from Product 
  where IDProduct = '${IDProduct}'`);
  const { recordset: users } = result
  return res.status(200).send(users[0]);
})

app.post('/selectCurrentAccount', async function (req, res, next) {
  let Account = req.body.Account;
  console.log(req.body);
  const test = await pool1Connect;
  var result = await test.request().query(`select * from Customer 
  where Account = '${Account}'`);
  const { recordset: users } = result
  return res.status(200).send(users[0]);
})
//post - Customer Login

app.post("/register", async function (req, res, next) {
  var ID = req.body.customer.ID;
  var Name = req.body.customer.Name;
  var Account = req.body.customer.Account;
  var Password = req.body.customer.Password;
  var Phone = req.body.customer.Phone;
  var Decentralization = req.body.customer.Decentralization;

  var sql = `insert into Customer(ID,Account,Name,Password,Phone,Status,Decentralization) 
    values ('${ID}','${Account}',N'${Name}','${Password}','${Phone}','${true}','${Decentralization}')`
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  console.log(sql);
  sendEmail(req.body.customer.Account, req.body.customer.Name, "hello");
  const result = await test.request().query(`select * from Customer where ID ='${ID}'`);
  const { recordset: users } = result
  return res.status(200).send(users[0]);
})
// Account

//get - select * from Customer
app.get('/getdataaccount', async function (req, res, next) {
  const test = await pool1Connect;
  const result = await test.request().query('select * from Customer');
  const { recordset: users } = result
  return res.status(200).send(users);
});

//post - Customer Login
app.post('/signinAdmin', async function (req, res, next) {
  var user_name = req.body.email.toString();
  var pass = req.body.password.toString();
  const test = await pool1Connect;
  const result = await test.request().query('select * from Customer');
  if ((result.recordset.filter(value => (value.Decentralization === "admin" || value.Decentralization === "staff")).find((ac) =>
    (ac.Password.trim() === pass && ac.Account === user_name && ac.Status === true)))) {
    res.status(200).send(true);
  }
  else res.status(200).send(false);
})
app.post('/signin', async function (req, res, next) {
  var user_name = req.body.email.toString();
  var pass = req.body.password.toString();
  const test = await pool1Connect;
  const result = await test.request().query('select * from Customer');
  if ((result.recordset.find((ac) =>
    (ac.Password.trim() === pass && ac.Account === user_name && ac.Status === true)))) {
    res.status(200).send(true);
  }
  else res.status(200).send(false);
})
//ProductCategory
//insert
app.post('/addProductCategory', async function (req, res, next) {
  var id = req.body.productCategory.IDProductCategory;
  var tenloaisp = req.body.productCategory.Name;
  var loaispcha = req.body.productCategory.ParentID;
  var trangthai = req.body.productCategory.Status;
  const test = await pool1Connect;
  var sql;
  if (loaispcha === null) {
    sql = `insert into ProductCategory(IDProductCategory,Name,Status,Active) values ('${id}',N'${tenloaisp}','${trangthai}','${true}')`
  }
  else sql = `insert into ProductCategory(IDProductCategory,ParentID,Name,Status,Active) values ('${id}','${loaispcha}',N'${tenloaisp}','${trangthai}','${true}')`
  // const { recordset: users } = docdulieu
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const docdulieu = await test.request().query(`select *from ProductCategory where Active ='${true}'`);
  return res.status(200).send(docdulieu.recordset);
})
//update ProductCategory
app.post('/updateProductCategory', async function (req, res, next) {
  var parentID = req.body.productCategory.ParentID;
  var txbProductCategoryName = req.body.productCategory.Name;
  var cbbStatus = req.body.productCategory.Status;
  let IDProductCategory = req.body.productCategory.IDProductCategory
  const test = await pool1Connect;
  var sql;
  sql = `update ProductCategory set ParentID = '${parentID}' , Name = N'${txbProductCategoryName}' ,Status = '${cbbStatus}' 
  where  IDProductCategory = '${IDProductCategory}'`
  // const { recordset: users } = docdulieu
  console.log(sql);
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const docdulieu = await test.request().query(`select *from ProductCategory where Active ='${true}'`);
  return res.status(200).send(docdulieu.recordset);
})
// post - delete ProductCategory
app.post('/deleteProductCategory', async function (req, res, next) {
  var id = req.body.IDProductCategory;
  const test = await pool1Connect;
  if (id) {
    var sql1 = `update ProductCategory set Active ='${false}'
    where IDProductCategory = '${id}'`
  }
  var sql2 = `update Product set Active ='${false}'
  where IDProductCategory = '${id}'`
  await test.request().query(sql1).then(async() => {
    await test.request().query(sql2).then(result => {
      console.dir(result);
    })
    .catch(err => {
      console.log(err);
    });
  })
  .catch(err => {
    console.log(err);
  });
  const docdulieu = await test.request().query(`select *from ProductCategory where Active ='${true}'`);
  return res.status(200).send(docdulieu.recordset);
})
// get - select * ProductCategory
app.get('/selectProductCategory', async function (req, res, next) {
  const test = await pool1Connect;
  const result = await test.request().query(`select *from ProductCategory where Active ='${true}'`);
  const { recordset: data } = result
  return res.status(200).send(data);
});

// get - select * Product
app.get('/selectProduct', async function (req, res, next) {
  const test = await pool1Connect;
  const result = await test.request().query(`select * from Product where Active ='${true}'`);
  const { recordset: data } = result
  return res.status(200).send(data);
});
//post - addProduct
app.post('/addProduct', async function (req, res, next) {
  var IDProduct = req.body.product.IDProduct;
  var Name = req.body.product.Name;
  var OriginalQuantity = req.body.product.OriginalQuantity;
  var Quantity = req.body.product.Quantity;
  var Description = req.body.product.Description;
  var Status = req.body.product.Status;
  var Price = req.body.product.Price;
  var OriginalPrice = req.body.product.OriginalPrice;
  var IDProductCategory = req.body.product.IDProductCategory;
  var CreateByID = req.body.product.CreateByID
  const test = await pool1Connect;
  var sql = `insert into Product(IDProduct,IDProductCategory,Name,Description,OriginalQuantity,
    Quantity,Status,Price,OriginalPrice,CreateDate,CreateByID,Active) 
  values ('${IDProduct}','${IDProductCategory}',N'${Name}',N'${Description}',
  '${OriginalQuantity}','${Quantity}','${Status}','${Price}','${OriginalPrice}',
  getdate(),'${CreateByID}','${true}')`
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  console.log(sql);
  const docdulieu = await test.request().query(`select * from Product where Active ='${true}'`);
  return res.status(200).send(docdulieu.recordset);
})
// post - delete Product
app.post('/deleteProduct', async function (req, res, next) {
  var id = req.body.IDProduct;
  const test = await pool1Connect;
  if (id) {
    var sql = `update Product set Active ='${false}'
    where IDProduct = '${id}'`
  }
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  // const docdulieu = await test.request().query('select *from Product');
  return res.status(200).send("sucess");
})
// update Product
app.post('/updateProduct', async function (req, res, next) {
  let maSanPham = req.body.product.IDProduct;
  let maLoaiSanPham = req.body.product.IDProductCategory;
  let ten = req.body.product.Name
  let gia = req.body.product.Price;
  let moTa = req.body.product.Description
  let soLuong = req.body.product.Quantity
  let soLuongBanDau = req.body.product.OriginalQuantity
  let trangThai = req.body.product.Status
  let giabandau = req.body.product.OriginalPrice
  let UpdateByID = req.body.product.UpdateByID
  const test = await pool1Connect;
  //IDProduct,IDProductCategory,Name,Description,OriginalQuantity,Quantity,Status,Price,OriginalPrice
  var sql;
  sql = `update Product set IDProductCategory = '${maLoaiSanPham}' , Name = N'${ten}',Price = '${gia}'
  ,Description = N'${moTa}',Quantity = '${soLuong}',OriginalQuantity = '${soLuongBanDau}',
  Status = '${trangThai}',OriginalPrice = '${giabandau}',
  UpdateByID='${UpdateByID}',UpdateDate = getDate()
  where  IDProduct = '${maSanPham}'`
  // const { recordset: users } = docdulieu
  console.log(sql);
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const docdulieu = await test.request().query('select *from Product');
  return res.status(200).send(docdulieu.recordset);
})

// get dataAddress
app.get('/selectAddress', async function (req, res, next) {
  const test = await pool1Connect;
  const result = await test.request().query('select * from Customer_Address');
  const { recordset: data } = result
  return res.status(200).send(data);
});
app.post('/updateCustomerAddress', async function (req, res, next) {
  let IDCustomerAddress = req.body.IDCustomerAddress;
  var IDCustomer = req.body.IDCustomer;
  const test = await pool1Connect;
  var sql1 = `update Customer_Address set isMajorAddress = 'false'
  where  IDCustomer = '${IDCustomer}'`
  var sql2 = `update Customer_Address set isMajorAddress = 'true'
  where  IDCustomerAddress = '${IDCustomerAddress}'`
  // const { recordset: users } = docdulieu
  await test.request().query(sql1).then(
    test.request().query(sql2)
  )
    .catch(err => {
      console.log(err);
    });
  await test.request().query(sql2).then(
    test.request().query(sql2)
  )
    .catch(err => {
      console.log(err);
    });
})

//insert order  
app.post('/addOrder', async function (req, res, next) {
  var IDOrder = req.body.order.IDOrder;
  var IDCustomer = req.body.order.IDCustomer;
  var NameShip = req.body.order.NameShip;
  var AddressShip = req.body.order.AddressShip;
  var PhoneShip = req.body.order.PhoneShip;
  var StatusOrder = req.body.order.StatusOrder;
  const test = await pool1Connect;
  var sql = `insert into Orders(IDOrder,IDCustomer,NameShip,AddressShip,PhoneShip,OrderDate,CreateDate,StatusOrder) 
  values ('${IDOrder}','${IDCustomer}',N'${NameShip}',N'${AddressShip}',
  '${PhoneShip}',getDate(),getDate(),N'${StatusOrder}')`
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  console.log(sql);
  const docdulieu = await test.request().query('select *from Orders');
  return res.status(200).send('success');
})

app.get('/selectOrder', async function (req, res, next) {
  const test = await pool1Connect;
  const result = await test.request().query('select * from Orders');
  const { recordset: data } = result
  return res.status(200).send(data);
});

app.post('/cancelOrder', async function (req, res, next) {
  let IDOrder = req.body.IDOrder;
  let StatusOrder = 'Đã hủy'
  const test = await pool1Connect;
  var sql;
  sql = `update Orders set StatusOrder = N'${StatusOrder}'
  where  IDOrder = '${IDOrder}'`
  console.log(sql);
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const result = await test.request().query(`select * from Orders where IDOrder = '${IDOrder}'`);
  const { recordset } = result
  return res.status(200).send(recordset[0]);
})

app.post('/refuseOrder', async function (req, res, next) {
  let IDOrder = req.body.IDOrder;
  let StatusOrder = 'Từ chối'
  const test = await pool1Connect;
  var sql;
  sql = `update Orders set StatusOrder = N'${StatusOrder}'
  where  IDOrder = '${IDOrder}'`
  console.log(sql);
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const result = await test.request().query(`select * from Orders where IDOrder = '${IDOrder}'`);
  const { recordset } = result
  return res.status(200).send(recordset[0]);
})

app.post('/addAddress', async function (req, res, next) {
  console.log(req.body.address);
  var IDCustomerAddress = req.body.address.IDCustomerAddress;
  var Address = req.body.address.Address;
  var IDCustomer = req.body.address.IDCustomer;
  const test = await pool1Connect;
  var sql = `insert into Customer_Address(IDCustomerAddress,IDCustomer,Address,isMajorAddress) 
  values ('${IDCustomerAddress}','${IDCustomer}',N'${Address}','${false}')`
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  console.log(sql);
  return res.status(200).send(req.body.address);
})

app.post('/deleteAddress', async function (req, res, next) {
  var IDCustomerAddress = req.body.IDCustomerAddress;
  const test = await pool1Connect;
  var sql = `delete from Customer_Address where IDCustomerAddress = '${IDCustomerAddress}'`
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  return res.status(200).send("sucess");
})

app.post('/addOrderDetail', async function (req, res, next) {
  var IDOrderDetail = req.body.orderDetail.IDOrderDetail;
  var ProductID = req.body.orderDetail.ProductID;
  var OrderID = req.body.orderDetail.OrderID;
  var PriceOrder = req.body.orderDetail.PriceOrder;
  var QuantityOrder = req.body.orderDetail.QuantityOrder;
  const test = await pool1Connect;
  var sql1 = `insert into OrderDetail(IDOrderDetail,ProductID,OrderID,PriceOrder,QuantityOrder) 
  values ('${IDOrderDetail}','${ProductID}','${OrderID}','${PriceOrder}',
  '${QuantityOrder}')`
  await test.request().query(sql1).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  var sql2 = `update Product set Quantity = Quantity - '${QuantityOrder}' where  IDProduct = '${ProductID}'`
  await test.request().query(sql2).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  console.log(sql2);
  sendEmail(req.body.customer.Account, req.body.customer.Name, "thanks");
  return res.status(200).send(req.body.orderDetail);
})

app.get('/selectOrderDetail', async function (req, res, next) {
  const test = await pool1Connect;
  const result = await test.request().query(`select * from OrderDetail a, Orders b , Product c
  where a.OrderID = b.IDOrder and a.ProductID = c.IDProduct`);
  const { recordset: data } = result
  return res.status(200).send(data);
});

///////////////////////////////////
app.post('/confirmOrder', async function (req, res, next) {
  let IDOrder = req.body.order.IDOrder;
  let StatusOrder = 'Đã xác nhận'
  const test = await pool1Connect;
  var sql;
  sql = `update Orders set StatusOrder = N'${StatusOrder}'
  where  IDOrder = '${IDOrder}'`
  console.log(sql);
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const result = await test.request().query(`select * from Orders where IDOrder = '${IDOrder}'`);
  const { recordset } = result
  return res.status(200).send(recordset[0]);
})

app.post('/shippingOrder', async function (req, res, next) {
  let IDOrder = req.body.order.IDOrder;
  let StatusOrder = 'Đang giao hàng'
  const test = await pool1Connect;
  var sql;
  sql = `update Orders set StatusOrder = N'${StatusOrder}'
  where  IDOrder = '${IDOrder}'`
  console.log(sql);
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const result = await test.request().query(`select * from Orders where IDOrder = '${IDOrder}'`);
  const { recordset } = result
  return res.status(200).send(recordset[0]);
})

app.post('/completeOrder', async function (req, res, next) {
  let IDOrder = req.body.order.IDOrder;
  let StatusOrder = 'Hoàn tất'
  const test = await pool1Connect;
  var sql;
  sql = `update Orders set StatusOrder = N'${StatusOrder}'
  where  IDOrder = '${IDOrder}'`
  console.log(sql);
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const result = await test.request().query(`select * from Orders where IDOrder = '${IDOrder}'`);
  const { recordset } = result
  return res.status(200).send(recordset[0]);
})

app.post('/getCustomerEdit', async function (req, res, next) {
  let IDCustomer = req.body.IDCustomer;
  const test = await pool1Connect;
  const result = await test.request().query(`select * from Customer where ID = '${IDCustomer}'`);
  const { recordset } = result
  return res.status(200).send(recordset[0]);
})
app.post('/banAccount', async function (req, res, next) {
  console.log(req.body);
  let ID = req.body.ID;
  const test = await pool1Connect;
  var sql;
  sql = `update Customer set Status = '${false}'
  where  ID = '${ID}'`
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const result = await test.request().query(`select * from Customer where ID = '${ID}'`);
  const { recordset } = result
  return res.status(200).send(recordset[0]);
})

app.post('/unBanAccount', async function (req, res, next) {
  let ID = req.body.ID;
  const test = await pool1Connect;
  var sql;
  sql = `update Customer set Status = '${true}'
  where  ID = '${ID}'`
  console.log(sql);
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const result = await test.request().query(`select * from Customer where ID = '${ID}'`);
  const { recordset } = result
  return res.status(200).send(recordset[0]);
})


app.post('/updateCustomer', async function (req, res, next) {
  console.log(req.body);
  let ID = req.body.customer.ID;
  let Account = req.body.customer.Account;
  let Name = req.body.customer.Name;
  let Phone = req.body.customer.Phone;
  let Password = req.body.customer.Password;
  const test = await pool1Connect;
  var sql;
  if (Password) {
    sql = `update Customer set Account = N'${Account}',Name = N'${Name}',Phone ='${Phone}',Password = N'${Password}'
    where  ID = '${ID}'`
  } else {
    sql = `update Customer set Account = N'${Account}',Name = N'${Name}',Phone ='${Phone}'
    where  ID = '${ID}'`
  }
  console.log(sql);
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  const result = await test.request().query(`select * from Customer where ID = '${ID}'`);
  const { recordset } = result
  return res.status(200).send(recordset[0]);
})

app.get('/selectPriceHistory', async function (req, res, next) {
  const test = await pool1Connect;
  const result = await test.request().query(`select * from PriceHistory a,Product b
  where a.ProductID = b.IDProduct and a.isDelete = '${false}'`);
  const { recordset: data } = result
  return res.status(200).send(data);

});

app.post('/addPriceHistory', async function (req, res, next) {
  var IDPriceHistory = req.body.priceHistory.IDPriceHistory;
  var ProductID = req.body.priceHistory.ProductID;
  var UpdatePrice = req.body.priceHistory.UpdatePrice;
  var UpdateByIDPH = req.body.priceHistory.UpdateByID;
  const test = await pool1Connect;
  var sql = `insert into PriceHistory(IDPriceHistory,ProductID,UpdatePrice,UpdataDate,isDelete,UpdateByID) 
  values ('${IDPriceHistory}','${ProductID}','${UpdatePrice}',getdate(),'${false}','${UpdateByIDPH}')`
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  console.log(sql);
  const result = await test.request().query(`select * from PriceHistory where IDPriceHistory = '${IDPriceHistory}'`);
  const { recordset: data } = result
  return res.status(200).send(data[0]);
})
app.post('/deletePriceHistory', async function (req, res, next) {
  var IDPriceHistory = req.body.IDPriceHistory;
  const test = await pool1Connect;
  var sql = `update PriceHistory set isDelete = '${true}'
  where IDPriceHistory = '${IDPriceHistory}'`
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  return res.status(200).send(req.body.IDPriceHistory);
})

app.post("/addSlide", async function (req, res, next) {
  var IDSlide = req.body.slide.IDSlide;
  var NameSlide = req.body.slide.NameSlide;
  var URLSlide = req.body.slide.URLSlide;
  var Status = req.body.slide.Status;
  var sql = `insert into Slides(IDSlide,NameSlide,URLSlide,Status) 
    values ('${IDSlide}','${NameSlide}','${URLSlide}','${Status}')`
  await test.request().query(sql).then(result => {
    console.dir(result);
  }).catch(err => {
    console.log(err);
  });
  console.log(sql);
  const result = await test.request().query(`select * from Slides where IDSlide ='${IDSlide}'`);
  const { recordset: slide } = result
  return res.status(200).send(slide[0]);
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
}),
  module.exports = router;
