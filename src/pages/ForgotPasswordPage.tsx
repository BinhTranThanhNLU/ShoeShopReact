import { PageTitle } from "../components/utils/PageTitle";
import ForgotPasswordForm from "../components/ForgotPasswordComponent/ForgotPasswordForm";

const ForgotPasswordPage = () => {
    return (
        <main className="main">
            <PageTitle
                title="Quên mật khẩu"
                breadcrumbs={[
                    { label: "Trang chủ", path: "/home" },
                    { label: "Quên mật khẩu" }
                ]}
            />

            <section id="register" className="register section">
                <div className="container" data-aos="fade-up" data-aos-delay="100">
                    <div className="row justify-content-center">
                        <div className="col-lg-10">
                            <div className="registration-form-wrapper">
                                <div className="form-header text-center">
                                    <h2>Quên mật khẩu</h2>
                                    <p>Hãy nhập email của bạn để nhận hướng dẫn khôi phục</p>
                                </div>

                                <div className="row">
                                    <div className="col-lg-8 mx-auto">
                                        <ForgotPasswordForm />
                                    </div>
                                </div>

                                {/* Các yếu tố trang trí giữ nguyên style của bộ Auth */}
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

export default ForgotPasswordPage;