export default (req, res, next) => {
    if (req.headers.cookie !== undefined) {
        req.parsedCookies = []
        req.headers.cookie.split(';').forEach(cookieAndValue => {
            const cookieValueArray = cookieAndValue.split('=')
            let parsedCookie = {}
            parsedCookie[cookieValueArray[0]] = cookieValueArray[1]
            req.parsedCookies.push(parsedCookie)
        })
    }
    next()
}
