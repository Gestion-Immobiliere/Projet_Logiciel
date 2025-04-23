// middlewares/authMiddleware.js
import jwt from "jsonwebtoken"

export const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: "Token requis" })

  const token = authHeader.split(" ")[1]
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded // { id, role }
    next()
  } catch (err) {
    return res.status(401).json({ message: "Token invalide" })
  }
}

export const checkRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Accès interdit" })
    }
    next()
  }
}
