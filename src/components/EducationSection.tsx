import { Education } from "../pages/GenerateCV"

export interface IPropsEducation {
    removeItem: (param: number) => void,
    updateItem: (param: number, education: Education) => void,
    index: number,
    education: Education
};
export default function EducationSection({ removeItem, updateItem, index, education }: IPropsEducation) {
    return (
        <>
            <div className="shadow-xl border rounded mb-5">
                <div className="flex justify-end py-2 px-4">
                    <button onClick={() => removeItem(index)} type="button">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            className="w-3 h-3 sm:h-4 sm:w-4 ml-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                            viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 px-4">
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Title of qualification awarded
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-qualification" type="text"
                            value={education.qualification} onChange={(e) => updateItem(index, { ...education, qualification: e.target.value })}
                        />
                    </div>
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Institution
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-institution" type="text"
                            value={education.institution} onChange={(e) => updateItem(index, { ...education, institution: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 px-4">
                    <div className="w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Country
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-country" type="text"
                            value={education.country} onChange={(e) => updateItem(index, { ...education, country: e.target.value })}
                        />
                    </div>
                    <div className="w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            County
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-county" type="text"
                            value={education.county} onChange={(e) => updateItem(index, { ...education, county: e.target.value })}
                        />
                    </div>
                    <div className="w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            City
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-city" type="text"
                            value={education.city} onChange={(e) => updateItem(index, { ...education, city: e.target.value })}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center items-center pb-5">
                    <div className="relative">
                        <input name="start" type="date" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" placeholder="Select date start"
                            value={education.from} onChange={(e) => updateItem(index, { ...education, from: e.target.value })}
                        />
                    </div>
                    <span className="mx-4 text-gray-500">to</span>
                    <div className="relative">
                        <input name="end" type="date" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" placeholder="Select date end"
                            value={education.to} onChange={(e) => updateItem(index, { ...education, to: e.target.value })}
                        />
                    </div>
                </div>

            </div>
        </>
    )
}
