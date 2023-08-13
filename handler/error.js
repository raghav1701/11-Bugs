export const handleInternalServer = (res, message) => {
    res.status(500).send({ message: message || "Internal Server Error!" });
};

export const handleBadRequest = (res, message) => {
    res.status(400).send({ message: message || "Bad Request!" });
};

export const handleUnauthorized = (res, message) => {
    res.status(401).send({ message: message || "Unauthorized user!" });
};

export const handleForbidden = (res, message) => {
    res.status(403).send({ message: message || "Unauthorized to access!" });
};

export const handleConflict = (res, message) => {
    res.status(409).send({ message: message || "Conflict!" });
};

export const handleNotFound = (res, message) => {
    res.status(404).send({ message: message || "Resource not found!" });
};
