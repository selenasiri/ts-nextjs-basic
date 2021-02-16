import useSWR from 'swr'
import axios from 'axios'

const todosUrl = 'https://jsonplaceholder.typicode.com/todos'

export interface TodoType {
  id: number;
  title: string;
  completed: boolean;
}

const fetchTodos = async (url: string) => {
  const {data} = await axios.get<TodoType[]>(url)
  return data
}

export const useTodos = () => {
  const { data, error } = useSWR(todosUrl, fetchTodos)
  
  return {
    todos: data,
    isLoading: !error && !data,
    isError: error
  }
}