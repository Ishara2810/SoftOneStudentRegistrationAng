export interface Student {
    id: number,
    firstName: string,
    lastName: string,
    mobileNo: string,
    email: string,
    nic: string,
    dateOfBirth: string,
    address: string,
    imgPath: string,
}

export interface StudentModel {
    list: Student[],
    studentObj: Student,
    errorMessage: string,
    lastUpdatedObj: Student,
}