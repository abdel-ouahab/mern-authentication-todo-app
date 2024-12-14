import { Button, Input } from "../index";
import { useState } from "react";

const Form = ({ addTask, register, errors }) => {
    const [description, setDescription] = useState("");
    const [userId, setUserId] = useState(localStorage.getItem('userID'));

    const handleSubmit = (e) => {
        e.preventDefault();
        addTask(description , userId);
        setDescription("");
    };
    return (
        <>
            <form className="flex flex-row mb-7" onSubmit={handleSubmit}>
                <Input 
                    placeholder="What is the task today?"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    register={{...register("description")}}
                    error={errors.description?.message}
                    classname={""}
                />
                <Button title= "Add Task" variant="primary" />
            </form>
        </>
    );
};

export default Form