const router=require("express").Router();
const auth=require("./../middlewares/userAuthMiddleware")
const fileShareController=require("./../controllers/fileSharingController")
const {shareStorage}=require("./../utils/multer")

router.post("/withUser", shareStorage.single("file"),[auth],fileShareController.shareFileWithFriend)

router.get("/shared/user",[auth],fileShareController.getAllFilesSharedWithYou);

module.exports=router;