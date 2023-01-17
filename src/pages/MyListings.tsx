import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import InternshipCard, { IInternship } from "../components/InternshipCard";
import { getMyListings } from "../services";
import { Internship } from "./Internships"

export default function MyListings() {
    const [listings, setListings] = useState<Internship[]>([]);
    const navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const response = await getMyListings();
            setListings(response);
        })();
    }, []);
    return (
        <div className="w-full flex justify-center py-10">
            <div className="w-2/3">
                {
                    listings.map((is, index) => {
                        return (<InternshipCard key={`internship_${index}`} internship={is as IInternship} handleClick={() => { navigate(`/internship/${is._id}`) }} />)
                    })
                }
            </div>
        </div>
    )
};
