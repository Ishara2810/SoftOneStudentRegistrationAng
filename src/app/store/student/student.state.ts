import { StudentModel } from "../models/student.model";

export const StudentState: StudentModel = {
    list: [],
    errorMessage: "",
    studentObj: {
        id: 0,
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        nic: "",
        dateOfBirth: "",
        address: "",
        imgPath: "",
    },
    lastUpdatedObj: {
        id: 0,
        firstName: "",
        lastName: "",
        mobileNo: "",
        email: "",
        nic: "",
        dateOfBirth: "",
        address: "",
        imgPath: "",
    }
}