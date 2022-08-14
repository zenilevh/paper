/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import Table from 'components/Table';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Link, useParams } from 'react-router-dom';


const DetailTransaction = () => {
    const { account, detailAccount, dataSearch } = useStoreState(state => state)
    const { setDetail } = useStoreActions(state => state)
    const [dataDetail, setDataDetail] = useState({})
    const [transaction, setTransaction] = useState([])
    const { id } = useParams()
    const objChecker = Object.keys(account).length
    const objCheckerDetail = Object.keys(detailAccount).length
    useEffect(() => {
        if (objChecker) {
            const filteringDetail = account.account_type.filter(account => account.id === Number(id));
            setDetail(filteringDetail[0])
        }
    }, [objChecker]);

    useEffect(() => {
        if (detailAccount) setDataDetail(detailAccount)
    }, [detailAccount]);

    useEffect(() => {
        if (dataSearch.length > 0) {
            setTransaction(dataSearch)
        } else {
            setTransaction(detailAccount.transactions)
        }
    }, [dataSearch, objCheckerDetail, detailAccount]);


    if (!dataDetail) return <div></div>



    return (
        <div className="w-full h-full flex-col container mx-auto">
            <Link to="/">
                <button type="button" className="inline-flex justify-center py-1 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                    Back
                </button>
            </Link>
            <div className="w-full shadow-md border rounded-sm mb-8 mt-2 p-4">
                <div className="flex justify-between">
                    <div>
                        <span className="font-bold">Type : </span>{dataDetail.type}
                    </div>
                    <div>
                        <span className="font-bold">Account : </span>{dataDetail.account}
                    </div>
                    <div>
                        <span className="font-bold">Balance : </span> {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(dataDetail.balance_account)}
                    </div>
                </div>

            </div>

            <Table data={transaction} withDetail withAdd withDelete withEdit withDropDown linkAdd={`/add-transaction/${dataDetail.id}`} />
        </div>
    )
}

export default DetailTransaction;