const express = require("express");
const db = require("./config/db");
const cors = require("cors");
const multer = require('multer');
const path = require("path")


const app = express();
const PORT = 8080;
app.use(cors());
app.use(express.json());

// Route to get all posts
app.get("/api/getproject", (req, res) => {
  db.query("SELECT * FROM project", (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route to get one post
app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM posts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send(result);
  });
});

// Route for creating the project

// Route to like a post
app.post("/api/updateproject/:sno", (req, res) => {
  const sno = req.params.sno;
  db.query(
    "UPDATE project SET pdesc = 'test' WHERE sno = ?",
    sno,
    (err, result) => {
      if (err) {
        console.log(err);
      }
      res.send(result);
    }
  );
  // res.json({ message: "Project Updated" });
});

// Route to delete a post

app.post("/api/deleteproject/:sno", (req, res) => {
  const sno = req.params.sno;

  db.query("DELETE FROM project WHERE sno= ?", sno, (err, result) => {
    if (err) {
      console.log(err);
    }
    console.log(result)
  });
  res.json({ message: "Project Deleted" });
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

// image upload server

// View Engine Setup
app.set("views",path.join(__dirname,"views"))
app.set("view engine","ejs")
    
// var upload = multer({ dest: "Upload_folder_name" })
// If you do not want to use diskStorage then uncomment it
    
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "../client/public/uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now()+".jpg")
    }
  })
       
// Define the maximum size for uploading
// picture i.e. 1 MB. it is optional
const maxSize = 1 * 1000 * 1000;
    
var upload = multer({ 
    storage: storage,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }
      
        cb("Error: File upload only supports the "
                + "following filetypes - " + filetypes);
      } 
  
// mypic is the name of file attribute
}).single("mypic");       
  
app.get("/",function(req,res){
    res.render("Signup");
})
    
app.post("/uploadProfilePicture",function (req, res, next) {
        
    // Error MiddleWare for multer file upload, so if any
    // error occurs, the image would not be uploaded!
    upload(req,res,function(err) {
  
        if(err) {
  
            // ERROR occurred (here it can be occurred due
            // to uploading image of size greater than
            // 1MB or uploading different file type)
            res.send(err)
        }
        else {
  
            // SUCCESS, image successfully uploaded
            res.send("Success, Image uploaded!")
        }
    })
})


// creating a project
app.post("/api/createproject", (req, res) => {
  const pdesc = req.body.pdesc;
  const title = req.body.title;
  const glink = req.body.glink;
  const llink = req.body.llink;
  const pimage = req.body.pimage;
  // upload(pimage,res,function(err) {
  
  //   if(err) {

  //       // ERROR occurred (here it can be occurred due
  //       // to uploading image of size greater than
  //       // 1MB or uploading different file type)
  //       res.send(err)
  //   }
  //   else {

  //       // SUCCESS, image successfully uploaded
  //       res.send("Success, Image uploaded!")
  //   }
  // });

  db.query(
    
    "INSERT INTO project (`title`, `pdesc`, `glink`, `llink`, `pimage`) VALUES (?,?,?,?,?)",
    [title, pdesc, glink, llink, pimage],
    (err, result) => {
      if (err) {
        console.log(err);
      }
      //    if(result){
      //     alert('Project Added Success')
      //    }
      console.log(result);
    }
  );
  res.json({message: "Project Created Successfully"});
});
