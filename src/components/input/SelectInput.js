const SelectInput = ({ label, name, value, onChange, options = [], required = false }) => (
  <div className="flex flex-col md:flex-row items-center mb-4">
    <label className="w-full md:w-1/3 mb-2 md:mb-0 text-left pr-4 font-medium">
      {label}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full md:w-2/3 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    >
      <option value="">--- Seçin ---</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectInput;
