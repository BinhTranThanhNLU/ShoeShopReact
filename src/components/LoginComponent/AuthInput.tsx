import React from "react";

interface AuthInputProps {
  name: string;
  type: string;
  placeholder: string;
  icon: string;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthInput: React.FC<AuthInputProps> = ({
  name,
  type,
  placeholder,
  icon,
  value,
  error,
  onChange,
}) => {
  return (
    <div className="login-field mb-3">
      <div className="input-group">
        <span className="input-icon">
          <i className={`bi ${icon}`}></i>
        </span>
        <input
          id={name}
          name={name}
          type={type}
          className={`form-control ${error ? "is-invalid" : ""}`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
        />
        {type === "password" && (
          <span className="password-toggle">
            <i className="bi bi-eye"></i>
          </span>
        )}
      </div>
      {error && (
        <div id={`${name}-error`} className="field-error text-danger small mt-1">
          {error}
        </div>
      )}
    </div>
  );
};
