import React, { useContext, useState } from "react";
import { Context } from "../Context/Provider";
import Form from "../components/Form";
import "../App.css";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaCheckDouble } from "react-icons/fa6";
import { TbUrgent } from "react-icons/tb";
import { VscError } from "react-icons/vsc";
import { IoMoonSharp } from "react-icons/io5";
import { FaSun } from "react-icons/fa6";


function Home() {
  const [isRegistering, setIsRegistering] = useState(false);
  const [editing, setIsEditing] = useState(false);
  const [isSeeingAll, setIsSeeingAll] = useState(false)
  const [id, setId] = useState();
  const { tasks, setTasks, theme, setTheme } = useContext(Context);
  const [actualTask, setActualTask] = useState(null)

  function remove(id) {
    setTasks([...tasks.filter((e) => e.id != id)]);
  }

  return (
    <div className={`w-[100%] min-h-[100vh] flex items-center flex-col gap-[50px] p-20 relative ${theme == 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      {theme == 'light' ? (
        <IoMoonSharp onClick={() => setTheme('dark')} color="black" className="absolute top-0 right-0 m-5 mr-10 text-xl"/>
      ): (
        <FaSun onClick={() => setTheme('light')} color="white" className="absolute top-0 right-0 m-5 mr-10 text-xl" />
      )}
      <button
        className={`bg-blue-950 text-white text-xl px-4 py-2 rounded-md ${(isSeeingAll || isRegistering || editing) && 'blur-sm'} hover:bg-blue-800`}
        onClick={() => setIsRegistering(!isRegistering)}
      >
        Register new task
      </button>
      {isRegistering && (
        <Form
          setIsEditing={setIsEditing}
          id={id}
          setIsRegistering={setIsRegistering}
          editing={editing}
        />
      )}
      
      {isSeeingAll && (
        <div className={`overlay-seeing-task text-xl px-5 py-1 gap-3 w-[30%] h-[30%] max-lg:w-[50%] max-md:w-[70%] max-md:h-[50%] ${theme == 'light' ? 'bg-white' : 'bg-gray-900 text-white'}`} >
            <button onClick={() => setIsSeeingAll(false)} className={`w-[100%] flex justify-end mr-5 mt-5 text-red-500 hover:text-red-700 ${theme == 'dark' && 'text-white'}`}>X</button>

            <div className="w-[100%] overflow-x-auto overflow-y-auto p-5 flex flex-col gap-5">
                <section className=" flex flex-col gap-1">
                    <p className="text-2xl text-blue-500">Task</p>
                    <p className="w-[90%] ml-2">{actualTask?.task}</p>
                </section>

                <section className=" flex flex-col gap-2">
                    <p className="text-2xl  text-blue-500">Status</p>
                    <p className="capitalize flex gap-2 items-center ml-2">{actualTask?.status} {actualTask?.status == "finished" ? (
                  <FaCheckDouble color="green" />
                ) : (
                  <VscError />
                )}</p>
                </section>

            </div>
        </div>
      )}

      <div className="text-xl gap-10 w-[100%]" id="tasks">
        {tasks?.map((e) => (
          <div
            className={`flex gap-10 bg-gray-300 border-2 w-[30%] max-md:w-[70%] max-sm:w-[80%] m-auto border-gray-400 justify-between overflow-x-hidden rounded-md px-4 py-3 ${(isSeeingAll || isRegistering || editing) && 'blur-sm'} ${theme == 'light' ? 'bg-gray-200  border-blue-950 hover:bg-gray-500 hover:text-white' : 'bg-gray-900 text-white border-blue-800 hover:bg-blue-800'}`}
            key={e?.id}
          >
            <p onClick={() => {
                setActualTask(e)
                setIsSeeingAll(!isSeeingAll)
            }} title={e?.task} className="capitalize cursor-pointer">
              {e?.task?.slice(0, 30)} {e?.task?.length > 50 && '....'} 
            </p>
            <div className="flex gap-4 items-center text-2xl">
              <p>
                {e?.status == "finished" ? (
                  <FaCheckDouble color="green" />
                ) : (
                  <TbUrgent className="text-orange-400" />
                )}
              </p>
              <button
                onClick={() => {
                  setIsEditing(true);
                  setIsRegistering(true);
                  setId(e?.id);
                }}
                className=""
              >
                <CiEdit color="blue" />
              </button>
              <button onClick={() => remove(e.id)} className="">
                <FaRegTrashAlt color="red" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
