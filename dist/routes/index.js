"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var router = express.Router();
const toDoController_1 = require("../controller/toDoController");
let items = [
    "do robin wieruch React",
    "be the best in node",
    "become a king ",
];
/* GET home page. */
router.get("/", async function (req, res) {
    let today = new Date();
    let options = {
        weekday: "long",
        month: "long",
        day: "numeric",
    };
    let something = await (0, toDoController_1.getAllToDos)(req, res);
    console.log(something);
    //returns the date format like Monday, September 13
    let now = today.toLocaleDateString("en-US", options);
    res.render("list", { day: now, listitems: something });
});
//Post Request
router.post("/", (req, res) => {
    //save what was typed in the form
    let item = req.body.newItem;
    //push it to our items variable
    items.push(item);
    //redirect to home route
    res.redirect("/");
});
// router.get("/", (req: Request, res: Response) => {
//   res.render("list",);
// });
/* POST todos. */
router.post("/todos", toDoController_1.addToDo);
/* GET todos. */
router.get("/todos", toDoController_1.getAllToDos);
/* GET todo. */
router.get("/todos/:id", toDoController_1.getSingleToDo);
/* UPDATE todo. */
router.put("/todos/:id", toDoController_1.updateToDo);
/* DELETE todo. */
router.post("/todos/:id", toDoController_1.removeToDo);
module.exports = router;
//# sourceMappingURL=index.js.map