import { useEffect, useState } from "react"
import axios from "axios"

function Dashboard() {
    const API = "http://localhost:5000/api/tasks"
    const [tasks, setTasks] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        description: ""
    })
    const [editId, setEditId] = useState(null)
    const token = localStorage.getItem("token")
    const getTasks = async () => {
        const response = await axios.get(
            API,
            {
                headers: {
                    authorization: token
                }
            }
        )
        setTasks(response.data)
    }
    useEffect(() => {
        getTasks()
    }, [])

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    const addTask = async (e) => {
        e.preventDefault()
        if (editId) {
            await axios.put(
                `${API}/${editId}`,
                formData,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
            setEditId(null)
        } else {
            await axios.post(
                API,
                formData,
                {
                    headers: {
                        authorization: token
                    }
                }
            )
        }
        setFormData({
            title: "",
            description: ""
        })
        getTasks()
    }


    const deleteTask = async (id) => {

        await axios.delete(
            `${API}/${id}`,
            {
                headers: {
                    authorization: token
                }
            }
        )

        getTasks()
    }

    const completeTask = async (id) => {

        await axios.put(
            `${API}/${id}`,
            {
                status: "completed"
            },
            {
                headers: {
                    authorization: token
                }
            }
        )

        getTasks()
    }

    const editTask = (task) => {

        setFormData({
            title: task.title,
            description: task.description
        })

        setEditId(task._id)
    }

    return (
        <div>

            <h1>Dashboard</h1>

            <form onSubmit={addTask}>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={formData.title}
                    onChange={handleChange}
                />

                <br /><br />

                <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                />

                <br /><br />

                <button>
                    {editId ? "Update Task" : "Add Task"}
                </button>

            </form>

            <hr />

            {
                tasks.map((task) => (
                    <div key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <p>{task.status}</p>
                            {
                         task.status !== "completed" && (
                       <button onClick={() => completeTask(task._id)} >
                         Complete  </button>
                               )}

                        <button
                            onClick={() => editTask(task)}
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => deleteTask(task._id)}
                        >
                            Delete
                        </button>
                        <hr />
                    </div>
                ))
            }
        </div>
    )
}

export default Dashboard