function lastModifiedPlugin (schema, options) {
  schema.add({ lastModifiedDate: Date })

  schema.pre('save', function (next) {
    this.lastModifiedDate = new Date()
    next()
  })

  schema.pre('update', function (next) {
    this.lastModifiedDate = new Date()
    next()
  })

  if (options && options.index) {
    schema.path('lastModifiedDate').index(options.index)
  }
}

export default { lastModifiedPlugin }
