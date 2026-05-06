const Task = require("../models/Task")

const getTasks = async(req, res) => {
    const tasks = await Task.find({
        userId: req.user.id
    })
    res.json(tasks)
}

const addTask = async(req, res) => {
    const {title, description} = req.body
    const task = await Task.create({
        title,
        description,
        userId: req.user.id
    })
    res.json(task)
}

const updateTask = async(req, res) => {
    const updatedTask = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    )
    res.json(updatedTask)
}

const deleteTask = async(req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    res.json({
        message: "Task deleted"
    })
}

module.exports = {
    getTasks,
    addTask,
    updateTask,
    deleteTask
}