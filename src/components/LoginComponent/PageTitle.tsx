interface Breadcrumb {
    label: string;
    path?: string;
}

interface PageTitleProps {
    title: string;
    breadcrumbs: Breadcrumb[];
}

export const PageTitle = ({ title, breadcrumbs }: PageTitleProps) => {
    return (
        <div className="page-title light-background">
            <div className="container d-lg-flex justify-content-between align-items-center">
                <h1 className="mb-2 mb-lg-0">{title}</h1>
                <nav className="breadcrumbs">
                    <ol>
                        {breadcrumbs.map((bc, index) => (
                            <li key={index} className={!bc.path ? "current" : ""}>
                                {bc.path ? <a href={bc.path}>{bc.label}</a> : bc.label}
                            </li>
                        ))}
                    </ol>
                </nav>
            </div>
        </div>
    );
};