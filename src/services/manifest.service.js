import axios from 'axios'
import { Iiif } from '@/plugins/apiconfig'

export const getManifestList= (params) => {
  return axios({
    method: 'get',
    url: Iiif,
    params
  })
}

export const getMetaData = (url) => {
  return axios({
    method: 'get',
    url
  })
}

export const saveMetaData = (url, data) => {
  return axios({
    method: 'put',
    url,
    data
  })
}