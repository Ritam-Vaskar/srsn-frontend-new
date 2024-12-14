import React from "react";
import { Link } from "react-router-dom";
import {
    FaFacebook,
    FaTwitter,
    FaGooglePlusG,
    FaLinkedin,
    FaMapMarkerAlt
} from "react-icons/fa";
import "./styles/Footer.css";
import footLogo from "../../assets/images/Logo.png";
import GitHubIcon from '@mui/icons-material/GitHub';
import { HashLink } from 'react-router-hash-link';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MailIcon from '@mui/icons-material/Mail';

const Footer = () => {
    return (
        <div>
            <div className="footer_top">
                <div className="top_container">
                    <h2>Ramakrishna School and Seva Sangha(Haridasnagar)</h2>
                    <h4>
                        Embrace the spiritual wisdom of Ramakrishna with devotion and
                        unity!
                    </h4>
                    {/* <ul className="top_social-links">
                        <li>
                            <a
                                href="https://www.facebook.com/p/Sri-Ramakrishna-Siksha-Niketan-100057181941594/"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaFacebook className="fab" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FaTwitter className="fab" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FaGooglePlusG className="fab" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <FaLinkedin className="fab" aria-hidden="true" />
                            </a>
                        </li>
                        <li>
                            <a
                                href="https://maps.app.goo.gl/35NpYHhCWGmScs8RA"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <FaMapMarkerAlt className="fab" aria-hidden="true" />
                            </a>
                        </li>
                    </ul> */}
                </div>
            </div>
            <div className="footer-container">
                <footer className="footer">
                    <div className="footer-top">
                        <div className="comp-logo">
                            <Link className="logo-link" to='/'>
                                <img className="logo-svg" src={footLogo} alt="infoma logo" />
                                Ramkrishna Sachool and Seva Sangha
                            </Link>
                        </div>
                        <div className="filler-text">Cultivating Spiritual Wisdom for a Transcendent Life</div>
                        <div className="social">
                            <a className="social-link" href="https://maps.app.goo.gl/4AD9FQg6D1r4v7NUA">
                                <FaMapMarkerAlt className="fab_logo" aria-hidden="true" style={{ color: '#0d7e20' }} />
                            </a>
                            <a className="social-link" href="https://www.facebook.com/p/Sri-Ramakrishna-Siksha-Niketan-100057181941594/">
                                <FaFacebook className="fab_logo" aria-hidden="true" style={{ color: '#3b5998' }} />
                            </a>
                            <a className="youtube-link" href="https://www.youtube.com/@SriRamakrishnaSikshaNiketan" style={{ display: "flex", justifyContent: "center", margin: -1 }}>
                                <YouTubeIcon className="fab_logo" aria-hidden="true" style={{ color: 'red', fontSize: '1.8rem' }} />
                            </a>
                            <a className="social-link" href="mailto:sriramakrishnasikshaniketan@gmail.com">
                                <MailIcon className="fab_logo" aria-hidden="true" style={{ color: '#007bb6' }} />
                            </a>
                        </div>
                    </div>

                    <div className="footer-grid">
                        <div className="footer-grid-column">
                            <div className="footer-grid-heading">Products</div>
                            <ul className="footer-links-list">
                                <li>
                                    <a href="#overview" className="footer-link">Overview</a>
                                </li>
                                <li>
                                    <a href="#overview" className="footer-link">Blog</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-grid-column">
                            <div className="footer-grid-heading">Company</div>
                            <ul className="footer-links-list">
                                <li>
                                    <a href="#overview" className="footer-link">About</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-grid-column">
                            <div className="footer-grid-heading">Support</div>
                            <ul className="footer-links-list">
                                <li>
                                    <HashLink smooth to="home#contact" className="footer-link">Contact</HashLink>
                                </li>
                                <li>
                                    <a href="#overview" className="footer-link">Chat</a>
                                </li>
                                <li>
                                    <a href="#overview" className="footer-link">FAQ</a>
                                </li>
                            </ul>
                        </div>
                        <div className="footer-grid-column">
                            <div className="footer-grid-heading">Legal</div>
                            <ul className="footer-links-list">
                                <li>
                                    <Link to='/terms' className="footer-link" target="main">Terms of Service</Link>
                                </li>
                                <li>
                                    <Link to='/privacypolicy' className="footer-link" target="main">Privacy Policy</Link>
                                </li>
                                <li>
                                    <Link to="/overview" className="footer-link" target="main">Cookie Settings</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </footer>
                <div className="footer-copyright">
                    <p>Created and Maintained by : <a href="https://www.linkedin.com/in/ritam-vaskar-50627527a/ " style={{ color: 'white' }}>Ritam Vaskar</a> and <a href="https://www.linkedin.com/in/sandipto-roy-675600277/" style={{ color: 'white' }}>Sandipto Roy</a></p>
                    <Link to='/source' className="footer-source"><GitHubIcon /> Source Code</Link>
                    <p>© 2024 - Present Haridasnagar Ramkrishna Mission. All rights reserved.</p>

                </div>
            </div>
        </div>
    );
};

export default Footer;
