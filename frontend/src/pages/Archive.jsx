import { useEffect, useState } from "react";
import API from "../api";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Archive() {
  const [archivedTasks, setArchivedTasks] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const fetchArchivedTasks = async () => {
    const res = await API.get("/tasks/");
    const sorted = res.data
      .filter((t) => t.completed)
      .sort((a, b) => {
        if (!a.deadline) return -1;
        if (!b.deadline) return 1;
        return new Date(a.deadline) - new Date(b.deadline);
      });
    setArchivedTasks(sorted);
  };

  const restoreTask = async (id) => {
    await API.put(`/tasks/${id}`, { completed: false });
    fetchArchivedTasks();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    fetchArchivedTasks();
  }, []);

  return (
    <div className="min-h-screen bg-violet-200 flex items-center justify-center px-4 py-10">
      <div className="relative w-full max-w-xl bg-dotted p-8 rounded-lg shadow-lg">
        {/* Stickers */}
        <img
          src="/star.png"
          alt="Sticker"
          className="absolute -top-3 -left-13 w-[25%] pointer-events-none"
        />
        <img
          src="/stars.png"
          alt="Sticker"
          className="absolute -bottom-10 -right-15 w-[30%] pointer-events-none"
        />

        <h2 className="text-3xl font-bold text-left mb-4 text-slate-800">
          Archived Tasks
        </h2>

        <ul className="space-y-3">
          {archivedTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-start justify-between bg-gray-200 p-3 rounded border border-gray-300"
            >
              <div className="flex-1 space-y-1">
                <p className="font-bold">{task.title}</p>
                <p className="text-sm">{task.description}</p>
                {task.deadline && (
                  <p className="text-xs text-gray-600">Due: {task.deadline}</p>
                )}
              </div>
              <button
                onClick={() => restoreTask(task.id)}
                className="ml-4 text-yellow-600 font-semibold hover:underline text-sm"
              >
                Restore
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="w-full max-w-[10%] content-start">
        <button
          onClick={() => navigate("/tasks")}
          className="bg-blue-300 rounded-r-lg text-white text-xl font-semibold w-[80%]"
        >
          TASKS
        </button>
        <div className="mt-3"></div>
        <button
          onClick={handleLogout}
          className="bg-blue-300 rounded-r-lg text-white text-xl font-semibold w-[80%]"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
}
