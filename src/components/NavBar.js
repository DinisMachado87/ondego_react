import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../assets/ondego.svg";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import {
  useCurrentUser,
  useSetCurrentUser,
} from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import axios from "axios";
import useClickOutsideToggle from "../hooks/useClickOutsideToggle";

const NavBar = () => {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetCurrentUser();

  const { expanded, setExpanded, ref } = useClickOutsideToggle();

  const handleSignOut = async () => {
    try {
      await axios.post("/dj-rest-auth/logout/");
      setCurrentUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  const loggedInIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to='/event/create'>
        <i className='fa-solid fa-wand-magic-sparkles'></i>add evënt
      </NavLink>
      <NavLink
        exact
        className={styles.NavLink}
        activeClassName={styles.Active}
        to='/'>
        <i className='fa-solid fa-satellite'></i>all evënts
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to='/goingon'>
        <i className='fa-solid fa-fire'></i> evënts göing on
      </NavLink>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to='/joining'>
        <i className='fa-solid fa-rocket'></i>evënts I'm jöining
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to='/'
        onClick={handleSignOut}>
        <i className='fa-solid fa-lightbulb'></i>Sign out
      </NavLink>
      <NavLink
        className={styles.NavLink}
        to={`/profiles/${currentUser?.profile_id}`}>
        <Avatar
          src={currentUser?.profile_image}
          height={40}
        />
        Profile
      </NavLink>
    </>
  );

  const loggedOutIcons = (
    <>
      <NavLink
        className={styles.NavLink}
        activeClassName={styles.Active}
        to="/signin"
      >
        <i className="fa-solid fa-plug"></i>Sign in
      </NavLink>
      <NavLink
        to="/signup"
        className={styles.NavLink}
        activeClassName={styles.Active}
      >
        <i className="fa-solid fa-user-astronaut"></i>register
      </NavLink>
    </>
  );

  return (
    <Navbar
      expanded={expanded}
      className={`${styles.NavBar} navbar-dark`}
      text='darkviolet'
      border='blue'
      expand='md'
      fixed='top'>
      <Container>
        <NavLink to='/'>
          <Navbar.Brand>
            <img
              src={logo}
              alt='logo'
              height='45'
              className="p-1"
            />
          </Navbar.Brand>
        </NavLink>
        <Navbar.Toggle
          ref={ref}
          onClick={() => setExpanded(!expanded)}
          aria-controls='basic-navbar-nav'
          style={{ borderRadius: "1rem", borderColor: "darkviolet" }}
        />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {currentUser ? loggedInIcons : loggedOutIcons}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
