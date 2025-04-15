import React, { useContext, useEffect, useRef } from "react";
import { Context } from "../Context/Provider";
import "../styles/Form.css";

function Form({ editing, id, setIsRegistering, setIsEditing }) {
  const { tasks, setTasks, theme } = useContext(Context);
  const task = useRef("");
  const status = useRef("pendent");

  useEffect(() => {
    if (editing) {
      const data = tasks.find((e) => e.id === id);
      console.log(data, id)
      task.current.value = data.task;
    }
  }, [editing, id]);

  function edit(e) {
    e.preventDefault();
    const i = tasks.findIndex((e) => e.id == id);
    tasks[i] = { id: tasks[i].id, task: task.current.value, status: status.current.value };
    setTasks([...tasks]);
    setIsRegistering(false)
    setIsEditing(false)
  }

  function create(e) {
    e.preventDefault();
    setTasks([
      ...tasks,
      { id: crypto.randomUUID(), task: task.current.value, status: "pendent" },
    ]);
    setIsRegistering(false)
  }

  return (
    <div className={`overlay w-[30%] h-[30%] max-lg:w-[50%] max-md:w-[70%] max-md:h-[50%]  ${theme == 'light' ? 'bg-white text-blue-900' : 'bg-gray-900 text-white border-blue-900'}`}>
        <button className="w-[100%] flex justify-end text-2xl mr-20 mt-5 text-blue-800 hover:text-red-700" onClick={() => {
            setIsEditing(false)
            setIsRegistering(false)
        }}>x</button>
      <h2 className="align-start text-2xl">{editing ? "Edit": "Create"} Task</h2>
      <form className="task_form w-[100%] h-[100%]" onSubmit={editing ? edit : create}>
        <label className="w-[90%] m-auto flex items-center justify-center">
            <p className="w-[100%] text-xl">Task</p>
          <input className="w-[100%] px-4 py-3 rounded-md outline-none text-black" ref={task} type="text" />
        </label>

        {editing && (
          <label className="w-[90%] m-auto flex items-center justify-center">
            <p className="w-[100%] text-xl">Status</p>
            <select className="w-[100%] rounded-md  px-4 py-3 text-black" ref={status}>
                <option value="pendent">Pendent</option>
                <option value="finished">Finished</option>
            </select>
          </label>
        )}

        <button className="bg-blue-950 text-white text-xl w-[50%] m-auto px-4 py-2 rounded-md self-end hover:bg-blue-800" type="submit">{editing? "Edit": "Create"}</button>
      </form>
    </div>
  );
}

export default Form;
