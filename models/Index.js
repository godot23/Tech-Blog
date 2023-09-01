const User = require("./User");
const Post = require("./Posts");

User.hasMany(Post, {
    foriegnKey: "user_id",
    onDelete: "CASCADE"
});

module.exports = {User, Post};