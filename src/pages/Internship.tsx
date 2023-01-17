import { Dialog, Transition } from "@headlessui/react";
import moment from "moment";
import ListingApplicationCard, { IApplication } from "../components/ListingApplicationCard";
import { Fragment, useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user";
import { applyToInternship, closeListing, dislikeInternship, getInternshipDetails, likeInternship } from "../services";
import { ExperienceLevel } from "./AddListing";

type ICompany = {
    name: string
};
export interface InternshipDetails {
    _id: string,
    title: string,
    company: ICompany,
    experience: ExperienceLevel,
    salaryLower: number,
    salaryUpper: number,
    numberOfApplicants: number,
    keywords: string[],
    createdAt: string,
    description: string,
    hasApplied: boolean,
    upvoted: boolean,
    closed: boolean,
    applications?: [object]
};



export default function Internship() {
    const params = useParams();
    const { user } = useContext(UserContext);
    const [internship, setInternship] = useState<InternshipDetails | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [comment, setComment] = useState<string>("");
    const cancelButtonRef = useRef(null);
    useEffect(() => {
        (async () => {
            const response = await getInternshipDetails(params.id);
            setInternship(response);
        })()
    }, []);

    return internship ?
        (<div className="w-full flex flex-col justify-center items-center py-10">
            <div className="w-1/2 rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="flex justify-between">
                        <div className="font-bold text-xl mb-2">{internship.title}</div>
                        <div className="flex justify-center items-center text-gray-500 font-semibold">{moment(internship.createdAt).fromNow()}</div>
                    </div>
                    <div className='flex justify-between pt-3'>
                        <div className="flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                            </svg>
                            {internship.company.name}
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
                            </svg>
                            {internship.experience}
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {`$ ${internship.salaryLower}-${internship.salaryUpper}`}
                        </div>
                        <div className="flex flex-col justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" />
                            </svg>
                            {internship.numberOfApplicants}
                        </div>
                    </div>
                </div>
                <div className="w-full px-6 flex justify-center items-center">
                    <textarea readOnly value={internship.description} rows={5} style={{ resize: 'none' }} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" />
                </div>
                <div className="px-6 pt-4 pb-2">
                    {
                        internship.keywords.map((kw, index) => (
                            <span key={`keyword_${index}`} className="inline-block bg-indigo-600 rounded-full px-3 py-1 text-sm font-semibold text-white mr-2 mb-2">{kw}</span>
                        ))
                    }
                </div>
                <div className="px-6 py-4 flex justify-between">
                    {
                        user?.type === "applicant" ?
                            (
                                <button onClick={async () => {
                                    if (internship.upvoted) {
                                        await dislikeInternship(params.id);
                                        setInternship((prevData: any) => {
                                            return {
                                                ...prevData,
                                                upvoted: false
                                            }
                                        })
                                    }
                                    else {
                                        await likeInternship(params.id);
                                        setInternship((prevData: any) => {
                                            return {
                                                ...prevData,
                                                upvoted: true
                                            }
                                        })
                                    }
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6 ${internship.upvoted ? "fill-blue-500 hover:fill-white" : "hover:fill-blue-500"} `}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                    </svg>
                                </button>
                            ) :
                            (
                                <div></div>
                            )
                    }
                    {
                        internship.closed ?
                            (
                                <div className="font-semibold text-red-500 text-lg">
                                    Closed
                                </div>
                            )
                            :
                            user?.type === "company" ?
                                (
                                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700"
                                        onClick={async () => {
                                            await closeListing(params.id);
                                            setInternship((prevData: any) => {
                                                return {
                                                    ...prevData,
                                                    closed: true
                                                };
                                            });
                                        }}
                                    >
                                        Close</button>
                                )
                                :
                                internship.hasApplied ?
                                    (
                                        <div className="font-semibold text-green-500 text-lg">
                                            Applied
                                        </div>
                                    ) :
                                    (
                                        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700"
                                            onClick={() => setOpen(true)}
                                        >
                                            Apply</button>
                                    )
                    }
                </div>
            </div>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                                    <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="text-center sm:text-left w-full">
                                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                                                    Apply to internship
                                                </Dialog.Title>
                                                <div className="mt-2 w-full">
                                                    <textarea rows={3} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" style={{ resize: 'none' }} placeholder="Additional comments..."
                                                        value={comment} onChange={(e) => setComment(e.target.value)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={async () => {
                                                await applyToInternship(params.id, comment);
                                                setOpen(false);
                                                setInternship((prevData: any) => {
                                                    return {
                                                        ...prevData,
                                                        hasApplied: true
                                                    }
                                                })
                                            }}
                                        >
                                            Apply
                                        </button>
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                            onClick={() => setOpen(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
            {
                internship.applications ?
                    (
                        <div className="w-1/2 flex flex-col items-center justify-center py-5">
                            <div className="pb-5 text-2xl font-bold">
                                Applications
                            </div>
                            {internship.applications.map((app, index)=><ListingApplicationCard key={`listing_application_${index}`} application={app as IApplication} />)}
                        </div>
                    ) :
                    (
                        <></>
                    )
            }
        </div >
        )
        :
        (
            <>
            </>
        )

}
