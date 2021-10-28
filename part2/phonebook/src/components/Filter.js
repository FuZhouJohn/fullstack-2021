const Filter = ({ text, setText }) => {
  const handleTextChange = (event) => {
    setText(event.target.value);
  };
  return (
    <p>
      filter shown with <input value={text} onChange={handleTextChange} />
    </p>
  );
};

export default Filter;
