const express = require("express");
const app = express();
const port = 8080;
const methodOverride = require('method-override');
const path = require("path");
app.use(methodOverride('_method'));
//unique id for each id & also assigns id to newly created posts
const { v4: uuidv4 } = require ('uuid');
 
app.use(express.urlencoded({extended:true}));// to parse client-side data
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
//dummy data
let postsarr =[
    {
        id:uuidv4 (),
        username:"Kritika",
    content:"Work hard party harder"
    },
    {id:uuidv4 (),
        username:"Madhav",
    content:"A single sheet of paper cant decide our future"
    },
    {id:uuidv4 (),
        username:"Bhavya",
        content:"It's important to mind your own buisness"
    },
    { id:uuidv4 (),
        username:"Alka",
        content:"Be a good human being"
    }
]
//display posts
app.get("/posts",(req,res)=>{
    res.render("index.ejs",{postsarr});
})
//add new post
app.get("/posts/new",(req,res)=>{
      res.render("new.ejs");
});
app.post("/posts1",(req,res)=>{
    //add post data into array for displaying
    let id = uuidv4 ();
    let { username,content} = req.body;
    postsarr.push({id ,username,content});
res.redirect("/posts");
});
//showroute - getting post acc to there id 
app.get("/posts/:id",(req,res)=>{
let {id}  = req.params;
// if the condition is true then element p is returned
let post = postsarr.find((p) => id === p.id);
if (post) {
  res.render("show.ejs" , {post});
} else {
  res.render("error.ejs" , {id});
}
});
//edit 
// show edit form (GET request)

// show edit form (GET request)
app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = postsarr.find((p) => id === p.id);

    if (post) {
        res.render("edit.ejs", { post });
    } else {
        res.render("error.ejs", { id });
    }
});

// update post (PATCH request)
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;

    let post = postsarr.find((p) => id === p.id);
    if (post) {
        post.content = newContent; // update content
        res.redirect("/posts");
    } else {
        res.render("error.ejs", { id });
    }
});
//delete
app.delete("/posts/:id",(req,res)=>{
let { id } = req.params;
    postsarr = postsarr.filter((p) => id !== p.id);
        res.send("delete success");
    res.redirect("/posts");
});
app.listen(port,()=>{
    console.log(`listening on port ${port}`);
})