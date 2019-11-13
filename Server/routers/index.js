const express = require("express");
let Router = express.Router();
const { token, formatData } = require('../utils')

let userRouter = require("./user");
let regRouter = require("./reg");
let loginRouter = require("./login");

//跨域
Router.use((req, res, next) => {
	let currentOrigin = req.get("Origin");
	let allowOrigin = ["http://localhost:8080", "http://localhost:8081"];
	if (allowOrigin.includes(currentOrigin)) {
		res.set({
			"Access-Control-Allow-Origin": currentOrigin,
			"Access-Control-Allow-Methods": "GET,POST,PUT,PATCH,DELETE,OPTIONS",
			"Access-Control-Allow-HEADERS":
			"Content-Type,Content-Length, Authorization, Accept,X-Requested-With"
		});
	}
	if (req.method == "OPTIONS") {
		res.sendStatus(200);
	} else {
		next();
	}
});

//格式化参数
Router.use(express.json(), express.urlencoded({ extended: false }));

//路由地址
Router.use("/user", userRouter);
Router.use("/reg", regRouter);
Router.use("/login", loginRouter);
Router.get("/verify", (req, res) => {
	let Authorization = req.get("Authorization");
	if (token.verify(Authorization)) {
		res.send(formatData());
	} else {
		res.send(formatData({ status: 0 }));
	}
});
module.exports = Router;