const express = require("express");
const memberInfoRouter = express.Router();
const memberController = require("../Controllers/Member.Controller");

memberInfoRouter.post("/member", memberController.memberProfile);
memberInfoRouter.get("/member", memberController.getMemberProfile);
// UserInfoRouter.post("/login", authController.loginUser);

module.exports = memberInfoRouter;
