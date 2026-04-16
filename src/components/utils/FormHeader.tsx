import React from "react";

interface FormHeaderProps {
  headerMessage: string;
  message: string;
}

export const FormHeader: React.FC<FormHeaderProps> = ({
  headerMessage,
  message,
}) => {
  return (
    <div className="form-header text-center">
      <h2>{headerMessage}</h2>
      <p>{message}</p>
    </div>
  );
};
