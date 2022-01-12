
const db = require("../Shared/mongo");

const services = {
    async findPosts(req, res){
        try {
            console.log(req.user);
            console.log("GET method is called");
            //to get parameters from URl http://localhost:3001/posts?sort=asc&name=shubham
            console.log(req.query);
            //db.posts.find()
            const data = await db.posts.find().toArray();//Coverted seperate JSONs into array
            //console.log(data);
            res.send(data);
            
        } catch (error) {
            console.log("Error while reading : ", error);
            res.sendStatus(500);  
        }
    },

    async insertPost(req, res){
        try {
            console.log("POST method is called");
          
            let count = await db.posts.find().count();
            console.log(count);
            count++;
            console.log({id : count,...req.body});
            
            const data = await db.posts.insertOne({id : count, ...req.body});
            console.log(data);
           
            res.send({id : count ,...req.body});
        } catch (error) {
            console.log("Error while inserting : ", error);
            res.sendStatus(500);  
        }
    },

    async updatePost(req, res){
        try {
            console.log("PUT method is called");
            console.log("userId :",req.body.userId);
           // console.log("parameters :",req.params);
            const {userId} = await db.posts.findOne({},{id : Number(req.params.id)});
            console.log("userId :",userId);

            if(req.body.userId === userId){
                const data = await db.posts.findOneAndUpdate(
                    {id : Number(req.params.id)},
                    {$set:{...req.body}},
                    {returnNewDocument : true}
                );
                res.send("Post updated successfully");
            }else{
                res.send("You are not authorized to update this post");
            }
           
        } catch (error) {
            console.log("Error while updating : ", error);
            res.sendStatus(500);  
        }
    },

    async deletePost(req, res){
        try {
            console.log("DELETE method is called");
            console.log("userId :", req.body.userId);
            console.log("parameters :",req.params);
            const {userId} = await db.posts.findOne({},{id : Number(req.params.id)})
            console.log("postUserId :", userId);

            if(req.body.userId === userId){
                await db.posts.deleteOne({id : Number(req.params.id)});
                res.send("Deleted Record Successfully");
            }
            else{
                res.send("You are not authorized to delete this post");
            }
              
        } catch (error) {
            console.log("Error while deleting : ", error);
            res.sendStatus(500);  
        }
    }
}

module.exports = services;