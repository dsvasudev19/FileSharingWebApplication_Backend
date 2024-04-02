const router = require('express').Router();
const fileController=require("./../controllers/fileController");

router.post('/', fileController.create);

router.get('/by/folderRef/:folderRef', fileController.getFilesByFolderRef);

router.get("/:id", fileController.getById);

router.get('/by/user/:userId', fileController.getFilesByUserId);

router.get('/ref/:ref', fileController.getByRef);

router.delete('/:ref', fileController.deleteByRef);

router.put('/:ref', fileController.updateByRef);

module.exports = router;
