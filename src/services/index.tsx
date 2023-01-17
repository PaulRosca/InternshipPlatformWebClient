import axios from 'axios';
import { IApplicant, ICompany } from '../context/user';
import { InternshipDetails } from '../pages/Internship';
import { Internship } from '../pages/Internships';
import { IApplication } from '../pages/MyApplications';

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

export const addListing = async (data: any) => {
    const response = await axios.post("/internships/addListing", data, { withCredentials: true })
    return response.data.listing;
};

export interface IQueryParams {
    sort?: string,
    title?: string,
    keywords?: string[]
};

export const getInternships = async (queryParams: IQueryParams): Promise<Internship[]> => {
    const response = await axios.get("/internships", {
        withCredentials: true, params: {
            sort: queryParams?.sort,
            title: queryParams?.title,
            keywords: queryParams?.keywords
        }
    });
    return response.data.internships;
};

export const getInternshipDetails = async (id: string | undefined): Promise<InternshipDetails> => {
    const response = await axios.get(`/internships/details/${id}`, { withCredentials: true });
    return response.data;
};

export const applyToInternship = async (id: string | undefined, comment?: string): Promise<void> => {
    await axios.post(`/internships/apply/${id}`, { comment: comment && comment.trim() !== "" ? comment : undefined }, { withCredentials: true });
};

export const likeInternship = async (id: string | undefined): Promise<void> => {
    await axios.post(`/internships/like/${id}`, null, { withCredentials: true });
};

export const dislikeInternship = async (id: string | undefined): Promise<void> => {
    await axios.post(`/internships/dislike/${id}`, null, { withCredentials: true });
};

export const getMyApplications = async (): Promise<IApplication[]> => {
    const response = await axios.get("/internships/myApplications", { withCredentials: true });
    return response.data.applications;
};

export const getMyListings = async (): Promise<Internship[]> => {
    const response = await axios.get("/internships/myListings", { withCredentials: true });
    return response.data.listings;
};

export const closeListing = async (id: string | undefined): Promise<void> => {
    await axios.post(`/internships/close/${id}`, null, { withCredentials: true });
};
