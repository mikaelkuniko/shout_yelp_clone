import './index.css'

export const Footer = () => {


    return (
        <div className='footer-container'>
            <div className='code-languages-container'>
                <div>
                    <span>
                        <i className="devicon-python-plain"></i>
                        Python
                    </span>
                </div>
                <div>
                    <span>
                        <i className="devicon-flask-original"></i>
                        Flask
                    </span>
                </div>
                <div>
                    <span>
                        <i className="devicon-git-plain"></i>
                        Git
                    </span>
                </div>
                <span>
                    <i className="devicon-html5-plain"></i>
                    HTML
                </span>
                <div>
                    <span>
                        <i className="devicon-css3-plain-wordmark"></i>
                        CSS
                    </span>
                </div>
                <div>
                    <span>
                        <i className="devicon-javascript-plain"></i>

                        Javascript
                    </span>
                </div>
                <span>
                    <i className="devicon-sqlalchemy-plain"></i>
                    SQL Alchemy
                </span>
                <div>
                    <span>
                        <i className="devicon-react-original"></i>
                        React
                    </span>
                </div>
                <div>
                    <span>
                        <i className="devicon-redux-original"></i>
                        Redux
                    </span>
                </div>

            </div>
            <div className='my-information'>
                <p>Developed By</p>
                <div className="my-information-creators">
                    <div className="single-creator">
                        <p>Brandon Bimestefer</p>
                        <a className="user-link" href="https://github.com/bbimestefer" rel="noreferrer" target="_blank">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a className="user-link" href="https://www.linkedin.com/in/brandon-bimestefer-a01924250/" rel="noreferrer" target="_blank">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </div>
                    <div className="single-creator">
                        <p>Mikael Kuniko</p>
                        <a className="user-link" href="https://github.com/mikaelkuniko" rel="noreferrer" target="_blank">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a className="user-link" href="https://www.linkedin.com/in/mikael-kuniko-0705bb261/" rel="noreferrer" target="_blank">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </div>
                    <div className="single-creator">
                        <p>Marc Smith</p>
                        <a className="user-link" href="https://github.com/marcsmithr" rel="noreferrer" target="_blank">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        {/* <a className="user-link" href="https://www.linkedin.com/in/joyce-kang-18b70624b/" rel="noreferrer" target="_blank">
                            <i className="fa-brands fa-linkedin"></i>
                        </a> */}
                    </div>
                    <div className="single-creator">
                        <p>Joyce Kang</p>
                        <a className="user-link" href="https://github.com/joyceyukang" rel="noreferrer" target="_blank">
                            <i className="fa-brands fa-github"></i>
                        </a>
                        <a className="user-link" href="https://www.linkedin.com/in/joyce-kang-18b70624b/" rel="noreferrer" target="_blank">
                            <i className="fa-brands fa-linkedin"></i>
                        </a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Footer
