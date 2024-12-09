import  Axios  from 'axios';

const api = "http://127.0.0.1:3001/api/auth";


export default class Auth {
    static async login(data) {
        try {
            const response = await Axios.post(`${api}/login`,{...data});
            return response;
          } catch (err) {
            console.error("Login error:", err.response?.data || err.message);
          }
    }
}