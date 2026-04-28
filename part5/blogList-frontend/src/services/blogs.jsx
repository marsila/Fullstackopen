import axios from 'axios'

const baseUrl = '/api/blogs'
let token = null

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const creatBlog = async (inputs) => {
  const config = {
    headers : {Authorization : token}
  }
  const response = await axios.post(baseUrl,inputs, config)
  return response.data
}

const updateBlogLikes = async (id, inputs) => {
  const config = {
    headers: {Authorization : token}
  }
  const response = await axios.put(`${baseUrl}/${id}`, inputs, config)
  return response.data
}

const deleteBlog = async (id) => {
  const config = {
    headers:{Authorization : token}
  }
  const response = await axios.delete(`${baseUrl}/${id}`,config)
  return response.data
}
export default {getAll, setToken, creatBlog, updateBlogLikes, deleteBlog}