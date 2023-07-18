const SearchCountriesForm = ({ keyword, onKeywordChange }) => {
    return (
      <form>
        <div>
          find countries:{" "}
          <input type="text" value={keyword} onChange={onKeywordChange} />
        </div>
      </form>
    );
  };

export default SearchCountriesForm