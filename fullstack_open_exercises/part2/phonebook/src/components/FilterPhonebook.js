const FilterPhonebook = ({ filterKeyword, onKeywordChange }) => {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input value={filterKeyword} onChange={onKeywordChange} />
      </div>
    </form>
  );
};

export default FilterPhonebook;
