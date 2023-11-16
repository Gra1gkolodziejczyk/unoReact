import axios from "axios";

const Axios = axios.create({
    baseURL: "http://51.83.42.138:9001",
});
export default Axios;