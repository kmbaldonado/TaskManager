import { useEffect, useState } from "react";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import Archive from "./Archive";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    deadline: "",
  });

  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks/");
      const sortedTasks = res.data
        .filter((t) => !t.completed)
        .sort((a, b) => {
          if (!a.deadline) return -1;
          if (!b.deadline) return 1;
          return new Date(a.deadline) - new Date(b.deadline);
        });
      setTasks(sortedTasks);
    } catch (err) {
      alert("Failed to fetch tasks.");
    }
  };

  const handleArchive = () => {
    navigate("/archive");
  };

  const handleCreateTask = async () => {
    if (!newTask.title) return alert("Title is required");
    await API.post("/tasks/", { ...newTask, completed: false });
    setNewTask({ title: "", description: "", deadline: "" });
    fetchTasks();
  };

  const handleUpdateTask = async (id, updatedFields) => {
    await API.put(`/tasks/${id}`, updatedFields);
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-violet-200 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-xl bg-dotted p-8 rounded-lg shadow-lg">
        {/* Stickers */}
        <img
          src="/exclamation-point.png"
          alt="Overlay"
          className="absolute top-0 left-2 -translate-x-1/2 w-[25%] h-auto pointer-events-none"
        />
        <img
          src="/stars.png"
          alt="Overlay"
          className="absolute -bottom-10 -right-15 w-[30%] h-auto pointer-events-none"
        />

        {/* Header */}
        <h2 className="text-3xl font-bold text-left mb-2 text-slate-800">TO-DO</h2>

        {/* New Task Form */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-6">
          <input
            className="border-b-2 border-black p-2 bg-gray-100 focus:outline-none"
            placeholder="Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
          />
          <input
            className="border-b-2 border-black p-2 bg-gray-100 focus:outline-none"
            placeholder="Description"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
          />
          <input
            type="date"
            className="border-b-2 border-black p-2 bg-gray-100 focus:outline-none"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
          />
        </div>
        <div className="text-center mb-6">
          <button
            onClick={handleCreateTask}
            className="bg-emerald-400 text-white px-6 py-2 rounded hover:bg-emerald-500 transition font-semibold"
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="flex items-start justify-between bg-white p-3 rounded border border-none"
            >
              {/* Left side: Checkbox */}
              <input
                type="checkbox"
                checked={task.completed}
                onChange={(e) =>
                  handleUpdateTask(task.id, { ...task, completed: e.target.checked })
                }
                className="mt-1 mr-2"
              />

              {/* Center content */}
              <div className="flex-1 space-y-1">
                <input
                  type="text"
                  value={task.title}
                  onChange={(e) =>
                    handleUpdateTask(task.id, { ...task, title: e.target.value })
                  }
                  className="font-bold w-full bg-transparent border-b border-gray-300 focus:outline-none"
                />
                <textarea
                  value={task.description}
                  onChange={(e) =>
                    handleUpdateTask(task.id, { ...task, description: e.target.value })
                  }
                  className="w-full bg-transparent rounded border border-gray-300 p-1 text-sm focus:outline-none"
                />
                <input
                  type="date"
                  value={task.deadline || ""}
                  onChange={(e) =>
                    handleUpdateTask(task.id, { ...task, deadline: e.target.value })
                  }
                  className="text-sm"
                />
              </div>

              {/* Delete button */}
              <button
                onClick={() => handleDeleteTask(task.id)}
                className="ml-2 text-gray-500 font-bold hover:text-red-700 text-lg"
              >
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full max-w-[10%] content-start">
        <button onClick={handleArchive} className="bg-blue-300 rounded-r-lg text-white text-xl font-semibold w-[80%]">
          ARCHIVE
        </button>
        <div className="mt-3"></div>
        <button onClick={handleLogout} className="bg-blue-300 rounded-r-lg text-white text-xl font-semibold w-[80%]">
          LOGOUT
        </button>
      </div>
    </div>
  );
}
