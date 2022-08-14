import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import AddIcon from 'svg/Add';
import DeleteIcon from 'svg/Delete';
import EditIcon from 'svg/Edit';
import DropDown from './DropDown';
import Search from './Search';


const Table = ({
    withAdd,
    linkAdd,
    withDropDown,
    withSearch,
    withEdit,
    withDelete,
    data,
    withDetail,
}) => {
    const location = useLocation();
    const { deleteAccountType, searchData, setDetail, deleteSearchData, deleteTransaction } = useStoreActions(state => state);
    const { dataSearch } = useStoreState(state => state);
    const [searchValue, setSearchValue] = useState("");
    const [filterValue, setFilterValue] = useState("");

    const onChangeSearch = (value) => {
        setSearchValue(value)
    }
    const onChangeFilter = (value) => {
        setFilterValue(value)
    }

    const applyHandler = () => {
        searchData({
            search: searchValue,
            filter: filterValue,
            toggle: location.pathname.includes('detail-account') ? true : false
        })
    }

    const holder = withDetail ? "Search for detail" : "Search for name"

    return (
        <div>
            <div className="flex justify-between items-center pb-4">
                <div className="flex items-center">
                    {
                        withSearch &&
                        <Search onChangeSearch={onChangeSearch} value={searchValue} dynamicPlaceholder={holder} />
                    }
                    {/* Dropdown Filter Bisa di pasang list dynamic, tapi karena cuman 2 jadi di static aja biar cepet*/}
                    <div className="flex space-x-4">
                        {
                            withDropDown &&
                            <DropDown onChangeFilter={onChangeFilter} value={filterValue} />
                        }
                        {
                            (withSearch || withDropDown) &&
                            <>
                                <button onClick={() => applyHandler()} type="button" className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                    Apply
                                </button>
                                {
                                    dataSearch.length > 0 &&
                                    <button onClick={() => deleteSearchData()} type="button" className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        Reset
                                    </button>}
                            </>
                        }
                    </div>
                </div>
                {
                    withAdd &&
                    <Link to={linkAdd}>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center space-x-4">
                            <AddIcon />
                        </button>
                    </Link>
                }
            </div>
            <div className='overflow-x-auto relative shadow-md sm:rounded-lg'>
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                            </th>
                            {
                                withDetail ? (
                                    <>
                                        <th scope="col" className="py-3 px-6" key='Create'>
                                            <div className="flex items-center">
                                                Created Date
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-6" key='Detail'>
                                            <div className="flex items-center">
                                                Detail
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-6" key='Transaction'>
                                            <div className="flex items-center">
                                                Transaction
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-6" key='Type'>
                                            <div className="flex items-center">
                                                Type
                                            </div>
                                        </th>
                                    </>
                                ) : (
                                    <>
                                        <th scope="col" className="py-3 px-6" key='account'>
                                            <div className="flex items-center">
                                                Account
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-6" key='type'>
                                            <div className="flex items-center">
                                                Type
                                            </div>
                                        </th>
                                        <th scope="col" className="py-3 px-6" key='balance'>
                                            <div className="flex items-center">
                                                Balance
                                            </div>
                                        </th>
                                    </>
                                )
                            }
                            {
                                (withAdd || withDelete) &&
                                <th scope="col" className="py-3 px-6">
                                    Action
                                </th>
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data &&
                            (withDetail ?
                                data.map((el, i) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={`key-${el.detail}-${i}`}>
                                        <td className="p-4 w-4"></td>
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {el.createAt}
                                        </th>
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                            {el.detail}
                                        </th>
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(el.transaction)}
                                        </th>
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white ">
                                            {el.type_transaction}
                                        </th>
                                        <td className="py-4 space-x-14 flex items-center">
                                            {withEdit && <Link to={`/update-transaction/${el.id}`}><div className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer items-center" ><EditIcon /></div></Link>}
                                            {withDelete && <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer items-center" onClick={() => deleteTransaction(el.id)}><DeleteIcon /></div>}
                                        </td>
                                    </tr>
                                ))
                                :
                                data.map((el, i) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={`key-${el.account}`}>
                                        <td className="p-4 w-4"></td>
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white" onClick={() => setDetail(el.id)} >
                                            <Link to={`/detail-account/${el.id}`} className="cursor-pointer">
                                                {el.account}
                                            </Link>
                                        </th>
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white " >
                                            {el.type}
                                        </th>
                                        <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white " >
                                            {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(el.balance_account)}
                                        </th>
                                        <td className="py-4 space-x-14 flex items-center">
                                            {withEdit && <Link to={`/update-account/${el.id}`}><div className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer items-center" ><EditIcon /></div></Link>}
                                            {withDelete && <div className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer items-center" onClick={() => deleteAccountType(el.id)}><DeleteIcon /></div>}
                                        </td>
                                    </tr>
                                ))
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;