const SerachForm = ({ handleInputChange }) => {
  return (
    <form>
      <div>
        <label htmlFor="findCountry">find countries </label>
        <input type="text" name="findCountry" onChange={handleInputChange} />
      </div>
    </form>
  );
};
export default SerachForm;
