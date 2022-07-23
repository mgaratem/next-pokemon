import axios from 'axios';

// AXIOS REQUEST CREATION
const pokemon = axios.create({
    baseURL: 'https://pokeapi.co/api/v2'
})

export default pokemon;