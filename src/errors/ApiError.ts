export class ApiError extends Error {
    status: number
    constructor(status: number, message: string){
        super(message) // Call the constructor of the parent class (Error) and pass the error message as a parameter 
        this.status = status // Set the status code
    }
}