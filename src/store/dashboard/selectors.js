
const getStudentsData = ({ dashBoardReducer }) => Object.keys(dashBoardReducer.data).map(det => {
  const details = dashBoardReducer.data[det];
  return {
    ...details,
    total: Object.values(details.marks).reduce((cur, acc) => acc + cur),
  };
});

const isLoading = ({ dashBoardReducer }) => dashBoardReducer.loading;

const getStudentDetails = ({ dashBoardReducer }, id) => {
  if (dashBoardReducer.data[id]) {
    return {
      ...dashBoardReducer.data[id],
      total: dashBoardReducer.data[id].marks.s1 + dashBoardReducer.data[id].marks.s2 + dashBoardReducer.data[id].marks.s3,
    };
  }
};

export {
  getStudentsData, getStudentDetails, isLoading,
};
