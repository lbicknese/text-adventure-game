import * as uuid from 'uuid'
export default class GameTemplate {
  id: string
  name = ''
  description = ''
  created: Date

  constructor () {
    this.id = uuid.v4()
    this.created = new Date()
  }
}
