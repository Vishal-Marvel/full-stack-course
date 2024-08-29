import { useEffect, useState } from "react";
import Task from "./components/Task";

const App = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  // const [filteredTasks, setFiltertedTasks] = useState([]);
  const [search, setSearch] = useState("");
  // ['task1', 'task2', 'task3']
  const [pending, setPending] = useState(0);
  const [completed, setCompleted] = useState(0);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskObj = { task: task, completed: false, id: Date.now() };
    setTasks((prev) => [...prev, taskObj]);
    setTask("");
    setPending((prev) => prev + 1);
  };

  const handleComplete = (id) => {
    // id = 44
    // tasks = [{task: task, completed:false, id: 23},
    // {task: task1, completed:false, id: 34},
    // {task: task2, completed:false, id: 44}]
    const taskObj = tasks.find((task) => task.id === id);
    // taskObj -> {task: task2, completed:false, id: 44}
    if (taskObj.completed) {
      taskObj.completed = false;
      setCompleted((prev) => prev - 1);
      setPending((prev) => prev + 1);
    } else {
      taskObj.completed = true;
      setCompleted((prev) => prev + 1);
      setPending((prev) => prev - 1);
    }

    setTasks((prev) =>
      [...prev.filter((task) => task.id !== id), taskObj].sort(
        (a, b) => a.id - b.id
      )
    );
  };

  const handleDeleteAll = () => {
    setTasks([]);
    setCompleted(0);
    setPending(0);
  };

  const handleCompleteAll = () => {
    if (completed === tasks.length) {
      setCompleted(0);
      setPending(tasks.length);
      setTasks((prev) => prev.map((task) => ({ ...task, completed: false })));
    } else {
      setCompleted(tasks.length);
      setPending(0);
      setTasks((prev) => prev.map((task) => ({ ...task, completed: true })));
    }
  };

  const handleDelete = (id) => {
    const taskObj = tasks.find((task) => task.id === id);
    if (taskObj.completed) {
      setCompleted((prev) => prev - 1);
    } else {
      setPending((prev) => prev - 1);
    }
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  // useEffect(() => {
  //   setFiltertedTasks(tasks.filter(task=>task.task.includes(search)))
  // }, [search, tasks]);

  return (
    <div className="w-screen h-screen flex flex-col justify-start bg-slate-200 items-center pt-10">
      <span className="font-bold text-2xl">Task Manager</span>
      <div className="w-[70%] md:w-[60%] lg:w-1/2 bg-slate-400 min-h-52 rounded-xl flex flex-col items-center p-4">
        <input
          className="w-full p-2 bg-slate-200 rounded-lg outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search Task"
        />
        <div className="w-full flex justify-center flex-col md:flex-row items-center">
          <span className="m-2 text-sm">
            Pending: {pending} Completed: {completed}
          </span>
          {tasks.length > 0 && (
            <div className="flex w-full items-center justify-center gap-2">
              <button
                
                className=" text-sm bg-blue-500 hover:bg-blue-400 trasnition-all duration-100 ease-in p-2 rounded-lg "
                onClick={handleCompleteAll}
              >
                {completed === tasks.length ? "Uncomplete All" : "Complete All"}
              </button>
              <button
                
                className=" text-sm bg-red-500 hover:bg-red-400 trasnition-all duration-100 ease-in p-2 rounded-lg "
                onClick={handleDeleteAll}
              >
                Delete All
              </button>
            </div>
          )}
        </div>
        <div className="m-2 p-2 bg-slate-100 rounded-lg w-full h-full flex flex-col items-center">
          {/* condition ? true : false */}
          {tasks.length > 0 ? (
            //task -> {task: task/task1/task2, completed:false}
            tasks.map((task, index) => {
              if (task.task.includes(search)) {
                return (
                  <Task
                    key={index}
                    task={task}
                    handleComplete={handleComplete}
                    handleDelete={handleDelete}
                  />
                );
              }
            })
          ) : (
            <div>No Tasks</div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="w-full">
          <input
            className="w-full p-2 bg-slate-200 rounded-lg outline-none"
            value={task}
            onChange={handleChange}
            placeholder="Add Task"
          />
        </form>
      </div>
    </div>
  );
};

export default App;
