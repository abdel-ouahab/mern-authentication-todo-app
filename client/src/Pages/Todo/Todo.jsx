import { useState, useEffect } from "react";
import {useCookies} from 'react-cookie';
import {
  Container,
  Title,
  Form,
  Task,
  EditForm,
  SearchForm,
  Button,
} from "../../components/index";
import TaskApi from "../../api/todo-api";
import { useQuery } from '@tanstack/react-query';
import { FaSignOutAlt } from "react-icons/fa";
import { FaFaceGrinBeam } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const api = "http://127.0.0.1:3001/api/todo";
function Todo() {
    const [, removeCookie] = useCookies(['token']);
    const [todos, setTodos] = useState([]);

    const [filteredTasks, setFilteredTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const userId = localStorage.getItem('userID');
    const firstName = localStorage.getItem('firstname');


    const { data, isLoading, refetch } = useQuery({
      queryKey: ['tasks', userId], // Include userId in queryKey to refetch when it changes
      queryFn: async () => {
          const res = await fetch(`${api}?userID=${userId}`);
          const json = await res.json();
          setTodos(json.data);
          return json.data;
      },
  });
  
    
    const handleAddTask = async (description, userID) => {
      const data = { 
        description: description,
        userID: userID
       };
      await TaskApi.addTask(data);
      refetch();
    };

    const handleCompletedTask = async (id) => {
      await TaskApi.toggleTaskCompletion(id);
      refetch();
    }

    const handleDeleteTask = async (id) => {
      await TaskApi.deleteTask(id);
      refetch();
    }

    const handleUpdateTask = async (data, id) => {
      try {
        await TaskApi.updateTask(id, { description: data });
        refetch();
      } catch (error) {
        console.error('Error updating task:', error);
      }
    };
    

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])
    
    const handleChange = (e) => {
      setInputValue(e.target.value);
    };
  
    useEffect(() => {
      setFilteredTasks(todos);
    }, [todos]);
  
    useEffect(() => {
      const filter = todos.filter((task) =>
        task.description.toLowerCase().includes(inputValue)
      );
      setFilteredTasks(filter);
    }, [inputValue]);
  
    /*const addTask = (todo) => {
      setTodos([
        ...todos,
        { id: uuidv4(), description: todo, completed: false, isEditing: false },
      ]);
      console.log(todos);
    };*/
  
    /*const completedTask = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      );
    };*/
  
    /*const deleteTask = (id) => {
      setTodos(todos.filter((todo) => todo.id !== id));
    };*/
  
    const editForm = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    };
  
    /*const editTask = (task, id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id
            ? { ...todo, description: task, isEditing: !todo.isEditing }
            : todo
        )
      );
    };*/

    const logout = () => {
      removeCookie("access_token","")
      window.localStorage.removeItem("userID")
      window.localStorage.removeItem("loggedIn")
      window.location.reload(false)
    };

    return (
      <>
        <Container>
          <div className="flex justify-end">
            <Button  variant="secondary" icon={<FaSignOutAlt />} onClick={() => logout()} />
          </div>
          <Title>
            {`Hi ${firstName}`}
            <FaFaceGrinBeam className="ml-3 text-yellow-400" />
          </Title>
          
          <Title>Get Things Done!</Title>

          
          <Form addTask={handleAddTask} />
    
          <SearchForm handleChange={handleChange} />
          <div className="flex  justify-between text-gray-300 text-x mb-1">
            <p>
              {`You have ${data?.length || 0} tasks`}
            </p> 
            <p>
              {`completed tasks : ${data?.filter(task => task.completed).length || 0}`}
            </p>
          </div>
          

          {/* Check if data is available and still loading */}
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            filteredTasks.map((task, index) =>
              task.isEditing ? (
                <EditForm
                  key={task.id}
                  id={task.id}
                  description={task.description}
                  editTask={handleUpdateTask}
                />
              ) : (
                <Task
                  key={task.id}
                  id={task.id}
                  description={`${index + 1}. ${task.description}`}
                  completed={task.completed}
                  completedTask={handleCompletedTask}
                  deleteTask={handleDeleteTask}
                  editTask={editForm}
                />
              )
            )
          )}
        </Container>
      </>
    );
    
}

export default Todo
