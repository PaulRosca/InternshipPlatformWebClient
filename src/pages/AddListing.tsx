import { KeyboardEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { addListing } from "../services";

export type ExperienceLevel = "No experience" | "0-1 years" | "1-2 years";
export default function AddListing() {
    const [title, setTile] = useState<string>("");
    const [experience, setExperience] = useState<ExperienceLevel>("No experience");
    const [description, setDescription] = useState<string>("");
    const [salaryLower, setSalaryLower] = useState<string>("");
    const [salaryUpper, setSalaryUpper] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [keywords, setKeywords] = useState<string[]>([] as string[]);
    const navigate = useNavigate();

    const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setKeyword("");
            setKeywords((kws) => {
                return [...kws, keyword];
            })
        }
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        await addListing({
            title,
            description,
            salaryLower,
            salaryUpper,
            experience,
            keywords
        });
        navigate("/");
    };

    return (
        <div className="w-full flex justify-center py-10">
            <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Title
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" id="grid-title" type="text"
                            value={title} onChange={(e) => setTile(e.target.value)}
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">Experience</label>
                        <select id="contactMethod" className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            value={experience} onChange={(e) => setExperience(e.target.value as ExperienceLevel)}
                        >
                            <option value="No experience">No experience</option>
                            <option value="0-1 years">0-1 years</option>
                            <option value="1-2 years">1-2 years</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Description
                        </label>
                        <textarea rows={5} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description"
                            value={description} onChange={(e) => setDescription(e.target.value)}
                        />
                        <p className="text-gray-600 text-xs italic">Make it as long and as crazy as you'd like</p>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="salary-lower" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Salary lower
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="text"
                                name="salary-lower"
                                id="salary-lower"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 pl-8 pr-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="0.00"
                                value={salaryLower}
                                onChange={(e) => setSalaryLower(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label htmlFor="salary-upper" className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Salary upper
                        </label>
                        <div className="relative mt-1 rounded-md shadow-sm">
                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <span className="text-gray-500 sm:text-sm">$</span>
                            </div>
                            <input
                                type="text"
                                name="salary-upper"
                                id="salary-upper"
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 pl-8 pr-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                placeholder="0.00"
                                value={salaryUpper}
                                onChange={(e) => setSalaryUpper(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div
                        className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                            Tags
                        </label>

                        <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-indigo-500" type="text"
                            placeholder="Add a tag..."
                            value={keyword} onChange={(e) => setKeyword(e.target.value)}
                            onKeyDown={handleKeypress}
                        />

                        <div className='my-3 flex flex-wrap -m-1'>
                            {
                                keywords.map((kw, index) => (
                                    <span
                                        key={`keyword_${index}`}
                                        className="m-1 flex flex-wrap justify-between items-center text-xs sm:text-sm bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded px-4 py-2 font-bold leading-loose cursor-pointer dark:text-gray-300">
                                        {kw}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setKeywords((kws) => {
                                                    const kwsCopy = [...kws];
                                                    kwsCopy.splice(index, 1);
                                                    return kwsCopy;
                                                })
                                            }}
                                            type="button"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                className="w-3 h-3 sm:h-4 sm:w-4 ml-4 text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                                                viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd"
                                                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                                    clipRule="evenodd" />
                                            </svg>
                                        </button>
                                    </span>

                                ))
                            }
                        </div>
                    </div>
                </div>
                <button type="submit" className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                    Add listing
                </button>
            </form>
        </div>
    )
};
