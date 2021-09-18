import todos from "../models/todoModel";
import { Request, Response, NextFunction } from "express";

async function addToDo(req: Request, res: Response) {
  try {
    let { todo } = req.body;
    // console.log(todo);
    let newTodo = new todos({ todo });
    console.log(newTodo);
    
      res.status(200).json('OK')
    
   let check = await newTodo.save();
   if(check){
    res.status(200).redirect("/");
   }else{
    res.status(400).send('gh')
   }
    

  } catch(err) {
    res.status(420).send('kl')
  }
}

async function getAllToDos() {
  let allItems = await todos.find({});
  return allItems;
  //   res.status(200).json({
  //     status: "okay",
  //     allItems,
  //   });
}

async function getSingleToDo(req: Request, res: Response) {
  try {
    let SingleItem = await todos.findById({ _id: req.params.id });
    if (SingleItem) {
      res.status(200).json({
        status: "okay",
        SingleItem,
      });
    } else {
      res.status(400).json({
        error: "User not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
}
async function updateToDo(req: Request, res: Response) {
  try {
    let singleItem = await todos.findById({ _id: req.params.id });
    if (singleItem) {
      singleItem.todo = req.body.todo;
      await singleItem.save();
      res.status(200).redirect("/");
      // json({
      //   singleItem,
      // });
    } else {
      res.status(400).json({
        error: "toDo not found",
      });
    }
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
}
async function removeToDo(req: Request, res: Response) {
  try {
    let singleItem = await todos.findById({ _id: req.params.id });
    if (singleItem) {
      await singleItem.remove();
      // console.log("mad");
      res.status(200).redirect("/");
      // json({
      //   singleItem,
      // });
    } else {
      throw Error("todo not found");
    }
  } catch (err) {
    res.status(400).json({
      error: err,
    });
  }
}

export { getAllToDos, addToDo, getSingleToDo, updateToDo, removeToDo };
