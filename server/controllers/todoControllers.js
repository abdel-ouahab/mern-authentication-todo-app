const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbFilePath = path.join(__dirname, '..', 'db', 'db.json');

// Helper function to load tasks from the file
function loadData() {
    const data = JSON.parse(fs.readFileSync(dbFilePath, 'utf8'));
    return data.tasks || [];
}

// Helper function to save tasks to the file
function saveData(tasks) {
    const data = { tasks };
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
}

let tasks = loadData();

exports.getTasks = (req, res) => {
    const { userID } = req.query;
    const filteredTasks = userID ? tasks.filter(task => task.userID === userID) : tasks;

    res.status(200).json({
        status: 'success',
        results: filteredTasks.length,
        data: filteredTasks,
    });
};


exports.addTask = (req, res) => {
    try {
        //console.log("Request body received:", req.body);
        const { description, userID } = req.body;

        if (!description) {
            return res.status(400).json({
                status: 'error',
                message: 'Task description is required',
            });
        }

        const newTask = {
            id: uuidv4(),
            description,
            completed: false,
            isEditing: false,
            userID,
        };

        if (Array.isArray(tasks)) {
            tasks.push(newTask);
        } else {
            tasks = [newTask]; // If it's not an array, initialize tasks as an array
        }
        saveData(tasks);

        res.status(201).json({
            status: 'success',
            data: newTask,
        });
    } catch (error) {
        console.error('Error adding task:', error);
        res.status(500).json({
            status: 'error',
            message: 'Failed to add task',
        });
    }
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;

    const index = tasks.findIndex((task) => task.id === id);

    if (index !== -1) {
        tasks.splice(index, 1);
        saveData(tasks);

        res.status(200).json({
            status: 'success',
            message: 'Task deleted successfully',
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Task not found',
        });
    }
};

exports.editTask = (req, res) => {
    const { id } = req.params;
    const { description } = req.body;

    const task = tasks.find((task) => task.id === id);

    if (task) {
        task.description = description || task.description;
        saveData(tasks);

        res.status(200).json({
            status: 'success',
            message: 'Task updated successfully',
            data: task,
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Task not found',
        });
    }
};

exports.completedTask = (req, res) => {
    const { id } = req.params;

    const task = tasks.find((task) => task.id === id);

    if (task) {
        task.completed = !task.completed;
        saveData(tasks);

        res.status(200).json({
            status: 'success',
            message: 'Task completion status toggled successfully',
            data: task,
        });
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Task not found',
        });
    }
};
