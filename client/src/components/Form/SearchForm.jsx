import { Button, Input } from "../index";
import { useState } from "react";
import { FaSearch, FaRegWindowClose } from "react-icons/fa";


const SearchForm = (props) => {
  const [search, setSearch] = useState(false);
  return (
    <>
      {search ? (
        <div className="flex flex-row mb-7">
          <Input 
            varaint="text"
            placeholder="Search"
            onChange={props.handleChange}
            classname={""}
          />
          <Button
            title="Close"
            variant="primary"
            icon={<FaRegWindowClose />}
            onClick={() => setSearch((prevSearch) => !prevSearch)}
          />
        </div>
      ) : (
        <div className="flex flex-row mb-3 justify-center">
          <Button
            title="Search"
            variant="primary"
            icon={<FaSearch />}
            classname={"rounded p-2"}
            onClick={() => setSearch((prevSearch) => !prevSearch)}
          />
        </div>
      )}
    </>
  );
};

export default SearchForm;