const { default: mongoose } = require("mongoose");

// Post Schema
const postSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    title: { type: String, required: true },
    content: { type: String, required: true },
    image_url: String,
    created_at: { type: Date, default: Date.now }
});
const Post=mongoose.model('Post',postSchema);
export default Post;