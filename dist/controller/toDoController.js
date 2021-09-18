"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeToDo = exports.updateToDo = exports.getSingleToDo = exports.addToDo = exports.getAllToDos = void 0;
const todoModel_1 = __importDefault(require("../models/todoModel"));
async function addToDo(req, res) {
    try {
        let { todo } = req.body;
        // console.log(todo);
        let newTodo = new todoModel_1.default({ todo });
        console.log(newTodo);
        res.status(200).json('OK');
        let check = await newTodo.save();
        if (check) {
            res.status(200).redirect("/");
        }
        else {
            res.status(400).send('gh');
        }
    }
    catch (err) {
        res.status(420).send('kl');
    }
}
exports.addToDo = addToDo;
async function getAllToDos() {
    let allItems = await todoModel_1.default.find({});
    return allItems;
    //   res.status(200).json({
    //     status: "okay",
    //     allItems,
    //   });
}
exports.getAllToDos = getAllToDos;
async function getSingleToDo(req, res) {
    try {
        let SingleItem = await todoModel_1.default.findById({ _id: req.params.id });
        if (SingleItem) {
            res.status(200).json({
                status: "okay",
                SingleItem,
            });
        }
        else {
            res.status(400).json({
                error: "User not found",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
}
exports.getSingleToDo = getSingleToDo;
async function updateToDo(req, res) {
    try {
        let singleItem = await todoModel_1.default.findById({ _id: req.params.id });
        if (singleItem) {
            singleItem.todo = req.body.todo;
            await singleItem.save();
            res.status(200).redirect("/");
            // json({
            //   singleItem,
            // });
        }
        else {
            res.status(400).json({
                error: "toDo not found",
            });
        }
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
}
exports.updateToDo = updateToDo;
async function removeToDo(req, res) {
    try {
        let singleItem = await todoModel_1.default.findById({ _id: req.params.id });
        if (singleItem) {
            await singleItem.remove();
            // console.log("mad");
            res.status(200).redirect("/");
            // json({
            //   singleItem,
            // });
        }
        else {
            throw Error("todo not found");
        }
    }
    catch (err) {
        res.status(400).json({
            error: err,
        });
    }
}
exports.removeToDo = removeToDo;
//# sourceMappingURL=toDoController.js.map