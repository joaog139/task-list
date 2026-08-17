import { ChevronLeftIcon } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function getTasks() {
      try {
        const response = await fetch("http://localhost:3000/tasks");

        const dataBase = await response.json();

        const taskFound = dataBase.find((t) => t.id === Number(id));

        setTask(taskFound);
      } catch (erro) {
        console.error("Erro ao buscar tarefas do servidor:", erro);
      }
    }

    getTasks();
  }, []);

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] mx-auto space-y-4">
        <div className="flex justify-center relative mb-6 ">
          <button
            onClick={() => navigate(-1)}
            className="absolute left-0 top-0 bottom-0 text-slate-100"
          >
            <ChevronLeftIcon />
          </button>
          <h1 className="text-3xl text-slate-100 font-bold text-center">
            Detalhes da Tarefa
          </h1>
        </div>
        <div className="bg-slate-200 p-4 rounded-md ">
          <h2 className="text-xl font-bold text-slate-600">{task?.title}</h2>
          <p className="text-slate-600">{task?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default TaskPage;
