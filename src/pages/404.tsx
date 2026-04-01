import { PageTitle } from "../components/utils/PageTitle";
import NotFoundContent from "../components/ErrorComponent/NotFoundContent";

const NotFoundPage = () => {
    return (
        <main className="main">
            <PageTitle
                title="404"
                breadcrumbs={[
                    { label: "Trang chủ", path: "/home" },
                    { label: "404" }
                ]}
            />

            <section id="error-404" className="error-404 section">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <NotFoundContent />
                </div>
            </section>
        </main>
    );
};

export default NotFoundPage;