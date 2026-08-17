import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";
function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await fetch("http://localhost:3000/tasks");

        const dataBase = await response.json();

        setTasks(dataBase);
      } catch (erro) {
        console.error("Erro ao buscar tarefas do servidor:", erro);
      }
    }

    getTasks();
  }, []);

  async function onAddTaskSubmit(title, description) {
    try {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });

      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (erro) {
      console.error("Erro ao criar tarefa:", erro);
    }
  }

  function onTaskClick(TaskId) {
    const newTasks = tasks.map((task) => {
      if (task.id === TaskId) {
        return { ...task, isComPleted: !task.isComPleted };
      }

      return task;
    });
    setTasks(newTasks);
  }

  function onDeleteTaskClick(TaskId) {
    const newTasks = tasks.filter((task) => task.id !== TaskId);
    setTasks(newTasks);
  }
  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onTaskClick={onTaskClick}
          onDeleteTaskClick={onDeleteTaskClick}
        />
      </div>
    </div>
  );
}

export default App;
