const router= require('express').Router();
const folderController = require('./../controllers/folderController');
const authMiddleware=require("./../middlewares/userAuthMiddleware")

router.post('/',[authMiddleware], folderController.createFolder);

router.get('/getFoldersByUserId', [authMiddleware], folderController.getFoldersByUserId);

router.get('/:ref', [authMiddleware], folderController.getFolderByRef);

router.delete('/:ref', [authMiddleware], folderController.deleteFolderByRef);

router.put('/:ref', [authMiddleware], folderController.updateFolderByRef);

module.exports = router;

// }
