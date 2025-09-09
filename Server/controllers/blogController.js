import fs from 'fs';
import imagekit from '../configs/imagekit.js';
import Blog from '../models/Blog.js';
import Comment from '../models/comment.js';
import main from '../configs/gemini.js';

export const addBlog = async (req, res) => {
    try {
        const { title, subtitle, description, category , isPublished } = JSON.parse(req.body.blog);
        const imageFile = req.file;

        // check if all fields are provided
        if (!title || !subtitle || !description || !imageFile || !category ){
            console.log({ title, subtitle, description, category, isPublished });
            console.log('Image File:', imageFile);
            return res.json({ success: false, message: 'All fields are required' });
        }

        const fileBuffer = fs.readFileSync(imageFile.path);

        // upload image to imagekit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: '/blogs'
        });

        // optimize image through imagekit url transformation
        const optimizedImageUrl = imagekit.url({
            path: response.filePath,
            transformation: [
                { quality : 'auto' }, // auto compression
                { format : 'webp' }, // convert to moden format
                { width: '1280' } // resize to max width
            ]
        });

        const image = optimizedImageUrl;

        await Blog.create({ title, subtitle, description, category, image, isPublished });

        res.json({ success: true, message: 'Blog added successfully' });

    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true })
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;
        const blog = await Blog.findById(blogId);
        if (!blog) {
            return res.json({ success: false, message: 'Blog not found' });
        }
        res.json({ success: true, blog });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }   
}

export const togglePublish = async (req, res) => {
    try {
        const { id } = req.body;
        const blog = await Blog.findById(id);
         if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }
        blog.isPublished = !blog.isPublished;
        await blog.save();
        res.json({ success: true, message: `Blog ${blog.isPublished ? 'published' : 'unpublished'} successfully` });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const deleteBlogId = async (req, res) => {
    try {
        const { id } = req.body;
        await Blog.findByIdAndDelete(id);

        // delete all comments associated with the blog
        await Comment.deleteMany({ blog: id });
        
        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const addComment = async (req, res) => {
    try {
        const {blog, name, comment} = req.body;
        await Comment.create({ blog, name, comment });
        res.json({ success: true, message: 'Comment added for review' });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.body;
        const comments = await Comment.find({ blog: blogId, isApproved: true }).sort({ createdAt: -1 });
        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}

export const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;
        const content = await main(prompt + ' Generate a blog content for this topic in simple text format')
        res.json({ success: true, content });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}
