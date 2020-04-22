export default class Database {
  private static instance: Database

  private db: Promise<IDBDatabase>

  private constructor () {
    this.db = new Promise((resolve, reject) => {
      const request = window.indexedDB.open('text-adventure', 1)
      request.onsuccess = (event: Event) => {
        const db = (event.target as unknown as { result: IDBDatabase }).result
        resolve(db)
      }
      request.onerror = (event: Event) => {
        reject(event)
      }
      request.onupgradeneeded = this.onUpgrade.bind(this)
    })
  }

  public static getInstance (): Database {
    if (!Database.instance) {
      Database.instance = new Database()
    }
    return Database.instance
  }

  private onUpgrade (event: IDBVersionChangeEvent) {
    const db = (event.target as unknown as { result: IDBDatabase }).result
    const templatesStore = db.createObjectStore('templates', { keyPath: 'id' })
    templatesStore.createIndex('name', 'name', { unique: true })
    templatesStore.createIndex('description', 'description', { unique: false })
  }

  public query<T> (storeName: string): Promise<T[]> {
    return this.db.then(_db => {
      return new Promise<T[]>((resolve, reject) => {
        if (!this.db) {
          reject(new Error('Db not open'))
          return
        }
        const results: T[] = []
        const store = _db.transaction(storeName, 'readonly').objectStore(storeName)
        store.openCursor().onsuccess = (event: Event): void => {
          const cursor = (event.target as unknown as { result: IDBCursor }).result
          if (cursor) {
            results.push((cursor as unknown as { value: T }).value)
            cursor.continue()
          } else {
            resolve(results)
          }
        }
      })
    })
  }

  public get<T> (storeName: string, key: string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey | IDBKeyRange): Promise<T> {
    return this.db.then(_db => {
      return new Promise((resolve, reject) => {
        const transaction = _db.transaction(storeName, 'readonly')
        let result: T
        transaction.onerror = (event: Event) => {
          reject(event)
        }
        transaction.oncomplete = () => {
          resolve(result)
        }
        const request = transaction.objectStore(storeName).get(key)
        request.onsuccess = (event: Event) => {
          result = (event.target as unknown as { result: T }).result
        }
      })
    })
  }

  public create<T, R> (storeName: string, value: T): Promise<R> {
    return this.db.then(_db => {
      return new Promise((resolve, reject) => {
        if (!this.db) {
          reject(new Error('Db not open'))
          return
        }
        const transaction = _db.transaction([storeName], 'readwrite')
        let result: R

        transaction.onerror = (event: Event) => {
          event.preventDefault()
          reject(event)
        }

        transaction.oncomplete = () => {
          resolve(result)
        }

        const request = transaction.objectStore(storeName).add(value)
        request.onsuccess = (event: Event) => {
          result = (event.target as unknown as { result: R }).result
        }
      })
    })
  }

  public update<T> (storeName: string, value: T): Promise<void> {
    return this.db.then(_db => {
      return new Promise((resolve, reject) => {
        if (!this.db) {
          reject(new Error('Db not open'))
          return
        }
        const transaction = _db.transaction([storeName], 'readwrite')

        transaction.onerror = (event: Event) => {
          event.preventDefault()
          reject(event)
        }

        transaction.oncomplete = () => {
          resolve()
        }

        const request = transaction.objectStore(storeName).put(value)
      })
    })
  }

  public delete (storeName: string, key: string | number | Date | ArrayBufferView | ArrayBuffer | IDBArrayKey | IDBKeyRange): Promise<void> {
    return this.db.then(_db => {
      return new Promise((resolve, reject) => {
        if (!this.db) {
          reject(new Error('Db not open'))
          return
        }
        const transaction = _db.transaction([storeName], 'readwrite')

        transaction.onerror = (event: Event) => {
          event.preventDefault()
          reject(event)
        }

        transaction.oncomplete = () => {
          resolve()
        }

        const request = transaction.objectStore(storeName).delete(key)
      })
    })
  }
}
