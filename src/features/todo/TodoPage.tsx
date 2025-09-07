import { useEffect } from "react"
import { createTodo, getAllTodos } from "../../infrastructure/Dependencies"


const TodoPage = () => {
  
  useEffect(() => {
    fetchAllTodos()
  }, [])

  const fetchAllTodos = async () => {
    const todos = await getAllTodos()
    console.log(todos)
  }

  const fetchCreateTodo = async () => {
    const todoCreation = await createTodo({
      title: "Todo 1",
      description: "Description 1",
      dueDate: new Date()
    })

    console.log('createTodo', todoCreation)
  }

  return (
    <div>
      Todo Page
      <button onClick={fetchAllTodos}>Get todos</button>
      <button onClick={fetchCreateTodo}>Create Todo</button>
    </div>
  )
}

export default TodoPage