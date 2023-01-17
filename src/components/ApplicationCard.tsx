import { IInternship } from "./InternshipCard";
import moment from "moment";
import { useNavigate } from "react-router-dom";

interface IProps {
    internship: IInternship,
    comment?: string
}
export default function ApplicationCard({ internship: { _id, keywords, title, createdAt, company: { name }, experience, salaryLower, salaryUpper }, comment }: IProps) {
    const navigate = useNavigate();
    return (
        <div className="w-1/2 mb-3 rounded overflow-hidden shadow-lg hover:shadow-xl hover:bg-gray-100 hover:cursor-pointer active:bg-gray-200" onClick={() => navigate(`/internship/${_id}`)}>
            <div className="px-6 py-4">
                <div className="flex justify-between">
                    <div className="font-bold text-xl mb-2">{title}</div>
                    <div className="flex justify-center items-center text-gray-500 font-semibold">{moment(createdAt).fromNow()}</div>
                </div>
                <div className='flex justify-between pt-3'>
                    <div className="flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                        </svg>
                        {name}
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                        </svg>
                        {experience}
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {`$ ${salaryLower}-${salaryUpper}`}
                    </div>
                </div>
            </div>
            {
                comment &&
                (
                    <div className="px-6">
                        <textarea readOnly rows={3} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" style={{ resize: 'none' }} placeholder="Additional comments..."
                            value={comment}
                        />
                    </div>
                )
            }
            <div className="px-6 pt-4 pb-2">
                {
                    keywords.map((kw, index) => (
                        <span key={`keyword_${_id}_${index}`} className="inline-block bg-indigo-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{kw}</span>
                    ))
                }
            </div>
        </div>
    )
};
