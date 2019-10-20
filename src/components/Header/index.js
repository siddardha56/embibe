import React from 'react';
import { Row, Col } from 'react-bootstrap';

import './header.css';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  logout = () => {
    const { history } = this.props;
    localStorage.removeItem('authLogin');
    history.push('/login');
  }
  
  render() {
    const { searchStudent, alphabeticalOrder, search, rankingOrder } = this.props;
    return (
      <header>
        <Row className="header-container">
          <Col md={8} className="header-container-wrapper">
            <input style={{ width: '100%'}} type="search" value={search} onChange={searchStudent} placeholder="Search By Name" />
            <input type="button" value="Alphabetical Order" onClick={alphabeticalOrder} />
            <input type="button" value="Rank Order" onClick={rankingOrder} />
          </Col>
          <Col md={2}>
            <a onClick={this.logout}>Logout</a>
          </Col>
        </Row>
      </header>
    );
  }
};

export default Header;
