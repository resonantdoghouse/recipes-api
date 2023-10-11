export function checkApiKey(req, res, next) {
  const apiKey = req.query.api_key; // Extract API key from the query string

  // Check if an API key is provided and validate it (e.g., against a database of valid keys)
  if (apiKey) {
    next(); // API key is valid, proceed to the next middleware/route
  } else {
    res.status(401).json({ message: "Unauthorized: Invalid API key" });
  }
}
