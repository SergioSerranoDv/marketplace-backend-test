import jwt from "jsonwebtoken"
declare global {
  namespace Express {
    interface Request {
      payload: any
    }
  }
}
export class Authentication {
  static async veirifyToken(req: any, res: any, next: any) {
    const tokenAuthorization = req.headers.authorization
    if (!tokenAuthorization) return res.status(403).json({ message: "Unauthorized" })
    try {
      const token = tokenAuthorization.split(" ")[1]
      const payload = jwt.verify(token, process.env.JWT_SECRET as string)
      req.payload = payload
      return next()
    } catch (error) {
      return res.status(403).json({ message: "Unauthorized" })
    }
  }
  static async generateToken(payload: any) {
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, { expiresIn: "1h" })
    return token
  }
  static async verifyTokenApi(req: any, res: any) {
    const tokenAuthorization = req.headers.authorization
    if (!tokenAuthorization) return res.status(403).json({ message: "Unauthorized" })
    try {
      const token = tokenAuthorization.split(" ")[1]
      const payload: any = await jwt.verify(token, process.env.JWT_SECRET as string)
      if (payload) {
        return res.status(200).json({
          message: "Authorized",
          data: {
            email: payload.email,
            role: payload.role,
          },
        })
      }
    } catch (error) {
      return res.status(403).json({ message: "Unauthorized" })
    }
  }
}
