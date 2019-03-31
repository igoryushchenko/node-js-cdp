module.exports.raiseEntityNotFoundResponse = function raiseEntityNotFoundResponse (res, id) {
  res.status(404).json({
    success: false,
    reason: `Entity with id=${id} not found`
  })
}

module.exports.raiseBadRequestResponse = function raiseBadRequestResponse (res) {
  res.status(400).json({
    code: 400,
    message: 'Invalid request'
  })
}

module.exports.raiseAnErrorResponse = function raiseAnErrorResponse (res, err) {
  console.log(err)
  res.status(500).json({
    code: 500,
    message: 'Something went wrong'
  })
}
