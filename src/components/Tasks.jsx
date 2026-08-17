import { ChevronRightIcon, DeleteIcon, TrashIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";
function Tasks(props) {
  const navigate = useNavigate();

  function onSeeDatailsClick(task) {
    const query = new URLSearchParams();
    query.set("id", task);
    navigate(`/task?${query.toString()}`);
  }

  return (
    <ul className="space-y-4 p-6 bg-slate-200 rounded-md shadow">
      {props.tasks.map((task) => (
        <li key={task.id} className="flex gap-2">
          <button
            onClick={() => props.onTaskClick(task.id)}
            className={`bg-slate-400 w-full text-white p-2 rounded-md text-left 
              ${task.isComPleted && "line-through"}`}
          >
            {task.title}
          </button>
          <Button
            onClick={() => {
              onSeeDatailsClick(task.id);
            }}
          >
            <ChevronRightIcon />
          </Button>
          <Button onClick={() => props.onDeleteTaskClick(task.id)}>
            <TrashIcon />
          </Button>
        </li>
      ))}
    </ul>
  );
}

export default Tasks;
