import React from 'react';
import { Card, Row, Col, Form } from 'react-bootstrap';

function StockCard(Props) {
    console.log("Rendering StockCard", Props.stock.symbol);
    return (
        <Card border={Props.isSelectionEnabled && Props.stock.isSelected ? "success" : "dark"} style={{ width: '25rem', margin: '10px' }}>
            <Card.Body>
                <Card.Title style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <b>{Props.stock.symbol}</b>
                    {Props.isSelectionEnabled && (
                        <Form.Check type="checkbox" name={Props.stock.symbol} checked={Props.stock.isSelected || false} onChange={Props.onSelect} />
                    )}
                </Card.Title>
                <Row>
                    <Col xs={7} md={7}>
                        <div>
                            <p>
                                High: {Props.stock.week52High}
                            </p>
                            <p>
                                Low: {Props.stock.week52Low}
                            </p>
                        </div>
                        <Card.Link><b>{Props.stock.companyName}</b></Card.Link>
                    </Col>
                    <Col xs={4} md={4}>
                        <div className="text-center">
                            <h3>
                                <b>{Props.stock.latestPrice}</b>
                            </h3>
                            {/* <small style={{ color: Props.stock.change < 0 ? "red" : "green" }}>{Props.stock.change} ({Math.abs(Props.stock.changePercent).toFixed(2)}%)</small> */}
                            <p>
                                Current
                            </p>
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default React.memo(StockCard);