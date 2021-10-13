// await mongoose.connect('mongodb+srv://cluster0.l29oi.mongodb.net/myFirstDatabase');
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 3000;
const admin = require("firebase-admin");
var serviceAccountKey = require("C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/younglingsadminproject-firebase-adminsdk-sifk3-a571085255.json");
var user = "";
var userVar = "";
var userVar2 = "";
var ref2;
var userName="";
var randPass="";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey),
  databaseURL: "https://younglingsadminproject-default-rtdb.firebaseio.com",
});

var db = admin.database();
const ref = db.ref("/");
ref.once("value", function (snapshot) {
  console.log(snapshot.val());
});

/*const MongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://Younglings_Amin:fR2s52iq84Sq1NNC@cluster0.l29oi.mongodb.net/Younglings_Admin_DB?retryWrites=true&w=majority";
const users ="";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  var dbo = db.db("Younglings_Admin_DB");
  dbo
    .collection("Younglings_Admin_Collection")
    .findOne({}, function (err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
    });
}); 

main().catch(err => console.log(err));

"" --username Younglings_Amin
function initializeConnection() {
  function addDisconnectHandler(connection) {
    connection.on("error", function (error) {
      if (error instanceof Error) {
        if (error.code === "PROTOCOL_CONNECTION_LOST") {
          console.error(error.stack);
          console.log("Lost connection. Reconnecting...");

          initializeConnection(connection.config);
        } else if (error.fatal) {
          throw error;
        }
      }
    });
  }

  var connection = mysql.createConnection({
    host: "127.0.0.1", //127.0.0.1
    user: "YoungMula",
    password: "102030_art",
    database: "younglings",
  });

  // Add handlers.
  addDisconnectHandler(connection);

  connection.connect();
  return connection;
}*/
// We are using our packages here
app.use(bodyParser.json()); // to support JSON-encoded bodies

app.use(
  bodyParser.urlencoded({
    // to support URL-encoded bodies
    extended: true,
  })
);
app.use(cors());

//You can use this to check if your server is working
app.get("/", (req, res) => {
  res.sendFile(
    "C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/client/login.html"
  );
});

app.post("/login", (req, res) => {
  const ref1 = db.ref(`/users/${req.body.uname}/`);
  userVar = req.body.uname;
  user = userVar.slice(0, userVar.length - 3);
  ref1.once("value", function (snapshot) {
    var newPost = snapshot.val();
    if (newPost.Password == req.body.pswd) {
      if (newPost.Admin == "Yes") {
        res.sendFile(
          "C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/client/admin_home.html"
        );
      } else {
        res.sendFile(
          "C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/client/home.html"
        );
      }
      const d = new Date();
      const weekday = [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ];
      if (d.getMinutes() < 10) {
        let sdate = `${String(d.getHours())}:0${String(d.getMinutes())} ${
          weekday[d.getDay() - 1]
        }`;
        const ref2 = db.ref(`/Log`);
        const usersRef = ref2.child(
          `${String(d.getDate())}|${String(d.getMonth() + 1)}|${String(
            d.getFullYear()
          )}`
        );
        usersRef.push().set({
          logIn: `${userVar} @ ${sdate}`,
        });
      } else {
        let sdate = `${String(d.getHours())}:${String(d.getMinutes())} ${
          weekday[d.getDay() - 1]
        }`;
        const ref2 = db.ref(`/Log`);
        const usersRef = ref2.child(
          `${String(d.getDate())}|${String(d.getMonth() + 1)}|${String(
            d.getFullYear()
          )}`
        );
        usersRef.push().set({
          logIn: `${userVar} @ ${sdate}`,
        });
      }
    } else {
      res.sendFile(
        "C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/client/errorpage.html"
      );
    }
  });
});

app.get("/login",(req, res) => {
  var db = admin.database();
  const ref = db.ref(`/users/${userVar}/`);
  ref.once("value", function (snapshot) {
    let userInfo = snapshot.val();
    res.json({
      usr: user,
      hr: userInfo.Hierarchy,
      pos: userInfo.Position,
      flr: userInfo.Floor,
      grp: userInfo.Team,
      email: userInfo.Email,
      no: userInfo.contactNo
    });
  });
});

app.get("/editProfile", function (req, res) {
  res.sendFile(
    "C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/client/editProfile.html"
  );
});

app.get("/edit", (req, res) => {
  res.sendFile(
    "C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/client/edit.html"
  );
});

app.post("/search", function (req, res) {
  var db = admin.database();
  ref2 = db.ref(`/users/${req.body.search}/`);
  console.log(req.body.search);
});



/*app.get("/search", (req, res) => {
  ref2.once("value", function (snapshot) {
    let userInfo = snapshot.val();
    res.json({
      usr: userVar2,
      pswd: userInfo.password,
      pos: userInfo.position,
      admin: userInfo.admin,
      flr: userInfo.Floor,
      grp: userInfo.Group,
      hr: userInfo.Heirarchy
    });
  });
});*/

app.post("/delete", function (req, res) {
  var eventContactsRef = db.ref(`/users/${req.body.search}`);
  eventContactsRef.remove(function (error) {
    if (error == null){
      console.log("User Deleted");
      res.sendFile("C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/client/deleted.html")
    } else {
      console.log(error)
      res.sendFile("C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/client/errorpage.html")
    }
  });
});

app.post("/addUser", function(req, res) {
  console.log(req.body.sName);
  var admin=req.body.sAdmins ? true : false;
  var adminVal
  if (admin==true){
    adminVal="Yes";
  }else{
    adminVal="No";
  }
  userName=`${req.body.sName}${req.body.sSname.slice(0,3)}`;
  randPass=`young${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
  const refer = db.ref(`/users/`);
  const response = refer.child(`${userName}`);
  response.set({
    contactNo:`${req.body.sPhone}`,
    Email:`${req.body.sEmail}`,
    Floor: `${req.body.floor}`,
    Team: `${req.body.team}`,
    Hierarchy: `${req.body.hierarchy}`,
    Position : `${req.body.pos}`,
    Admin: `${adminVal}`,
    Password: `${randPass}`
  });
  console.log("user added");
  res.sendFile(
    "C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/client/addUser.html"
  );
});

app.get("/addUser", function (req, res) {
  console.log()
  res.json({
    user:userName,
    pass:randPass
  });
});

//Route that handles signup logic

//Start your server on a specified port

app.get("/download", (req, res) => {
  const fs = require('fs');
  var json2xls = require('json2xls');
  const filename = 'DBadmin.xlsx';
  const refD = db.ref("/users");
  refD.once("value", function (snapshot) {
    var jvar=snapshot.val();
    var xls = json2xls(jvar);
    fs.writeFileSync(filename, xls, 'binary', (err) => {
      if (err) {
        console.log("writeFileSync :", err);
      }
      console.log( filename+" file is saved!");
    });
  });
  //downloads.download({url: "C:/Users/Arthu/OneDrive/Desktop/IT Younglings/IT Younglings Admin 0.2/server/DBadmin.xlsx"})
});


app.listen(port, () => {
  console.log(`Server is runing on port ${port}`);
});
