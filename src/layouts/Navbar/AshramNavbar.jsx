import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import LogoImg from "../../assets/images/Logo.png";
import MenuIcon from '@mui/icons-material/Menu';
import CancelIcon from '@mui/icons-material/Cancel';

const Navbar = () => {
    let menuref = useRef(null);
    let crossref = useRef(null);

    const showExtra = () => {
        menuref.current.style.display = "none";
        crossref.current.style.display = "block";
    };

    const showLess = () => {
        menuref.current.style.display = "block";
        crossref.current.style.display = "none";
    };

    const hideMenu = () => {
        crossref.current.style.display = "none";
        menuref.current.style.display = "block";
    };

    return (
        <div className="header">
            <div className="upperheader">
                <div className="logo">
                    <img
                        src={LogoImg}
                        alt="Ashram-logo"
                        className="logo"
                    />
                </div>
                <div className="ashram_name">
                    <h2>Haridasnagar Sri Sri Ramakrishna Ashram</h2>
                    <h4>Established : 2001</h4>
                </div>
            </div>
            <div className="lowerheader">
                <ul className="links">
                    <li>
                        <Link to="/ashram/home" className="header_link">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/ashram/about" className="header_link">
                            About Us
                        </Link>
                    </li>
                    {/* <li>
                        <Link to="/ashram/activities" className="header_link">
                            Activities
                        </Link>
                    </li> */}
                    <li>
                        <Link to="/ashram/news_event" className="header_link">
                            News Event
                        </Link>
                    </li>
                    <li>
                        <Link to="/ashram/media" className="header_link">
                            Media
                        </Link>
                    </li>
                    <li>
                        <Link to="/ashram/contact" className="header_link">
                            Contact
                        </Link>
                    </li>
                    <li>
                        <Link to="/ashram/donate" className="header_link">
                            Donation
                        </Link>
                    </li>
                    <li>
                        <Link to='/school' className="header_link" id='schoolLink'>
                            School Page
                        </Link>
                    </li>
                </ul>
            </div>
            <div className="lowerheader_hidden">
                <div className="menu_logo">
                    <MenuIcon className="menu_logo_img"
                        onClick={showExtra}
                        ref={menuref}
                    />
                </div>
                <div className="menu_option" ref={crossref} style={{ display: 'none' }}>
                    <div className="menu_logo">
                        <CancelIcon className="menu_logo_img"
                            onClick={showLess}
                        />
                    </div>
                    <ul className="menu_links" onClick={hideMenu}>
                        <li>
                            <Link to="/ashram/home" className="header_hidden_link">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/ashram/about" className="header_hidden_link">
                                About Us
                            </Link>
                        </li>
                        {/* <li>
                            <Link to="/ashram/activities" className="header_hidden_link">
                                Activities
                            </Link>
                        </li> */}
                        <li>
                            <Link to="/ashram/news_event" className="header_hidden_link">
                                News Event
                            </Link>
                        </li>
                        <li>
                            <Link to="/ashram/media" className="header_hidden_link">
                                Media
                            </Link>
                        </li>
                        <li>
                            <Link to="/ashram/contact" className="header_hidden_link">
                                Contact
                            </Link>
                        </li>
                        <li>
                            <Link to="/ashram/donate" className="header_hidden_link">
                                Donation
                            </Link>
                        </li>
                        <li>
                        <Link to='/school' className="header_link" id='schoolLink'>
                            School Page
                        </Link>
                    </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;

//Sandipto Roy 19 aug