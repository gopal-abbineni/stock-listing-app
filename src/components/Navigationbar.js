import React, { useState, useEffect } from 'react';
import { Nav, Navbar, Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { useSelector } from 'react-redux';

function Navigationbar(props) {

    const [time, setTime] = useState(0);

    const stocksUpdatedAt = useSelector(state => state.stocksUpdatedAt);

    useEffect(() => {
        const interval = setInterval(() => setTime(Date.now()), 1000);
        return () => {
            clearInterval(interval);
        };
    }, []);

    const getTimeString = (date) => {

        var seconds = Math.floor((new Date() - new Date(date)) / 1000);
        var interval = seconds / 31536000;
        if (interval > 1) {
            return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + " minutes";
        }
        if (seconds <= 1) {
            return "a few seconds"
        }
        return Math.floor(seconds) + " seconds";
    }

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={NavLink} to="/">Stock Listing</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={NavLink} to="/" exact>Home</Nav.Link>
                    <Nav.Link as={NavLink} to="/mystocks">My Stocks</Nav.Link>
                </Nav>
                <Form inline>
                    <Nav className="mr-auto">
                        {stocksUpdatedAt && <Nav.Link >Updated: <span>{getTimeString(stocksUpdatedAt)}</span> ago</Nav.Link>}
                    </Nav>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Navigationbar;