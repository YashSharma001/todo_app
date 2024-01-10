import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Context, server } from '../index';
import toast from 'react-hot-toast';
import TasksItem from './TasksItem';
import { Navigate } from 'react-router-dom';

const Home = () => {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([]);

  const { isAuthenticated } = useContext(Context)

  const submitHandler = async (e) => {
    e.preventDefault();  //after submit page refresh nhi hota 
    setLoading(true)
    try {
      const { data } = await axios.post(`${server}/task/create`, {
        title, description
      }, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      }
      )

      setTitle("")
      setDescription("")
      toast.success(data.message)
      setLoading(false)
    } catch (error) {
      toast.error(error.response.data.message)
      setLoading(false)
    }

  };


  const updateHandler = async (id) => {

    try {
      const { data } = await axios.put(`${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      )
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }


  const deleteHandler = async (id) => {

    try {
      const { data } = await axios.delete(`${server}/task/${id}`,
        {
          withCredentials: true,
        }
      )
      toast.success(data.message)
    } catch (error) {
      toast.error(error.response.data.message)
    }

  }

  useEffect(() => {

    axios.get(`${server}/task/getmytask`,
      {
        withCredentials: true
      }).then((res) => {
        setTasks(res.data.tasks)
      }).catch((error) => {
        toast.error(error.response.data.message)
      })
  }, [tasks]);

  if (!isAuthenticated) return <Navigate to={"/login"} />

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="mb-3">
          <label for="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" value={title} onChange={(e) => setTitle(e.target.value)} aria-describedby="emailHelp" required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
          <label for="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>

        <button disabled={loading} type="submit" className="btn btn-primary">Add Task</button>
      </form>

      {/* show all tasks */}
      <div className="row my-3">
        <sh2>Your Tasks!</sh2>
        <div className="container mx-2">
          {tasks.length === 0 && 'No notes to display'}
        </div>
        {tasks.map((i) => {
          return <TasksItem key={i._id} title={i.title} description={i.description} isCompleted={i.isCompleted} updateHandler={updateHandler} deleteHandler={deleteHandler} id={i._id} />
        })}
      </div>

    </div>
  )
}

export default Home
