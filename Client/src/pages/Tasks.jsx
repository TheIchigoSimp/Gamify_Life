import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask, toggleTaskCompletion } from "../api/taskApi";

export default function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // Fetch Tasks
    const loadTasks = async () => {
        try{
            setLoading(true);
            const res = await getTasks();
            setTasks(res.data.tasks);
        } catch (error) {
            setError("Could not fetch tasks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadTasks();
    }, []);

    // Add new tasks
    const handleCreate = async (e) => {
        e.preventDefault();
        if(!title) {
            return setError("Title is required.");
        }

        try {
            await createTask({ title, desc });
            setTitle("");
            setDesc("");
            loadTasks();
        } catch (error) {
            setError("Failed to create task.");
        }
    };

    // Update task (only title for now)
    const handleUpdate = async (task) => {
        const newTitle = prompt("Enter new title: ", task.title);
        if(!newTitle) {
            return;
        }

        try {
            await updateTask(task._id, { title: newTitle });
            loadTasks();
        } catch (error) {
            setError("Failed to update task.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteTask(id);
            loadTasks();
        } catch (error) {
            setError("Failed to delete task.");
        }
    };

    const toggleTask = async (id) => {
        try {
            await toggleTaskCompletion(id);
            loadTasks();
        } catch (error) {
            setError("Failed to toggle task completion.");
        }
    };

    return (
        <div style={{ width: "400px", margin: "40px auto" }}>
            <h2>My Tasks</h2>

            {error && <div style={{ color: "red" }}>{error}</div>}
            {loading && <p>Loading...</p>}

            {/* Create Task */}
            <form onSubmit={handleCreate} style={{ marginBottom: "20px" }}>
                <input
                    type="text"
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description (optional)"
                    value={desc}
                    onChange={(e) => setDesc(e.target.value)}
                />
                <button type="submit">Add Task</button>
            </form>

            {/* Task List */}
            <ul>
    {tasks.map((task) => (
        <li key={task._id} style={{ marginBottom: "10px" }}>
            <strong style={{
                textDecoration: task.completed ? "line-through" : "none",
                color: task.completed ? "green" : "black"
            }}>
                {task.title}
            </strong>

            <br />
            <small>{task.description}</small>

            <div style={{ marginTop: "5px" }}>
                <button onClick={() => toggleTask(task._id)}>
                    {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
                </button>

                <button onClick={() => handleUpdate(task)}>
                    Edit
                </button>

                <button onClick={() => handleDelete(task._id)}>
                    Delete
                </button>
            </div>
        </li>
    ))}
</ul>
        </div>
    );
}