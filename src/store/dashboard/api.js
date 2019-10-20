import axios from 'axios';

const getStudentsData = () => axios.get('https://api.myjson.com/bins/1dlper');

export default { getStudentsData };