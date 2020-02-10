export default class {
  constructor (deps) {
    this.tokenKey = deps.tokenKey
    this.proto = deps.proto
    this.client = new deps.proto.AccountClient(process.env.API_URL, null, null)
  }

  async create (user) {
    const req = new this.proto.User()
    req.setEmail(user.email.trim().toLowerCase())
    req.setPassword(user.password.trim())
    const res = await this.client.create(req, {})
    return res.getEmail()
  }

  async authenticateByEmailAndPassword (user) {
    const req = new this.proto.User()
    req.setEmail(user.email.trim().toLowerCase())
    req.setPassword(user.password.trim())
    const res = await this.client.authenticateByEmailAndPassword(req, {})
    const token = res.getToken()
    localStorage.setItem(this.tokenKey, token)
    return token
  }

  async changePassword (user) {
    const req = new this.proto.User()
    req.setEmail(user.email.trim().toLowerCase())
    req.setPassword(user.password.trim())
    await this.client.create(req, {})
  }

  logout () {
    localStorage.removeItem(this.tokenKey)
  }
}
