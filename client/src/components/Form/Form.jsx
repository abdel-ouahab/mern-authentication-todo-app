import { Button, Input } from "../index";
import { useState } from "react";

const Form = ({ addTask }) => {
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
                    classname={""}
                />
                <Button title= "Add Task" variant="primary" />
            </form>
        </>
    );
};

export default Form