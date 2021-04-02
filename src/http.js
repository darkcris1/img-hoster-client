import { token } from './tokens'
const defaults = {
  baseUrl: 'https://img-hoster.herokuapp.com/',
  options: {
    headers: {
      Authorization: token,
    },
  },
}

function responseError(response) {
  const error = new Error(
    `Fetcher: ${response.status} status ${response.statusText}`,
  )
  error.response = response
  return error
}
function isStatusError(status) {
  if (status >= 400 && status <= 510) return true

  return false
}

function parseUrl(url) {
  if (/^http(s?):\/\//.test(url)) return url
  if (/^\//.test(url) && /\/$/.test(defaults.baseUrl)) {
    url = url.replace(/^\//, '')
  }
  return defaults.baseUrl + url
}

/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<Response>}
 */
const get = (url, options = {}) => {
  url = parseUrl(url)
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url, { ...options, ...defaults.options })
    if (isStatusError(res.status)) return reject(responseError(res))

    resolve(res)
  })
}
/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<Response>}
 */
const post = (url, data, options = {}) => {
  url = parseUrl(url)

  options.method = 'POST'
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url, {
      ...options,
      ...defaults.options,
      body: data instanceof FormData ? data : JSON.stringify(data),
    })
    if (isStatusError(res.status)) return reject(responseError(res))

    resolve(res)
  })
}

/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<Response>}
 */
const put = (url, data, options = {}) => {
  url = parseUrl(url)

  options.method = 'PUT'
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url, {
      ...options,
      ...defaults.options,
      body: data instanceof FormData ? data : JSON.stringify(data),
    })

    if (isStatusError(res.status)) return reject(responseError(res))

    resolve(res)
  })
}
/**
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<Response>}
 */
const del = (url, options = {}) => {
  url = parseUrl(url)

  options.method = 'DELETE'
  return new Promise(async (resolve, reject) => {
    const res = await fetch(url, { ...options, ...defaults.options })
    if (isStatusError(res.status)) return reject(responseError(res))

    resolve(res)
  })
}

const fetcher = fetch

fetcher.delete = del
fetcher.put = put
fetcher.post = post
fetcher.get = get

export default fetcher
