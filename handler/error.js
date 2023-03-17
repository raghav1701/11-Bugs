exports.handleInternalServer = (res, message) => {
  res.status(500).send({ message: message || "Internal Server Error!" });
};

exports.handleBadRequest = (res, message) => {
  res.status(400).send({ message: message || "Bad Request!" });
};

exports.handleUnauthorized = (res, message) => {
  res.status(401).send({ message: message || "Unauthorized user!" });
};

exports.handleForbidden = (res, message) => {
  res.status(403).send({ message: message || "Unauthorized to access!" });
};

exports.handleConflict = (res, message) => {
  res.status(409).send({ message: message || "Conflict!" });
};

exports.handleNotFound = (res, message) => {
  res.status(403).send({ message: message || "Resource not found!" });
};
