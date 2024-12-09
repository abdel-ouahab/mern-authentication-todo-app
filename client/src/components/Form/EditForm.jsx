import { Button, Input } from "../index";
import { useState } from "react";
const EditForm = (props) => {
  const [description, setDescription] = useState(props.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    props.editTask(description, props.id);
  };

  return (
    <>
      <form className="flex flex-row mb-7" onSubmit={handleSubmit}>
        <Input 
          varaint="text"
          placeholder="Update Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          classname={""}
        />
        <Button title= "Update Task" variant="primary" />
      </form>
    </>
  );
};

export default EditForm;
