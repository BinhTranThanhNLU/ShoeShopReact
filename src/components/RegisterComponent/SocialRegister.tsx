const SocialRegister = () => {
    return (
        <div className="social-login">
            <div className="row">
                <div className="col-lg-8 mx-auto">
                    <div className="divider">
                        <span>hoặc đăng ký với</span>
                    </div>
                    <div className="social-buttons">
                        <a href="#" className="btn btn-social">
                            <i className="bi bi-google"></i>
                            <span>Google</span>
                        </a>
                        <a href="#" className="btn btn-social">
                            <i className="bi bi-facebook"></i>
                            <span>Facebook</span>
                        </a>
                        <a href="#" className="btn btn-social">
                            <i className="bi bi-apple"></i>
                            <span>Apple</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SocialRegister;