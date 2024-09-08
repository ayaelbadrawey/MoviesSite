import axios from 'axios'
const axiosClient = axios.create({
    baseURL: 'https://api.themoviedb.org/3/trending/',
});

export default axiosClient