const {MongoClient} = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URL);

module.exports = {
    //Complete collection
    db : null,
    
    //Connection specific to collection
    posts : null,
    comments : null,
    users : null,

    async connect(){ 
        //Connecting to database
        await client.connect();
        console.log("Connected to Mongo : ", process.env.MONGODB_URL);

        //Selecting database
        this.db = client.db(process.env.MONGODB_NAME);
        console.log("Selected database : ", process.env.MONGODB_NAME);

        //Initialize Collection
        this.posts = this.db.collection("posts");
        this.comments = this.db.collection("comments");
        this.users = this.db.collection("users");

       

    }

}