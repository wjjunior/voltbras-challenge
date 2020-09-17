// massa
export async function asyncPool<T>(poolLimit: number, array: number[], iteratorFn: (n: number) => Promise<T>): Promise<T[]> {
  const ret = []
  const executing = []
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item))
    ret.push(p)

    if (poolLimit <= array.length) {
      const e = p.then(() => executing.splice(executing.indexOf(e), 1))
      executing.push(e)
      if (executing.length >= poolLimit) {
        await Promise.race(executing)
      }
    }
  }
  return Promise.all(ret)
}
