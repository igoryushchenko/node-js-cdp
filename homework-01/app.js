import config from './config/config.json'
import { User, Product } from './models'

console.log(`Application name: ${config.appName}`)

const user = new User()
const product = new Product()
