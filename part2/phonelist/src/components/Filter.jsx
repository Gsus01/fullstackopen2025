const Filter = ({ value, onChange }) => (
  <div>
    <input
      value={value}
      onChange={onChange}
      placeholder="Introduce los cambios a realizar"
    />
  </div>
)

export default Filter
