var express = require("express");
var router = express.Router();
import { Request, Response, NextFunction } from "express";
import {
  getAllToDos,
  addToDo,
  getSingleToDo,
  updateToDo,
  removeToDo,
} from "../controller/toDoController";

interface optionsInterface {
  weekday?: "long" | "short" | "narrow";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
}

let items: string[] = [
  "do robin wieruch React",
  "be the best in node",
  "become a king ",
];

/* GET home page. */
router.get("/", async function (req: Request, res: Response) {
  let today = new Date();
  let options: optionsInterface = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  let something = await getAllToDos(req, res);
  console.log(something);

  //returns the date format like Monday, September 13
  let now = today.toLocaleDateString("en-US", options);

  res.render("list", { day: now, listitems: something });
});

//Post Request
router.post("/", (req: Request, res: Response) => {
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
router.post("/todos", addToDo);

/* GET todos. */
router.get("/todos", getAllToDos);

/* GET todo. */
router.get("/todos/:id", getSingleToDo);

/* UPDATE todo. */
router.put("/todos/:id", updateToDo);

/* DELETE todo. */
router.post("/todos/:id", removeToDo);

module.exports = router;
