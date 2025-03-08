//Category Schema
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: String
});
const Category = mongoose.model('Category', categorySchema);
export default Category;