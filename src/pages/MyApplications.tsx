import { useEffect, useState } from "react"
import { getMyApplications } from "../services";
import ApplicationCard from "../components/ApplicationCard";
import { IInternship } from "../components/InternshipCard";

export interface IApplication {
    listing: IInternship,
    comment?: string
}
export default function MyApplications() {
    const [applications, setApplications] = useState<IApplication[]>([]);
    useEffect(()=>{
        (async()=>{
            const response = await getMyApplications();
            setApplications(response);
        })();
    },[]);
    return (
        <div className="w-full flex flex-col justify-center items-center py-10">
            {
                applications.map((app, index)=><ApplicationCard key={`application_${index}`} internship={app.listing} comment={app.comment}/>)
            }
        </div>
    )
};
