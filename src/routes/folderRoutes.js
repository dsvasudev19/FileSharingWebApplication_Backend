const router= require('express').Router();
const folderController = require('./../controllers/folderController');

router.post('/', folderController.createFolder);

router.get('/getFoldersByUserId', folderController.getFoldersByUserId);

router.get('/:ref', folderController.getFolderByRef);

router.delete('/:ref', folderController.deleteFolderByRef);

router.put('/:ref', folderController.updateFolderByRef);

module.exports = router;

// }
