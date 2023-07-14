export const requestParser = (req) => {
    return {
        "action": req.action || "",
        "method": req.method,
        "url": req.originalUrl,
        "params": req.params,
        "query": req.query,
        "body": req.body,
        "user": req.user,
        "session": req.session,
        "headers": req.rawHeaders,
        "sessionID": req.sessionID
    }
}