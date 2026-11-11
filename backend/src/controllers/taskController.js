
let tasks = [
  {
    id: 1,
    title: "Learn Docker",
    description: "Understand Docker containers",
    status: "pending"
  },
  {
    id: 2,
    title: "Learn AWS",
    description: "Understand AWS cloud services",
    status: "pending"
  }
];

// GET all tasks
const getTasks = (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks
  });
};

// GET task by ID
const getTaskById = (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  res.status(200).json({
    success: true,
    data: task
  });
};

// CREATE task
const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Task title is required"
    });
  }

  const newTask = {
    id: tasks.length
      ? Math.max(...tasks.map(t => t.id)) + 1
      : 1,
    title: title.trim(),
    description: description || "",
    status: "pending"
  };

  tasks.push(newTask);

  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask
  });
};

// UPDATE task
const updateTask = (req, res) => {
  const task = tasks.find(t => t.id === Number(req.params.id));

  if (!task) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const { title, description, status } = req.body;

  if (title !== undefined) task.title = title;
  if (description !== undefined) task.description = description;
  if (status !== undefined) task.status = status;

  res.status(200).json({
    success: true,
    message: "Task updated successfully",
    data: task
  });
};

// DELETE task
const deleteTask = (req, res) => {
  const index = tasks.findIndex(
    t => t.id === Number(req.params.id)
  );

  if (index === -1) {
    return res.status(404).json({
      success: false,
      message: "Task not found"
    });
  }

  const deletedTask = tasks.splice(index, 1)[0];

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
    data: deletedTask
  });
};

module.exports = {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};
