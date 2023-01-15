import axios from 'axios';
import { IApplicant, ICompany } from '../context/user';

axios.defaults.baseURL = "http://localhost:9000";

type loginData = {
    email: string,
    password: string
}

export const logout = async (): Promise<void> => {
    await axios.post("/users/logout");
    localStorage.removeItem("user");
};

export const login = async (data: loginData): Promise<ICompany | IApplicant> => {
    const response = await axios.post("/users/login", data, { withCredentials: true });
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data.user;
};

export const register = async (data: IApplicant | ICompany): Promise<ICompany | IApplicant> => {
    let response;
    if (data.type === "applicant") {
        response = await axios.post("/users/register/applicant", { ...data, }, { withCredentials: true });
    }
    else {
        response = await axios.post("/users/register/company", { ...data, }, { withCredentials: true });
    }
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return response.data.user;
};
