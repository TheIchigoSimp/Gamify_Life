import Task from "../models/Task.model.js";

async function createTask(req, res) {
    try{
        const { title, description } = req.body;

        if (!title) {
            return res.status(400).json({ message: "Title is required." });
        }


        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const newTask = new Task({
            title: title,
            description: description,
            userId: userId,
        });

        await newTask.save();
        return res.status(201).json({message: "Task created successfully.", newTask});
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }

};

async function getTasks(req, res) {
    try {
        const userId = req.user.id;

        const tasks = await Task.find({ userId });
        if(!tasks){
            return res.status(402).json({ message: "Tasks not found." });
        }

        return res.status(200).json({ message: "All Tasks: ", tasks });
    } catch (error) {
        return res.status(500).json({ message: "Server Error", error: error.message });
    }
};

async function updateTask(req, res) {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const task = await Task.findById(id);

    if(!task){
        return res.status(404).json({ message: "Task not found." });
    }

    if(task.userId.toString() != req.user.id){
        return res.status(403).json({ message: "Unauthorized" });
    }

    try {
        task.title = title || task.title;
        task.description = description || task.description;
        task.completed = completed || task.cCompleted;
    } catch (error) {
        return res.status(401).json({ message: "Server error.", error: error.message });
    }

    await task.save();
    return res.status(200).json({ message: "Task updated", task });
};

async function deleteTask(req, res) {
    const { id } = req.params;

    const task = await Task.findById(id);
    if(!task) {
        return res.status(404).json({ message: "Task not found" }); 
    }

    if (task.userId.toString() !== req.user.id) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    await Task.findByIdAndDelete(id);
    return res.status(200).json({ message: "Task deleted successfully" });

};

export { createTask, getTasks, updateTask, deleteTask };