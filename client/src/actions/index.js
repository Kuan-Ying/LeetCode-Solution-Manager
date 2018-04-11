import axios from 'axios';
import * as actionType from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user')
  dispatch({type:actionType.FETCH_USER, payload: res.data})
}

export const fetchData = () => async dispatch => {
  const res = await axios.get('/api/problems')
  dispatch({type:actionType.FETCH_DATA, payload: res.data})
}

export const fetchDataWithKeys = obj => async dispatch => {
  let url = '/api/problems/search?'
  const keys = Object.keys(obj)
  for (let key of keys) {
    for (let element of obj[key]) {
      url += (key+"="+element + '&')
    }
  }
  const res = await axios.get(url)
  dispatch({type:actionType.FETCH_DATA, payload: res.data})
}

export const fetchDataWithCompany = id => async dispatch => {
  let url = '/api/problems/company/'+ id
  const res = await axios.get(url)
  dispatch({type:actionType.FETCH_DATA, payload: res.data})
}

export const putFinished = id => async dispatch => {
  let postState = true
  await axios.post("/api/problems/finish/"+ id + "/?_method=PUT")
      .catch(err => postState = err)
  dispatch({type:null, payload: postState})
}

export const fetchSolutions = id => async dispatch => {
  const res = await axios.get("/api/solutions/" + id)
  dispatch({type:actionType.FETCH_SOLUTIONS, payload: res.data})
}

export const postSolution = (id, newSolution) => async dispatch => {
  let postState = true
  const url = '/api/solutions/'+ id
  await axios.post(url, newSolution).catch(err=> postState = err)
  dispatch({type:null, payload: postState})
}

export const putTitle = (solutionId, title) => async dispatch => {
  let postState = true
  const url = "/api/solutions/"+ solutionId + "/title?_method=PUT"
  await axios.post(url, { title: title })
              .catch(err=> postState = err)
  dispatch({type:null, payload: postState})
}

export const putDescription = (solutionId, description) => async dispatch => {
  let postState = true
  const url = "/api/solutions/"+ solutionId + "/description?_method=PUT"
  await axios.post(url, { description: description })
              .catch(err=> postState = err)
  dispatch({type:null, payload: postState})
}

export const deleteSolution = solutionId => async dispatch => {
  let postState = true
  const url = '/api/solutions/'+ solutionId + "?_method=DELETE"
  await axios.post(url).catch(err=> postState = err)
  dispatch({type:null, payload: postState})
}

export const postCode = (solutionId, code) => async dispatch => {
  let postState = true
  const url = '/api/solutions/' + solutionId + '/codes/'
  await axios.post(url, code).catch(err=> postState = err)
  dispatch({type:null, payload: postState})
}

export const putCode = (solutionId, codeId, code) => async dispatch => {
  let postState = true
  const url = '/api/solutions/' + solutionId + '/codes/'+ codeId + "?_method=PUT"
  await axios.post(url, code).catch(err=> postState = err)
  dispatch({type:null, payload: postState})
}

export const deleteCode = (solutionId, codeId) => async dispatch => {
  let postState = true
  const url = '/api/solutions/'+ solutionId + '/codes/' + codeId + "?_method=DELETE"
  await axios.post(url).catch(err=> postState = err)
  dispatch({type:null, payload: postState})
}