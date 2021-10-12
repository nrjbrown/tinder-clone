import axios from 'axios';

const instance = axios.create({
    baseURL:"https://nev-tinder-backend.herokuapp.com"
}); 

export default instance;