import api from './api';

const actions = {
  GET_STUDENTS_DATA: 'GET_STUDENTS_DATA',
};

const actionCreators = {
  getStudentsData: () => ({
    type: actions.GET_STUDENTS_DATA,
    payload: api.getStudentsData(),
  }),
};

export { actions, actionCreators };
