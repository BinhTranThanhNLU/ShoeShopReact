import { PageTitle } from "../components/utils/PageTitle";
import RegisterForm from "../components/RegisterComponent/RegisterForm";
import SocialRegister from "../components/RegisterComponent/SocialRegister";

const RegisterPage = () => {
    return (
        <main className="main">
            <PageTitle
                title="Đăng ký"
                breadcrumbs={[
                    { label: "Trang chủ", path: "/home" },
                    { label: "Đăng ký" }
                ]}
            />

            <section id="register" className="register section">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="registration-form-wrapper">
                                <div className="form-header text-center">
                                    <h2>Tạo tài khoản của bạn</h2>
                                    <p>Tạo tài khoản của bạn và bắt đầu mua sắm với chúng tôi</p>
                                </div>

                                <div className="row">
                                    <div className="col-lg-8 mx-auto">
                                        <RegisterForm />
                                    </div>
                                </div>

                                <SocialRegister />

                                {/* Các yếu tố trang trí */}
                                <div className="decorative-elements">
                                    <div className="circle circle-1"></div>
                                    <div className="circle circle-2"></div>
                                    <div className="circle circle-3"></div>
                                    <div className="square square-1"></div>
                                    <div className="square square-2"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default RegisterPage;