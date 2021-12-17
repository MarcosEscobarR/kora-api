
export interface ICrud {
    getAll()
    getById(id: number) 
    Create(creationModel: any)
    Update(id: number, updateModel: any)
    delete(id: number)
}