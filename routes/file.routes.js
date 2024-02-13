const { Router } = require("express");
const {
  getFile,
  uploadFile,
  deleteFile,
  updateFile,
} = require("../controllers/file.controllers");

const router = Router();

/**
 * @URL : /file/:id
 * @Method : GET
 * @Status : PUBLIC
 * @Description : get file data
 */
router.get("/:id", getFile);

/**
 * @URL : /file/upload
 * @Method : POST
 * @Status : PUBLIC
 * @Description : upload file data
 */
router.post("/upload", uploadFile);

/**
 * @URL : /file/:id
 * @Method : DELETE
 * @Status : PUBLIC
 * @Description : delete file data
 */
router.delete("/:id", deleteFile);

/**
 * @URL : /file/:id
 * @Method : PATCH
 * @Status : PUBLIC
 * @Description : update file data
 */
router.patch("/:id", updateFile);

module.exports = router;
