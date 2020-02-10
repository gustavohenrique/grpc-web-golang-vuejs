import bus from '../libs/bus'
import { events, TOKEN_KEY } from '../constants'
import { Account, Nothing, User } from '../../proto/accounts_pb'
import { AccountServicePromiseClient } from '../../proto/accounts_grpc_web_pb'

const getMetadata = () => {
  return {
    [TOKEN_KEY]: localStorage.getItem(TOKEN_KEY)
  }
}

const deps = {
  bus,
  events,
  tokenKey: TOKEN_KEY,
  getMetadata,
  proto: {
    Account,
    Nothing,
    User,
    AccountClient: AccountServicePromiseClient
  }
}

const requireFile = require.context(
  '../services',
  false,
  /[\w-]+\.js$/
)

const services = {}
requireFile.keys().forEach(fileName => {
  const config = requireFile(fileName)
  const name = fileName
    .replace(/^\.\//, '')
    .replace(/^\.\/_/, '')
    .replace(/\.\w+$/, '')
  const Service = config.default || config
  services[name] = new Service(deps)
})

export default ({ Vue }) => {
  Vue.prototype.$service = services
}
