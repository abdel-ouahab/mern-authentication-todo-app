const Input = ({inputref, value, onChange, placeholder, type = "text", classname, error }) => {
  return (
    <div className="flex flex-col">
      <input
        {...inputref} 
        type={type}
        placeholder={placeholder}
        className={`${classname} sm:w-96 border-2 border-violet-500 bg-violet-950 p-2 placeholder-slate-300 text-gray-100 focus:outline-none focus:border-violet-500`}
        value={value}
        onChange={onChange}
        autoComplete="off"
        
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default Input;
