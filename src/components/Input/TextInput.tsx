import { ReactNode } from 'react';

interface TextInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  children?: ReactNode;
}

const TextInput = ({ id, label, placeholder, children }: TextInputProps) => {
  return (
    <>
      <input
        className="p-2 text-xl bg-carbon-900 rounded-md outline-none w-full"
        type="text"
        id={id}
        name={id}
        autoComplete="off"
        placeholder={placeholder}
      />
      {children}
      {label && <label htmlFor={id}>{label}</label>}
    </>
  );
};

TextInput.defaultProps = {
  label: '',
  placeholder: '',
  children: undefined,
};

export default TextInput;
