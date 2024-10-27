import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv, UpdatedData, setUpdatedData }) => {
  const [Data, setData] = useState({
    title: "",
    desc: "",
    dueDate:"",
    label:"",
  });
  useEffect(() => {
    setData({ title: UpdatedData.title, desc: UpdatedData.desc, dueDate: UpdatedData.dueDate,label:UpdatedData.label  });
  }, [UpdatedData]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };
  const submitData = async () => {
    if (Data.title === "" || Data.desc === "" || Data.dueDate ==="" || Data.label ==="") {
      alert("All fields are required");
    } else {
      await axios.post("http://localhost:8080/api/v2/create-task", Data, {
        headers,
      });
      setData({ title: "", desc: "",dueDate:"",label:"" });
      setInputDiv("hidden");
    }
  };
  const UpdateTask = async () => {
    if (Data.title === "" || Data.desc === ""|| Data.dueDate ==="" || Data.label ==="") {
      alert("All fields are required");
    } else {
      await axios.put(
        `http://localhost:8080/api/v2/update-task/${UpdatedData.id}`,
        Data,
        {
          headers,
        }
      );
      setUpdatedData({
        id: "",
        title: "",
        desc: "",
        dueDate:"",
        label:"",
      });
      setData({ title: "", desc: "" ,dueDate:"",label:""});
      setInputDiv("hidden");
    }
  };
  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}
      ></div>
      <div
        className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full`}
      >
        <div className="w-2/6 bg-gray-900 p-4 rounded ">
          <div className="flex justify-end">
            <button
              className="text-2xl"
              onClick={() => {
                setInputDiv("hidden");
                setData({
                  title: "",
                  desc: "",
                });
                setUpdatedData({
                  id: "",
                  title: "",
                  desc: "",
                });
              }}
            >
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder="Description.."
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.desc}
            onChange={change}
          ></textarea>
          <input
            type="text"
            placeholder="DueDate"
            name="dueDate"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.dueData}
            onChange={change}
          />
          <input
            type="text"
            placeholder="Label"
            name="label"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.label}
            onChange={change}
          />
          {UpdatedData.id === "" ? (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={submitData}
            >
              Submit
            </button>
          ) : (
            <button
              className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold"
              onClick={UpdateTask}
            >
              Update
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default InputData;
