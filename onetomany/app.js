import express from 'express';
import sequelize from './db.js';
import User from './models/user.js';
import Post from './models/post.js';
import { Op } from 'sequelize';

const app=express();
app.use(express.json());

User.hasMany(Post,{foreignKey:"userId",onDelete:'CASCADE'});
Post.belongsTo(User,{foreignKey:"userId",onDelete:'CASCADE'});

sequelize.sync({force:false}).then(()=>{
    console.log("DB Synced");
    
})
app.post('/createuser',async(req,res)=>{                                    //adding user
    console.log(req.body);
    const {uname}= req.body;
    if(!uname)
        {
        res.status(400).send("Username is must");
    }
    try{
       const user = await User.create({ uname }); 
    res.status(201).json({ message: "User created", user });
    }catch(err)
    {
        res.send(err);
    }
});
app.post('/user/:id/post',async(req,res)=>{                                    //mapping posts with  users
    try{
   const user=await User.findByPk(req.params.id);
   if(!user){
    res.status(404).send("user not found")
   }
    const post=await Post.create({title:req.body.title,content:req.body.content,userId:req.params.id});
    res.status(201).send("Post added with user");
   
    }catch(err){
     res.status(500).send("error is there")
    }
});

app.get("/users",async(req,res)=>{                                             //get all users
    try{
        const users=await User.findAll({include:Post});
        res.json(users)
    }
    catch(err){
        res.status(500).send("Some error is there")
    }
        
});

app.get("/users/:id", async(req,res)=>{                                 //get user by their id
    try{
        const user=await User.findByPk(req.params.id,{include:Post});
        res.json(user);
    }catch(err){
        res.status(500).send("some error is there");
    }
});
app.put("/users/:id",async(req,res)=>{                                    //updating the user details
    try{
        const user=await User.findByPk(req.params.id);
        const {uname}=req.body;
        if(uname){
            user.uname=uname;
        }
        await user.save();
        res.json("user updated");
    }catch(err){
        res.send("Error is there")
    }
});
app.delete('/posts/:id',async(req,res)=>{                               //Deleting individual post by their id
    try{
        const post=await Post.findByPk(req.params.id);
        if(!post){
            res.status(404).send("post not found");
        }
        await post.destroy();
        res.send("Post Deleted");

    }catch(err){
        res.status(500).send("Some error is there");
    }
});
app.delete('/users/:id',async(req,res)=>{                               //delete user by their id
    try{
        const user=await User.findByPk(req.params.id,{include:Post});
        if(!user){
            res.status(404).send("user not found")
        }
        await user.destroy();
        res.send("User deleted successfully!!")
    }catch(err){
        res.send("Some error is there!!")
    }
});
app.put('/posts/:id',async(req,res)=>{                                //Updating the post by its id
    try{
        const post=await Post.findByPk(req.params.id);
        if(!post){
            res.status(404).send("Post not found");
        }
        const{title,content}=req.body;
        if(title){
            post.title=title;
        }
        if(content){
            post.content=content;
        }
        await post.save();
        res.send("Post updated");
    }
    catch(err){
        res.send("error is there!!")
    }
});

app.get('/posts/byusername/:name', async(req,res)=>{                  //get all posts by username
    try{
        const userName=req.params.name;
        const user=await User.findOne({
            where:{uname:userName},include:Post
        });
        if(!user){
            res.status(404).send("user not found");
        }res.json({
            posts:user.Posts
        });
    }catch(err){
        res.send("error is there")
    }
});

app.get("/post/bytitle/:title", async(req,res)=>{
    
      try{ 
         const searchTitle =req.params.title;
        const title=await Post.findAll({
            where: {
                title: {
                [Op.like]:`%${searchTitle}%`
            }
        }
        });
        if(!title){
            res.status(404).send("Title not found")          //OR
            }

        //     if (title.length === 0) {
        //     return res.status(404).send("No posts found with this title");
        // }
    
         res.json(title);
        }
         catch(err){
            res.status(500).send("error is there")         }
    
});



app.listen(3000,()=>{
    console.log("server started")
})
        