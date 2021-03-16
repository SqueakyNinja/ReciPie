import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";

const Search = ({ getQuery }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (query) => {
    setSearchTerm(query);
    getQuery(query);
  };

  return (
    <section className="search">
      <form noValidate autoComplete="off">
        <TextField
          id="standard-basic"
          label="Search Recipes"
          onKeyPress={(e) => onChange(e.target.value)}
        />
      </form>
    </section>
  );
};

export default Search;
