import { useTodos } from '../../lib/useTodos'

const Todos = () => {
  const { todos, isLoading, isError } = useTodos()

  if (isLoading) return <div>loading...</div>
  if (isError) return <div>Error...</div>

  return (
    <div>
      <h1>Hello from {todos?.length} Todos</h1>

      <ul>
        {todos && todos.map(todo => (
          <li key={todo.id}>
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Todos

// The old ways:

// method 1: use native fetch 
/*
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
     fetch('https://jsonplaceholder.typicode.com/todos')
       .then(response => response.json())
       .then(json => setTodos(json))
  }, [])
*/

// method 2: use axios
/*
  const [todos, setTodos] = useState<Todo[]>([])
  useEffect(() => {
	  const fetchData = async () => {
	    const {data} = await axios.get<Todo[]>('https://jsonplaceholder.typicode.com/todos')
		  setTodos(data)
	  }
	  
	  fetchData()
	}, []) 
*/