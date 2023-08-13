export const handleInternalServer = (res, message?: string) => {
    res.status(500).send({ message: message || "Internal Server Error!" });
};

export const handleBadRequest = (res, message?: string) => {
    res.status(400).send({ message: message || "Bad Request!" });
};

export const handleUnauthorized = (res, message?: string) => {
    res.status(401).send({ message: message || "Unauthorized user!" });
};

export const handleForbidden = (res, message?: string) => {
    res.status(403).send({ message: message || "Unauthorized to access!" });
};

export const handleConflict = (res, message?: string) => {
    res.status(409).send({ message: message || "Conflict!" });
};

export const handleNotFound = (res, message?: string) => {
    res.status(404).send({ message: message || "Resource not found!" });
};
