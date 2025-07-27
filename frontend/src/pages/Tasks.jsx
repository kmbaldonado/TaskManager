import { useEffect, useState } from "react";
import API from "../api";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get("/tasks/");
    setTasks(res.data);
  };

  const createTask = async () => {
    await API.post("/tasks/", { title, description: "..." });
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div>
      <input onChange={(e) => setTitle(e.target.value)} placeholder="New Task" />
      <button onClick={createTask}>Add</button>
      <ul>
        {tasks.map((t) => (
          <li key={t.id}>{t.title}</li>
        ))}
      </ul>
    </div>
  );
}
