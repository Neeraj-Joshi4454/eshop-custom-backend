import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    first_name : String,
    last_name : String,
    email : {type : String, unique: true},
    password : {type : String, required: true},
    role : {type : String, enum: ["admin", "user"], default : "user"}
}, {
    timestamps : true
})

export default mongoose.models.User || mongoose.model("User", userSchema);