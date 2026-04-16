import React from "react";

interface AuthInputProps {
  type: string;
  placeholder: string;
  icon: string;
  required?: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  type,
  placeholder,
  icon,
  required,
  value,
  onChange,
}) => {
  return (
    <div className="input-group mb-3">
      <span className="input-icon">
        <i className={`bi ${icon}`}></i>
      </span>
      <input
        type={type}
        className="form-control"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      />
      {type === "password" && (
        <span className="password-toggle">
          <i className="bi bi-eye"></i>
        </span>
      )}
    </div>
  );
};
