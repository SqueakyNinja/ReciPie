import { TextField, InputAdornment } from '@material-ui/core';
import styles from './Search.module.scss';
import { useStore } from '../../store';

const Search = () => {
  const { query, setQuery } = useStore();

  return (
    <div className={styles.search}>
      <form noValidate autoComplete='off' onSubmit={(e) => e.preventDefault()}>
        <TextField
          autoFocus={true}
          className={styles.searchField}
          placeholder='Search...'
          variant='outlined'
          value={query}
          color='secondary'
          onChange={(e) => setQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <i className='fas fa-search'></i>
              </InputAdornment>
            ),
          }}
        />
      </form>
    </div>
  );
};

export default Search;
