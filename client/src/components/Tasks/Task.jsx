import { Button } from "../index";
import { FaEdit, FaTrash, FaCheck, FaWindowClose } from "react-icons/fa";


const Task = (props) => {
  return (
    <div className="flex p-2 pl-3 mb-5 bg-violet-500 rounded justify-between">
      <p
        onClick={() => props.completedTask(props.id)}
        className={`text-gray-100 sm:max-w-96 max-w-48  cursor-pointer truncate whitespace-normal break-words ${
          props.completed ? "line-through" : ""
        }`}
      >
        {props.description}
      </p>

      <div className="flex ">
        <Button  varaint="secondary" icon={props.completed ? (<FaWindowClose />) : (<FaCheck />)} onClick={() => props.completedTask(props.id)}/>
        <Button  varaint="secondary" icon={<FaEdit />}  onClick={() => props.editTask(props.id)}/>
        <Button  varaint="secondary" icon={<FaTrash />} onClick={() => props.deleteTask(props.id)}/>
      </div>
    </div>
  );
};

export default Task;
