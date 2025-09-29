export default function InputField({
  type,
  label,
  name,
  value,
  onChange,
  required = false,
}) {
  return (
    <label
      htmlFor={name}
      className="flex flex-col gap-1 items-start text-start"
    >
      <p>{label}</p>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border border-blue-47 rounded-md cursor-pointer p-1"
        required={required}
      />
    </label>
  );
}
