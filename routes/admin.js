import express from 'express';
const router = express.Router();
import auth from '../middleware/auth-token.js';
import login from '../middleware/login.js';
import logout from '../middleware/logout.js';
import {
	post,
	getAll,
	getByID,
	deleteAdmin,
	put,
} from '../controllers/admin.js';
router.get('/token', auth, (req,res)=>{
	res.send({status:200,message:"Token is verified"})
});
router.get('/', auth, getAll);
router.get('/:id', auth, getByID);
router.post('/create', auth, post);
router.post('/login', login);
router.post('/logout', auth, logout);
router.patch('/:USERNAME', auth, put);
router.delete('/:USERNAME', auth, deleteAdmin);

export default router;
