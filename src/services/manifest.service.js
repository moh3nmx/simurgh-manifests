import axios from 'axios'
import { Iiif, Manifest } from '@/plugins/apiconfig'

export const getManifestList= (params) => {
  return axios({
    method: 'get',
    url: Iiif,
    params
  })
}

export const deleteManifest = (id) => {
  return axios({
    method: 'delete',
    url: Manifest + id,
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

export const deleteMetaData = (url, data) => {
  return axios({
    method: 'delete',
    url,
    data
  })
}