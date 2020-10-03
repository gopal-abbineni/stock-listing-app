import React, { useEffect } from 'react';
import { Row, Container, Button } from 'react-bootstrap';
import StockCard from './StockCard';
import { useSelector, useDispatch } from 'react-redux';
import { fetchpopularStocks } from '../redux';
import { NavLink } from 'react-router-dom';

function Home() {
    console.log("Rendering Home");

    const { popularStocks, error, myStocks } = useSelector((state) => {return {
        popularStocks: state.popularStocks,
        error: state.error,
        myStocks: state.myStocks
    }});
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(fetchpopularStocks());
    }, [dispatch]);

    return (
        <React.Fragment>
            {/* Render mystocks stocks */}
            {myStocks.length > 0 && (<Container fluid={true} className="stock-container">
                <h5>My Stocks</h5>
                <Row className="justify-content-center justify-content-lg-start">
                    {myStocks.slice(0, 3).map((value, index) => {
                        return <StockCard key={index} stock={popularStocks[value]} />
                    })}
                </Row>
                <Row className="justify-content-center">
                    <Button variant="dark" as={NavLink} to="/mystocks">View More</Button>{' '}
                </Row>
            </Container>)}

            {/* Render popularStocks stocks */}
            {Object.keys(popularStocks).length > 0 ? (<Container fluid={true} className="stock-container">
                <h5>Popular Stocks</h5>
                <Row className="justify-content-center justify-content-lg-start">
                    {Object.keys(popularStocks).map((value, index) => {
                        return <StockCard key={index} stock={popularStocks[value]} />
                    })}
                </Row>
            </Container>) : (<Row className="justify-content-center" style={{ marginTop: '5%' }}>
                <p>{error}</p>
            </Row>)}
        </React.Fragment>
    );
}

export default React.memo(Home);