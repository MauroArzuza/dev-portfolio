import React, { useState } from "react";

const AddCategory = ({ setCategory }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const searchGif = (e) => {
    e.preventDefault();
    if (value === "") {
      setError(true);
      return;
    }
    setError(false);
    setCategory(value);
    setValue("");
    // console.log("Enter Form");
  };

  return (
    <>
      <h2>Add Category</h2>
      <form onSubmit={searchGif}>
        <input
          type="text"
          placeholder="Search..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </form>
      {error ? <p className="error">El campo no puede estar vacío...</p> : ""}
    </>
  );
};

export default AddCategory;
