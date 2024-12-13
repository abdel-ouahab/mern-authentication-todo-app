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
import { Input } from  '../../components/index'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import  { todoSchema } from '../../Schema/Schema'
import TaskApi from "../../api/todo-api";
import { OrbitProgress } from 'react-loading-indicators'
import { useQuery } from '@tanstack/react-query';
import { FaSignOutAlt } from "react-icons/fa";
import { FaFaceGrinBeam } from "react-icons/fa6";
import { v4 as uuidv4 } from "uuid";
uuidv4();

const api = import.meta.env.VITE_API_TODO;
function Todo() {
    const [, removeCookie] = useCookies(['token']);
    const [todos, setTodos] = useState([]);
    
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const userID = localStorage.getItem('userID');
    const firstName = localStorage.getItem('firstname');

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
      resolver: yupResolver(todoSchema),
      defaultValues: {
        description: '',
      },
    });

    const { data, isLoading, refetch } = useQuery({
      queryKey: ['tasks', userID], 
      queryFn: async () => {
          const res = await fetch(`${api}?userID=${userID}`);
          const json = await res.json();
          setTodos(json.data);
          return json.data;
      },
  });
  
    
    const handleAddTask = async (description, userID) => {
      try {
        const data = { description, userID };
        await TaskApi.addTask(data);
        refetch(); // Reload the tasks
        reset(); // Reset the input field
      } catch (error) {
        console.error('Error adding task:', error);
      }
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
  
    const editForm = (id) => {
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
        )
      );
    };

    const logout = () => {
      removeCookie("access_token","")
      window.localStorage.removeItem("userID")
      window.localStorage.removeItem("loggedIn")
      window.localStorage.removeItem("firstname")
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
          <form
              className="flex flex-row mb-7"
              onSubmit={handleSubmit((data) => handleAddTask(data.description, userID))}
            >
                <Input 
                    placeholder="What is the task today?"
                    name="description"
                    register={{...register("description")}}
                    error={errors.description?.message}
                    classname={""}
                    {...register("description")}
                />
                <Button title= "Add Task" variant="primary" />
            </form>
    
          <SearchForm handleChange={handleChange} />
          <div className="flex  justify-between text-gray-300 text-x mb-1">
            <p>
              {`You have ${data?.length || 0} tasks`}
            </p> 
            <p>
              {`completed tasks : ${data?.filter(task => task.completed).length || 0}`}
            </p>
          </div>
          
          {isLoading ? (
            <div className="flex justify-center mt-5">
              <OrbitProgress variant="track-disc" color="#8a31cc" size="large" text="wait" textColor="#c5c5c5" />
            </div>
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
