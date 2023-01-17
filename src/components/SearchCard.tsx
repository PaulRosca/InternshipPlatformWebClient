import { useState, KeyboardEvent, Dispatch, SetStateAction } from "react";
import { Internship } from "../pages/Internships";
import { getInternships, IQueryParams } from "../services";

export type IPropsSearchCard = {
    setInternships: Dispatch<SetStateAction<Internship[]>>
}
export default function SearchCard({ setInternships }: IPropsSearchCard) {
    const [title, setTitle] = useState<string>("");
    const [keyword, setKeyword] = useState<string>("");
    const [keywords, setKeywords] = useState<string[]>([] as string[]);
    const [sort, setSort] = useState<string>("date:desc");
    const handleKeypress = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setKeyword("");
            setKeywords((kws) => {
                return [...kws, keyword];
            })
        }
    };

    const handleSearch = async() => {
        const params: IQueryParams = {
            sort,
            title,
            keywords
        }
        const response = await getInternships(params);
        setInternships(response);
    };

    return (
        <div className="w-full shadow-sm border rounded">
            <div className="px-3 pt-2 pb-4 font-semibold text-xl flex justify-center">
                Seach and Filter
            </div>
            <div className="px-3 md:flex md:items-center mb-6">
                <div className="w-2/6">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="title">
                        Title
                    </label>
                </div>
                <div className="w-full">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="title" type="text"
                           value={title} onChange={(e)=>setTitle(e.target.value)}
                    />
                </div>
            </div>
            <div className="px-3 md:flex md:items-center mb-6">
                <div className="w-2/6">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="sortingMethod">
                        Sorting
                    </label>
                </div>
                <div className="w-full">
                    <select className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" id="sortingMethod"
                            value={sort} onChange={(e)=>setSort(e.target.value)}
                    >

                        <option value="date:desc">Date descending</option>
                        <option value="date:asc">Date ascending</option>
                        <option value="salary:desc">Salary descending</option>
                        <option value="salary:asc">Salary ascending</option>
                        <option value="applicants:desc">Applicants descending</option>
                        <option value="applicants:asc">Applicants ascending</option>
                    </select>
                </div>
            </div>
            <div className="px-3 md:flex md:items-center mb-6">
                <div className="w-2/6">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4">
                        Tags
                    </label>
                </div>

                <div className="w-full">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-indigo-600" type="text"
                        placeholder="Add a tag..."
                        value={keyword} onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleKeypress}
                    />
                </div>
            </div>
            <div className='px-5 my-3 flex flex-wrap -m-1'>
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
            <div className="px-3 pb-3">
                <button className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    )
};
