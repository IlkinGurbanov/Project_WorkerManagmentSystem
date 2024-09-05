const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const port = 5000


const {Schema} = mongoose;

const usersSchema = new Schema({
    name:{type:String},
    surname:{type:String},
    email:{type:String},
    password:{type:String},
    role:{type:String},
    isEditorRequest:{type:Boolean}
},
{timestamps:true}
)

const workersSchema = new Schema({
    NameSurname:{type:String},
    Age:{type:String},
    Experince:{type:String},
    Salary:{type:String},
    Position:{type:String}
},
{timestamps:true}
)


const Users = mongoose.model("users",usersSchema)
const Workers = mongoose.model("workers",workersSchema)


const app = express()
app.use(cors())
app.use(bodyParser.json())

app.get("/",(req,res)=>{
    res.send(
        `<h1>Işçi idarəetmə sistemi api</h1>
        <br>
        Workers url : http://localhost:${port}/workers
        <br>Users url : http://localhost:${port}/workers`
        )
})
// ------------------------------

app.get("/users", async (req, res) => {
    try {
        const docs = await Users.find({});
        res.send(docs);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});
app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await Users.findById(id);
        if (doc) {
            res.send(doc);
        } else {
            res.status(404).json({ message: "not found" });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


app.delete("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await Users.findByIdAndDelete(id);
        if (deletedUser) {
            res.send("deleted");
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post("/users", async (req, res) => {
    const { name, surname, email, password, role , isEditorRequest } = req.body;
    const users = new Users({ name, surname, email, password, role ,isEditorRequest});
    try {
        await users.save();
        res.send("Saved!");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedDoc = await Users.findByIdAndUpdate(id, req.body,{new:true});
        if (updatedDoc) {
            res.status(200).json({ message: "Successfully Updated" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


// ...............................................

app.get("/workers", async (req, res) => {
    try {
        const docs = await Workers.find({});
        res.send(docs);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});
app.get("/workers/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const doc = await Workers.findById(id);
        if (doc) {
            res.send(doc);
        } else {
            res.status(404).json({ message: "not found" });
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
});


app.delete("/workers/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await Workers.findByIdAndDelete(id);
        if (deletedUser) {
            res.send("deleted");
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.post("/workers", async (req, res) => {
    const workers = new Workers({
        NameSurname:req.body.NameSurname,
        Age:req.body.Age,
        Experince:req.body.Experince,
        Salary:req.body.Salary,
        Position:req.body.Position
    });
    try {
        await workers.save();
        res.send("Saved!");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


app.put("/workers/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const updatedDoc = await Workers.findByIdAndUpdate(id, req.body, { new: true });
        if (updatedDoc) {
            res.status(200).json({ message: "Successfully Updated" });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// ------------------------
const username = process.env.usrnm;
const password = process.env.pass;
const url = "mongodb+srv://<username>:<password>@iscisistemi.8f8xlzm.mongodb.net/"
const Url = url.replace("<username>",username)
const con_url = Url.replace("<password>",password)


// mongoose.set('strictQuery', false)

async function connectToDatabase() {
    try {
        await mongoose.connect(con_url);
        console.log('MongoDB\'ye başarıyla bağlanıldı')
        app.listen(port,()=>{
            console.log("Server working...")
        })
    } catch (error) {
        console.error('Bağlantı hatası:', error)
    }
}

connectToDatabase();
