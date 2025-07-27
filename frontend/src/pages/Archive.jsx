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
    setArchivedTasks(res.data.filter((t) => t.completed));
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
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">✅ Archived Tasks</h1>
        <div className="space-x-4">
          <Link to="/tasks" className="text-blue-500 underline">Back to Tasks</Link>
          <button onClick={handleLogout} className="text-red-500 font-medium">Logout</button>
        </div>
      </div>

      <ul className="space-y-4">
        {archivedTasks.map((task) => (
          <li key={task.id} className="p-4 border rounded bg-green-100">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold">{task.title}</p>
                <p className="text-sm">{task.description}</p>
                {task.deadline && (
                  <p className="text-xs text-gray-500">Due: {task.deadline}</p>
                )}
              </div>
              <button
                onClick={() => restoreTask(task.id)}
                className="text-yellow-600 underline text-sm"
              >
                Restore
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
