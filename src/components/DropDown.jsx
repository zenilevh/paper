import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const accountType = [
    { name: "Assets" },
    { name: "Expenses" },
    { name: "Liabilities" },
    { name: "Equity" },
    { name: "Reveue" },
]

const detailTransaction = [
    { name: "Debit" },
    { name: "Credit" },
]

const DropDown = ({ onChangeFilter, value }) => {
    const [toggleShow, setToggleShow] = useState(false);
    const [list, setList] = useState(accountType)
    const [headerChange, setHeaderChange] = useState('Type')
    const { id } = useParams();

    useEffect(() => {
        id && setList(detailTransaction)
        value && setHeaderChange(value)
    }, [id, value]);

    return (

        <div className='flex flex-col'>
            <button onClick={() => setToggleShow(!toggleShow)} id="dropdownRadioButton" data-dropdown-toggle="dropdownRadio" className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
                {headerChange}
                <svg className="ml-2 w-3 h-3" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {
                toggleShow &&
                <div id="dropdownRadio" className="z-10 w-48 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600 block absolute"
                    style={{ position: "absolute", margin: "0px", transform: "translate(0px, 40px)" }}
                    data-popper-reference-hidden="" data-popper-escaped="" data-popper-placement="bottom">
                    <ul className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownRadioButton">
                        {list.map((type, i) => {
                            return (
                                <li key={`${type.name}-${i}`}>
                                    <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <input id={`filter-${type.name}`}
                                            type="radio"
                                            value={type.name}
                                            name="filter-radio"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            onChange={(e) => onChangeFilter(e.target.value)}
                                        />
                                        <label htmlFor={`filter-${type.name}`} className="ml-2 w-full text-sm font-medium text-gray-900 rounded dark:text-gray-300">{type.name}</label>
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>


    )
}

export default DropDown;