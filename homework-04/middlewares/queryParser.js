import url from 'url'

export default (req, res, next) => {
  req.parsedQuery = url.parse(req.url, true).query
  next()
}
