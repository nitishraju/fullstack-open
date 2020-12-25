import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const _getData = (response) => response.data

const getAll = () => {
  return axios.get(baseURL).then(_getData)
}

const addPerson = (personObject) => {
  return axios.post(baseURL, personObject).then(_getData)
}

const updatePerson = (id, personObject) => {
  return axios.put(`${baseURL}/${id}`).then(_getData)
}

const deletePerson = (id) => {
  return axios.delete(`${baseURL}/${id}`)
}

const personService = { getAll, addPerson, updatePerson, deletePerson }

export default personService