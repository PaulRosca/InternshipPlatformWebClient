import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import InternshipCard, { IInternship } from "../components/InternshipCard";
import SearchCard from "../components/SearchCard";
import { ICompany } from "../context/user";
import { getInternships } from "../services";
import { ExperienceLevel } from "./AddListing";

export interface Internship {
    _id: string,
    title: string,
    salaryLower: number,
    salaryUpper: number,
    keywords: [string],
    experience: ExperienceLevel,
    closed: boolean,
    upvotes: number,
    numberOfApplicants: number,
    company: ICompany,
    createdAt: string
};
export default function Internships() {
    const [internships, setInternships] = useState<Internship[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await getInternships({ sort: "date:desc" });
            setInternships(response);
        })();
    }, []);
    return (
        <div className="w-full flex justify-center py-10">
            <div className="w-1/4 pl-6">
                <SearchCard setInternships={setInternships} />
            </div>
            <div className="w-3/4 px-4">
                {
                    internships.map((is, index) => {
                        return (<InternshipCard key={`internship_${index}`} internship={is as IInternship} handleClick={() => { navigate(`/internship/${is._id}`) }} />)
                    })
                }
            </div>
        </div>
    )
};
