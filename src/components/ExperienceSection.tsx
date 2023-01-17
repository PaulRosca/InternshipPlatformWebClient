import { Experience } from "../pages/GenerateCV"

export interface IPropsExperience {
    removeItem: (param: number) => void,
    updateItem: (param: number, experience: Experience) => void,
    index: number,
    experience: Experience
};
export default function ExperienceSection({ removeItem, updateItem, index, experience }: IPropsExperience) {
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
                            Position
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-position" type="text"
                            value={experience.position} onChange={(e) => updateItem(index, { ...experience, position: e.target.value })}
                        />
                    </div>
                    <div className="w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Company
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-company" type="text"
                            value={experience.company} onChange={(e) => updateItem(index, { ...experience, company: e.target.value })}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6 px-4">
                    <div className="w-full px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Country
                        </label>
                        <textarea rows={5} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-country"
                            value={experience.details} onChange={(e) => updateItem(index, { ...experience, details: e.target.value })}
                        />
                    </div>
                </div>
                <div className="w-full flex justify-center items-center pb-5">
                    <div className="relative">
                        <input name="start" type="date" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" placeholder="Select date start"
                            value={experience.from} onChange={(e) => updateItem(index, { ...experience, from: e.target.value })}
                        />
                    </div>
                    <span className="mx-4 text-gray-500">to</span>
                    <div className="relative">
                        <input name="end" type="date" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" placeholder="Select date end"
                            value={experience.to} onChange={(e) => updateItem(index, { ...experience, to: e.target.value })}
                        />
                    </div>
                </div>

            </div>
        </>
    );
};
