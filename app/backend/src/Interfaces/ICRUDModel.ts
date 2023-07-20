export interface ICRUDModelCreator<T> {
  create(data: Partial<T>): Promise<T>,
}

export interface ICRUDModelReader<T> {
  findAll?(): Promise<T[]>,
  findOne?(email: string): Promise<T | null>,
}

export interface ICRUDModelInProgress<T> {
  findInProgress(inProgress: boolean): Promise<T[]>,
}

export interface ICRUDModelUpdater<T> {
  update(id: number, data: Partial<T>): Promise<T | null>,
}

export interface ICRUDModelDeleter {
  delete(id: number): Promise<number>,
}

export interface ICRUDModel<T>
  extends ICRUDModelCreator<T>, ICRUDModelReader<T>, ICRUDModelInProgress<T>, ICRUDModelUpdater<T>,
  ICRUDModelDeleter { }
