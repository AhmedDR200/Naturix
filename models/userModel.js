import { mongoose } from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        trim: true,
        required: [true, "username required"]
    },
    email: {
        type: String,
        required: [true, "email required"],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "password required"],
        minlength: [6, "Too short password"]
    },
    firstname: {
        type: String,
        trim: true,
        required: [true, "firstname required"]
    },
    lastname: {
        type: String,
        trim: true,
        required: [true, "lastname required"]
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    profilePicture: String,
    coverPicture: String,
    about: String,
    location: String,
    worksAt: String,
    relationship: String,
    followers: [],
    following: [],
},{
    timestamps: true,
    versionKey: false
});


const User = mongoose.model("User", userSchema);

export default User;