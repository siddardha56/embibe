import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Row, Col, Card, Badge, ListGroup,
} from 'react-bootstrap';
import { Link } from "react-router-dom";

import './details.css';
import { actionCreators, selectors } from '../../store/dashboard';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log(this.props);
    const { studentDetails, getStudentsData } = this.props;
    if (!studentDetails) {
      getStudentsData();
    }
  }

  render() {
    console.log('chskd', this.props.studentDetails);
    const { studentDetails } = this.props;
    if(!studentDetails) return null;
    return (
      <div>
        <Row className="details-container">
          <h1>
          <Badge variant="success">Student Details</Badge>
          </h1>
          <Col xs={12} md={8} sm={12}>
            <Card>
              <Card.Body>
                <Card.Title>{studentDetails.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Roll No: {studentDetails.rollNo}</Card.Subtitle>
                <ListGroup variant="flush">
                  <ListGroup.Item>Subject 1: {studentDetails.marks.s1}</ListGroup.Item>
                  <ListGroup.Item>Subject 2: {studentDetails.marks.s2}</ListGroup.Item>
                  <ListGroup.Item>Subject 3: {studentDetails.marks.s3}</ListGroup.Item>
                  <ListGroup.Item>
                    <Card.Subtitle className="mb-2">Total Marks: {studentDetails.total}</Card.Subtitle>
                  </ListGroup.Item>
                </ListGroup>
                <Link to={`/`}>Back</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
};

const mapStateToProps = (store, ownProps) => ({
  studentDetails: selectors.getStudentDetails(store, ownProps.match.params.id),
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getStudentsData: actionCreators.getStudentsData,
    },
    dispatch,
  );


export default connect(mapStateToProps, mapDispatchToProps)(Login);
