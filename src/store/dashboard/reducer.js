import typeToReducer from 'type-to-reducer';
import { actions } from './actions';

const initialState = {
  loading: false,
  data: {},
};

const dashBoardReducer = typeToReducer({
  [actions.GET_STUDENTS_DATA]: {
    PENDING: state => Object.assign({}, state, {
      loading: true,
    }),
    FULFILLED: (state, action) => Object.assign({}, state, {
      loading: false,
      data: action.payload.data,
    }),
  },
}, initialState);

export default dashBoardReducer;
