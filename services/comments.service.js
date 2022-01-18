const db = require("../Shared/mongo");

const services = {
    async getComments(req, res){
        try {
            console.log("getComments method called");
            console.log(req.params);
            const data = await db.comments.find({postId : Number(req.params.id)}).toArray();
           // console.log(data);
            res.send(data);
            
        } catch (error) {
            console.log("Error while fetching comments : ",error);
            res.sendStatus(500);  
        }       
    },

    async addComment(req, res){
        try {
            console.log("addComment method is called");
            let result = await db.comments.find({},{id : 1, _id : 0})
                                        .sort({id : -1}).limit(1)
                                        .toArray();
            
            console.log(result[0].id);
            let newId = result[0].id + 1;
            console.log(req.body);

            const data = await db.comments.insertOne({id : newId, ...req.body});
            console.log(data);
            res.end("Your comment added successfully")

        } catch (error) {
            console.log("Error while adding comments : ",error);
            res.sendStatus(500);  
        }
    },

    async deleteComment(req, res){
        try {
            console.log("deleteComment method is called");
            console.log("req.params.id :",req.params.id);
            const {email} = await db.comments.findOne({id : Number(req.params.id)})
            console.log("email :", email);
            console.log("req.body.username :", req.body.username);

            if(email === req.body.username){
                await db.comments.deleteOne({id : Number(req.params.id)});
                res.send("Deleted comment successfully");
            }
            else{
                res.send("You are not authorized to delete this comment");
            }
            
        } catch (error) {
            console.log("Failed to delete comment : ", error);
            res.sendStatus(500); 
        }
    }
}

module.exports = services;