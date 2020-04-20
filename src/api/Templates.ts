import Database from './Database'
import GameTemplate from '@/models/GameTemplate'

export default class Templates {
  public static query (): Promise<GameTemplate[]> {
    return Database.getInstance().query<GameTemplate>('templates')
  }

  public static create (value: GameTemplate): Promise<string> {
    return Database.getInstance().create<GameTemplate, string>('templates', value)
  }

  public static get (key: string): Promise<GameTemplate> {
    return Database.getInstance().get<GameTemplate>('templates', key)
  }

  public static update (value: GameTemplate): Promise<void> {
    return Database.getInstance().update<GameTemplate>('templates', value)
  }

  public static delete (key: string): Promise<void> {
    return Database.getInstance().delete('templates', key)
  }
}
