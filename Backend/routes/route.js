const express=require("express");
const rout=express.Router();
const {Gettextpd}=require("../controllers/Gettextpd");
const { Editpdf } = require("../controllers/Editpdf");
const { Displaypdf } = require("../controllers/Displaypdf");
//const multer = require('multer');
//const path = require('path');
const upload = require("../controllers/Multer");





 

rout.get("/getpdftext",Gettextpd);
rout.get("/editpdftext",Editpdf);
rout.post("/displaypdf", upload.single('file'),Displaypdf);



module.exports=rout;

