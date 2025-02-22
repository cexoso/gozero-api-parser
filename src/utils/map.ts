// 类型重载声明
export function map<T, U>(
  collection: T[] | null | undefined,
  iteratee: (value: T, index: number, collection: T[]) => U
): U[]

export function map<T extends object, U>(
  collection: T | null | undefined,
  iteratee: (value: T[keyof T], key: string, collection: T) => U
): U[]

// 函数实现
export function map(collection: any, iteratee: (value: any, key: any, collection: any) => any): any[] {
  if (collection == null) return []

  if (Array.isArray(collection)) {
    return collection.map((value, index) => iteratee(value, index, collection))
  }

  return Object.keys(collection).map((key) => iteratee(collection[key], key, collection))
}
