import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";

import './dashBoard.css';
import Header from '../Header';
import { actionCreators, selectors } from '../../store/dashboard';

class DashBoard extends React.Component {
  constructor() {
    super();
    this.state = {
      aOrder: 0,
      tOrder: 0,
      search: '',
      studentsList: [],
    };
  }

  componentDidMount() {
    const { getStudentsData, studentsData } = this.props;
    if (studentsData.length) {
      this.setState({
        studentsList: studentsData,
        aOrder: 0,
        search: '',
        tOrder: 0,
      });
    } else {
      getStudentsData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { studentsData } = this.props;
    if (studentsData.length !== nextProps.studentsData.length) {
      this.setState({
        studentsList: nextProps.studentsData,
        aOrder: 0,
        search: '',
        tOrder: 0,
      })
    }
  }

  searchFilters = () => {
    const { studentsData } = this.props;
    const { search, aOrder, tOrder, studentsList } = this.state;
    this.setState({
      studentsList: studentsData.filter(data => data.name.toLowerCase().startsWith(search.toLowerCase()))
        .sort((a, b) => {
          if (tOrder) {
            return tOrder === -1 ? a.total - b.total : b.total - a.total;
          } else if (aOrder)  {
            if (aOrder === -1) {
              return a.name.localeCompare(b.name)
            } else return b.name.localeCompare(a.name)
          }
          return a.total - b.total;
        }),
    });
  }

  searchStudent = ({ target }) => {
    const { studentsData } = this.props;
    const { search, aOrder, tOrder, studentsList } = this.state;
    
    this.setState({
      search: target.value,
    }, () => this.searchFilters());
  }

  alphabeticalOrder = () => {
    const { aOrder } = this.state;
    this.setState({
      aOrder: aOrder === 1 ? -1 : 1,
      tOrder: 0,
    }, () => this.searchFilters());
  }

  rankingOrder = () => {
    const { tOrder } = this.state;
    this.setState({
      tOrder: tOrder === 1 ? -1 : 1,
      aOrder: 0,
    }, () => this.searchFilters());
  }

  render() {
    const { isLoading, history } = this.props;
    const { studentsList, search } = this.state;
    return (
      <div>
        <Header
          search={search}
          history={history}
          rankingOrder={this.rankingOrder}
          alphabeticalOrder={this.alphabeticalOrder}
          searchStudent={this.searchStudent}
        />
        {isLoading ?
          <p>Loading...</p> :
          <div className="body">
            <h1>Students List</h1>
            <Row>
              {studentsList.map(details => (
                <Col key={details.rollNo} xs={12} md={4} sm={6}>
                  <Card>
                    <Card.Body>
                      <Card.Title>{details.name}</Card.Title>
                      <Card.Subtitle className="mb-2 text-muted">Id: {details.rollNo}</Card.Subtitle>
                      <Card.Subtitle className="mb-2">Total Marks: {details.total}</Card.Subtitle>
                      <Link to={`/${details.rollNo}`}>Details</Link>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </div>
        }
      </div>
    );
  }
};

const mapStateToProps = store => ({
  isLoading: selectors.isLoading(store),
  studentsData: selectors.getStudentsData(store),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getStudentsData: actionCreators.getStudentsData,
    },
    dispatch,
  );


export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);
