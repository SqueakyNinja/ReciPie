import TextField from "@material-ui/core/TextField";

const Search = ({ setQuery, query }) => {
  return (
    <section className="search">
      <form noValidate autoComplete="off" onSubmit={(e) => e.preventDefault()}>
        <TextField
          id="standard-basic"
          label="Search Recipes"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </section>
  );
};

export default Search;
