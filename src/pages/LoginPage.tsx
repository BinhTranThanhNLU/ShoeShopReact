import LoginForm from "../components/LoginComponent/LoginForm";
import { PageTitle } from "../components/utils/PageTitle";

const LoginPage = () => {
    return (
        <main className="main">
            <PageTitle
                title="Đăng nhập"
                breadcrumbs={[
                    { label: "Trang chủ", path: "/home" },
                    { label: "Đăng nhập" }
                ]}
            />

            <section id="login" className="login section">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 col-md-10">
                            <LoginForm />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default LoginPage;