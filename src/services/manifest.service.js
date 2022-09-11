import axios from 'axios'
import { Iiif } from '@/plugins/apiconfig'

export const manifestListService = (params) => {
  return axios({
    method: 'get',
    url: Iiif,
    params
  })
}