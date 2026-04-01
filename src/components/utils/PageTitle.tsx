import React from "react";

interface PageTitleProps {
  title: string;
  breadcrumbs: { label: string; path?: string }[];
}

export const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumbs }) => {
  return (
    <div className="page-title light-background">
      <div className="container d-lg-flex justify-content-between align-items-center">
        <h1 className="mb-2 mb-lg-0">{title}</h1>

        <nav className="breadcrumbs">
          <ol>
            {breadcrumbs.map((crumb, idx) => (
              <li
                key={idx}
                className={idx === breadcrumbs.length - 1 ? "current" : ""}
              >
                {idx === breadcrumbs.length - 1 ? (
                  crumb.label
                ) : (
                  <a href={crumb.path || "#"}>{crumb.label}</a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
};
