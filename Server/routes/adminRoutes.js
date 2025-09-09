import express from 'express';
import { adminLogin, getAllBlogsAdmin, getDasboard, getAllComments, approveCommentById, deleteCommentById } from '../controllers/adminController.js';
import auth from '../middleware/auth.js';

const adminRouter = express.Router();

adminRouter.post('/login', adminLogin);
adminRouter.get('/comments', auth, getAllComments);
adminRouter.get('/blogs', auth, getAllBlogsAdmin);
adminRouter.get('/dashboard', auth, getDasboard);
adminRouter.post('/approve-comment', auth, approveCommentById);
adminRouter.post('/delete-comment', auth, deleteCommentById);

export default adminRouter;