import { Check, X } from "lucide-react";
import React from "react";

const Task = ({ task, handleComplete, handleDelete }) => {
  //task -> {task: 'task2', completed:false, id: 44}
  return (
    <div className="w-full hover:bg-slate-300 p-2 rounded-xl flex justify-between items-center">
      <span className={task.completed && "line-through"}>{task.taskName}</span>
      <div className="flex gap-2 justify-center items-center">
        <span
          onClick={() => handleComplete(task.id)}
          className={
            "hover:bg-green-800 hover:text-white p-1 rounded-full transition-all duration-100 ease-in" +
            (task.completed && " bg-green-600 text-white")
          }
        >
          <Check className="w-5 h-5" />
        </span>
        <span
          className="hover:bg-red-700 hover:text-white p-1 rounded-full transition-all duration-100 ease-in"
          onClick={() => handleDelete(task.id)}
        >
          <X className="w-5 h-5" />
        </span>
      </div>
    </div>
  );
};

export default Task;
