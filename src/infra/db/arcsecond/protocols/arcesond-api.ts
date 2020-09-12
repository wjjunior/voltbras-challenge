export interface ArcsecondApiRepository {
  getRequest: (uri: string) => Promise<any>
}
