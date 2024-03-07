const Footer = () => {
    return (
        <footer className="text-center bg-body-tertiary">
            <div className="container pt-4">
                <section className="mb-4">
                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://www.facebook.com/groups/795791053941687"
                        target="_blank"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <i className="fab fa-facebook-f"></i>
                    </a>


                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://www.linkedin.com/in/bar%C4%B1%C5%9F-mehmed-b8b944243/"
                        target="_blank"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <i className="fab fa-linkedin"></i>
                    </a>

                    <a
                        data-mdb-ripple-init
                        className="btn btn-link btn-floating btn-lg text-body m-1"
                        href="https://github.com/barishm"
                        target="_blank"
                        role="button"
                        data-mdb-ripple-color="dark"
                    >
                        <i className="fab fa-github"></i>
                    </a>
                </section>
            </div>

            <div className="text-center p-3" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
                © 2023 Copyright: RoboBG
            </div>
        </footer>
    );
};

export default Footer;