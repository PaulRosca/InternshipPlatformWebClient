import { useContext, useState } from "react";
import EducationSection from "../components/EducationSection";
import ExperienceSection from "../components/ExperienceSection";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import { TDocumentDefinitions } from "pdfmake/interfaces";
import { UserContext, IApplicant } from "../context/user";

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
    'Roboto': {
        normal: 'Roboto-Regular.ttf',
        bold: 'Roboto-Medium.ttf',
        italics: 'Roboto-Italic.ttf',
        bolditalics: 'Roboto-Italic.ttf'
    }
};

type Gender = "male" | "female" | "other";
export interface Education {
    qualification: string,
    institution: string,
    country: string,
    county: string,
    city: string,
    from: string,
    to: string
};

export interface Experience {
    position: string,
    company: string,
    from: string,
    to: string,
    details: string
};
interface ICVData {
    nationality: string,
    gender: Gender,
    dob: string,
    description: string,
    education: Education[],
    experience: Experience[]
};
export default function GenerateCV() {
    const [CVData, setCVData] = useState<ICVData>({
        nationality: "",
        gender: "male",
        dob: "",
        description: "",
        education: [],
        experience: []
    });

    const { user } = useContext(UserContext);

    const generateCV = (e: any) => {
        e.preventDefault();
        const personalInformation: any = [
            {
                text: "Personal Information",
                alignment: "left",
                fontSize: 15,
                bold: true,
                margin: 10
            },
            {
                text: `First Name: ${(user as IApplicant).firstName}`,
                fontSize: 10,
                margin: 5
            },
            {
                text: `Last Name: ${(user as IApplicant).lastName}`,
                fontSize: 10,
                margin: 5
            },
            {
                text: `Gender: ${CVData.gender}`,
                fontSize: 10,
                margin: 5
            },
            {
                text: `Nationality: ${CVData.nationality}`,
                fontSize: 10,
                margin: 5
            },
            {
                text: `Date of birth: ${CVData.dob}`,
                fontSize: 10,
                margin: 5
            },
        ];
        if (CVData.description && CVData.description.trim() !== "") {
            personalInformation.push({
                text: `Description: ${CVData.description}`,
                fontSize: 10,
                margin: 5
            });
        }

        const contactInformation: any = [
            {
                text: "Contact information",
                alignment: "left",
                fontSize: 15,
                bold: true,
                margin: 10
            },
            {
                text: `Preferred contact method: ${(user as IApplicant).contactMethod}`,
                fontSize: 10,
                margin: 5
            },
            {
                text: `Email: ${(user as IApplicant).email}`,
                fontSize: 10,
                margin: 5
            }
        ];

        const educationInformation: any = [
            {
                text: "Education",
                alignment: "left",
                fontSize: 15,
                bold: true,
                margin: 10
            }
        ];
        CVData.education.forEach((ed) => {
            educationInformation.push({
                text: ed.qualification,
                fontSize: 13,
                bold: true,
                margin: 10
            });
            educationInformation.push({
                text: `Institution: ${ed.institution}`,
                fontSize: 10,
                margin: 5
            });
            educationInformation.push({
                text: `From ${ed.from} to ${ed.to}`,
                fontSize: 10,
                margin: 5
            });
            educationInformation.push({
                columns: [
                    {
                        text: `Country: ${ed.country}`,
                        fontSize: 10,
                        margin: 5
                    },
                    {
                        text: `County: ${ed.county}`,
                        fontSize: 10,
                        margin: 5
                    },
                    {
                        text: `City: ${ed.city}`,
                        fontSize: 10,
                        margin: 5
                    },
                ]
            });
        })


        const workExperienceInformation: any = [
            {
                text: "Work experience",
                alignment: "left",
                fontSize: 15,
                bold: true,
                margin: 10
            }
        ];
        CVData.experience.forEach((xp) => {
            workExperienceInformation.push({
                text: xp.position,
                fontSize: 13,
                bold: true,
                margin: 10
            })
            workExperienceInformation.push({
                text: xp.company,
                fontSize: 10,
                margin: 5
            })
            workExperienceInformation.push({
                text: `From ${xp.from} to ${xp.to}`,
                fontSize: 10,
                margin: 5
            });
            workExperienceInformation.push({
                text: xp.details,
                fontSize: 10,
                margin: 5
            })
        })
        if ((user as IApplicant).phone) {
            contactInformation.push({
                text: `Phone: ${(user as IApplicant).phone}`,
                fontSize: 10,
                margin: 5
            })
        }
        const docDef: TDocumentDefinitions = {
            pageSize: 'A4',
            content: [
                {
                    svg: `<svg fill="#000000" height="200px" width="200px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 435.926 435.926" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M434.886,210.701c-1.42-2.506-4.079-4.056-6.96-4.056h-34.625v-16.208c0-4.418-3.582-8-8-8h-24.333V150.52 c0-4.418-3.582-8-8-8h-31.667v-32.281c0-4.418-3.582-8-8-8h-79.667c-4.418,0-8,3.582-8,8v32.281h-31.667c-4.418,0-8,3.582-8,8 v31.917h-24.333c-4.418,0-8,3.582-8,8v31.583h-32.333v-87.5c0-4.418-3.582-8-8-8h-96c-4.418,0-8,3.582-8,8v87.5H8 c-2.875,0-5.529,1.542-6.952,4.041c-1.423,2.498-1.396,5.568,0.071,8.04l48.63,81.985c6.023,10.034,19.391,17.601,31.093,17.601 H345.4c11.703,0,25.071-7.567,31.098-17.607l58.292-97.323C436.27,216.285,436.307,213.208,434.886,210.701z M377.301,206.645h-56 v-8.208h56V206.645z M305.301,198.437v8.314c-13.408,1.063-22.964,10.084-27.404,15.27h-36.262v-23.583H305.301z M344.968,182.437 h-64V158.52h64V182.437z M241.635,118.239h63.667v24.281h-63.667V118.239z M201.968,158.52h63v23.917h-63V158.52z M169.635,198.437 h56v23.583h-56V198.437z M25.301,142.52h80v15.417h-16c-4.418,0-8,3.582-8,8s3.582,8,8,8h16v16.25h-16c-4.418,0-8,3.582-8,8 s3.582,8,8,8h16v15.833h-80V142.52z M362.775,307.852c-3.09,5.147-11.371,9.835-17.375,9.835H80.843 c-6.003,0-14.285-4.688-17.354-9.8L22.047,238.02h91.254h168.5c2.663,0,5.176-1.361,6.662-3.571 c0.08-0.118,8.07-11.804,19.447-11.804h76.056c0.435,0.073,0.879,0.12,1.334,0.12s0.899-0.047,1.334-0.12h27.174L362.775,307.852z"></path> <path d="M65.301,157.94c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.1,0.85,4.16,2.34,5.65 c1.49,1.49,3.55,2.35,5.66,2.35c2.11,0,4.17-0.86,5.66-2.35c1.49-1.49,2.34-3.55,2.34-5.65c0-2.11-0.85-4.17-2.34-5.66 C69.471,158.79,67.411,157.94,65.301,157.94z"></path> <path d="M41.631,157.94c-2.1,0-4.17,0.85-5.65,2.34c-1.49,1.49-2.35,3.55-2.35,5.66c0,2.1,0.86,4.16,2.35,5.65 c1.49,1.49,3.55,2.35,5.65,2.35c2.11,0,4.17-0.86,5.66-2.35c1.49-1.49,2.34-3.55,2.34-5.65c0-2.11-0.85-4.17-2.34-5.66 C45.801,158.79,43.741,157.94,41.631,157.94z"></path> <path d="M65.301,190.19c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.1,0.85,4.16,2.34,5.65 c1.49,1.49,3.55,2.35,5.66,2.35c2.11,0,4.17-0.86,5.66-2.35c1.49-1.49,2.34-3.55,2.34-5.65c0-2.11-0.85-4.17-2.34-5.66 C69.471,191.04,67.411,190.19,65.301,190.19z"></path> <path d="M41.631,190.19c-2.1,0-4.16,0.85-5.65,2.34c-1.49,1.49-2.35,3.55-2.35,5.66c0,2.1,0.86,4.16,2.35,5.65 c1.49,1.49,3.55,2.35,5.65,2.35c2.11,0,4.17-0.86,5.66-2.35c1.49-1.49,2.34-3.55,2.34-5.65c0-2.11-0.85-4.17-2.34-5.66 C45.801,191.04,43.741,190.19,41.631,190.19z"></path> <path d="M121.481,254.27c-2.1,0-4.16,0.85-5.65,2.34c-1.49,1.49-2.35,3.55-2.35,5.66c0,2.1,0.86,4.17,2.35,5.66 c1.48,1.49,3.55,2.34,5.65,2.34c2.11,0,4.17-0.85,5.66-2.34c1.49-1.49,2.34-3.55,2.34-5.66c0-2.11-0.85-4.17-2.34-5.66 C125.651,255.121,123.591,254.27,121.481,254.27z"></path> <path d="M153.551,254.27c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.11,0.85,4.17,2.34,5.66 c1.49,1.49,3.56,2.34,5.66,2.34c2.11,0,4.17-0.85,5.66-2.34c1.49-1.49,2.34-3.55,2.34-5.66c0-2.11-0.85-4.17-2.34-5.66 C157.721,255.121,155.661,254.27,153.551,254.27z"></path> <path d="M185.621,254.27c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.56-2.34,5.66s0.85,4.17,2.34,5.66 c1.49,1.49,3.55,2.34,5.66,2.34c2.1,0,4.16-0.85,5.65-2.34c1.49-1.49,2.35-3.56,2.35-5.66s-0.86-4.17-2.35-5.66 C189.781,255.121,187.721,254.27,185.621,254.27z"></path> <path d="M217.681,254.27c-2.1,0-4.17,0.85-5.65,2.34c-1.49,1.49-2.35,3.55-2.35,5.66c0,2.11,0.86,4.17,2.35,5.66 c1.48,1.49,3.55,2.34,5.65,2.34c2.11,0,4.17-0.85,5.66-2.34c1.49-1.49,2.34-3.55,2.34-5.66c0-2.11-0.85-4.17-2.34-5.66 C221.851,255.121,219.791,254.27,217.681,254.27z"></path> <path d="M249.751,254.27c-2.1,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.11,0.85,4.17,2.34,5.66 c1.49,1.49,3.56,2.34,5.66,2.34c2.11,0,4.17-0.85,5.66-2.34c1.49-1.49,2.34-3.55,2.34-5.66c0-2.11-0.85-4.17-2.34-5.66 C253.921,255.121,251.861,254.27,249.751,254.27z"></path> <path d="M281.821,254.27c-2.11,0-4.17,0.85-5.66,2.34c-1.49,1.49-2.34,3.55-2.34,5.66c0,2.11,0.85,4.17,2.34,5.66 c1.49,1.49,3.55,2.34,5.66,2.34c2.1,0,4.16-0.85,5.65-2.34c1.49-1.49,2.35-3.55,2.35-5.66c0-2.11-0.86-4.17-2.35-5.66 C285.981,255.121,283.921,254.27,281.821,254.27z"></path> </g> </g></svg>`,
                    fit: [120, 80],
                    alignment: 'right'
                },
                {
                    columns: [
                        [
                            ...personalInformation,
                        ],
                        [
                            ...contactInformation,
                        ]
                    ]
                },
                ...educationInformation,
                ...workExperienceInformation
            ],
        };
        pdfMake.createPdf(docDef).download();
    };

    const removeEducationItem = (index: number) => {
        setCVData((prevData: ICVData) => {
            const prevDataCopy = { ...prevData, education: [...prevData.education] };
            prevDataCopy.education.splice(index, 1);
            return prevDataCopy;
        })
    };

    const updateEducationItem = (index: number, newValue: Education) => {
        setCVData((prevData: ICVData) => {
            const prevDataCopy = { ...prevData, education: [...prevData.education] };
            prevDataCopy.education[index] = newValue;
            return prevDataCopy;
        })

    };

    const removeExperienceItem = (index: number) => {
        setCVData((prevData: ICVData) => {
            const prevDataCopy = { ...prevData, experience: [...prevData.experience] };
            prevDataCopy.experience.splice(index, 1);
            return prevDataCopy;
        })
    };

    const updateExperienceItem = (index: number, newValue: Experience) => {
        setCVData((prevData: ICVData) => {
            const prevDataCopy = { ...prevData, experience: [...prevData.experience] };
            prevDataCopy.experience[index] = newValue;
            return prevDataCopy;
        })

    };
    return (
        <div className="w-full flex justify-center py-10">
            <form className="w-2/3" onSubmit={generateCV}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Nationality
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-nationality" type="text"
                            value={CVData.nationality} onChange={(e) => setCVData((prevData: ICVData) => {
                                return {
                                    ...prevData,
                                    nationality: e.target.value
                                }
                            })}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Gender</label>
                        <select id="gender" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={CVData.gender} onChange={(e) => setCVData((prevData: ICVData) => {
                                return {
                                    ...prevData,
                                    gender: (e.target.value) as Gender
                                }
                            })}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Date of birth
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-dob" type="date"
                            value={CVData.dob} onChange={(e) => setCVData((prevData: ICVData) => {
                                return {
                                    ...prevData,
                                    dob: e.target.value
                                }
                            })}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Description
                        </label>
                        <textarea rows={5} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description"
                            value={CVData.description} onChange={(e) => setCVData((prevData: ICVData) => {
                                return {
                                    ...prevData,
                                    description: e.target.value
                                }
                            })}
                        />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                <div className="font-bold text-xl">
                    Education
                </div>
                <div className="py-3">
                    {
                        CVData.education.map((ed, index) => <EducationSection key={`education_${index}`} index={index} removeItem={removeEducationItem} education={ed} updateItem={updateEducationItem} />)
                    }
                </div>
                <button type="button" className="flex w-1/3 items-center justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 mb-3"
                    onClick={() => setCVData((prevData: ICVData) => {
                        return {
                            ...prevData,
                            education: [
                                ...prevData.education,
                                {
                                    qualification: "",
                                    institution: "",
                                    country: "",
                                    county: "",
                                    city: "",
                                    from: "",
                                    to: ""
                                }
                            ]
                        }
                    })}
                >
                    Add education
                </button>
                <div className="font-bold text-xl">
                    Experience
                </div>
                <div className="py-3">
                    {
                        CVData.experience.map((xp, index) => <ExperienceSection key={`experience_${index}`} experience={xp} removeItem={removeExperienceItem} updateItem={updateExperienceItem} index={index} />)
                    }
                </div>
                <button type="button" className="flex w-1/3 items-center justify-center rounded-md border border-transparent bg-gray-400 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-gray-500 mb-3"
                    onClick={() => setCVData((prevData: ICVData) => {
                        return {
                            ...prevData,
                            experience: [
                                ...prevData.experience,
                                {
                                    position: "",
                                    company: "",
                                    details: "",
                                    from: "",
                                    to: ""
                                }
                            ]
                        }
                    })}
                >
                    Add experience
                </button>
                <button type="submit" className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Generate CV
                </button>
            </form>
        </div>
    )
};
