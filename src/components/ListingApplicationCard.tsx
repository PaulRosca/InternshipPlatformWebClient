import { ContactMethod } from "../context/user";
import moment from "moment";


interface IApplicant {
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    contactMethod: ContactMethod
};

export interface IApplication {
    createdAt: string,
    applicant: IApplicant,
    comment?: string
};

type IProps = {
    application: IApplication
};
export default function ApplicationCard({ application: { createdAt, comment, applicant } }: IProps) {
    return (
        <div className="w-full rounded overflow-hidden shadow-lg">
            <div className="px-6 py-4">
                <div className="flex justify-between">
                    <div className="font-bold text-xl mb-2">{applicant.firstName + " " + applicant.lastName}</div>
                    <div className="flex justify-center items-center text-gray-500 font-semibold">{moment(createdAt).fromNow()}</div>
                </div>
                <div className='flex justify-between pt-3'>
                    <div className="flex w-1/3 flex-col justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
                        </svg>
                        {applicant.email}
                    </div>
                    {
                        applicant.phone && (
                            <div className="flex w-1/3 flex-col justify-center items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                                </svg>

                                {applicant.phone}
                            </div>
                        )
                    }
                    <div className="flex w-1/3 flex-col justify-center items-center">
                        <span className="font-bold font-lg text-indigo-600">Contact Method</span>
                        {applicant.contactMethod}
                    </div>

                </div>
            </div>
            {
                comment && (
                    <div className="px-6">
                        <textarea readOnly rows={3} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight" style={{ resize: 'none' }} placeholder="Additional comments..."
                            value={comment}
                        />

                    </div>
                )
            }
        </div>
    )
};
