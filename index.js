const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req, res)=>{
    fs.readdir('./files', (err, files)=>{
        res.render("index", {files: files});
        // console.log("File read and rendered");
    });
});
app.get("/file/:filename", (req, res)=>{
    fs.readFile(`./files/${req.params.filename}`,"utf-8", (err, filedata)=>{
        res.render('show', {filename: req.params.filename, filedata: filedata});
    });
});
app.post("/create", (req, res)=>{
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, (err)=>{
        res.redirect("/");
    });
});

app.listen(2000, ()=>{
    console.log("Server is running on port 2000");
}); 