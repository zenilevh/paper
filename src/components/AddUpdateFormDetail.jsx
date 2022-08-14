import { useStoreActions, useStoreState } from 'easy-peasy';
import moment from 'moment';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';

const AddUpdateFormDetail = () => {
    const history = useHistory()
    const location = useLocation()
    const { addTransaction, patchTransaction } = useStoreActions((state) => state)
    const { detailAccount } = useStoreState((state) => state)
    const { id } = useParams();
    const currentLocation = location.pathname.includes('/update-transaction')
    const [toggleUpdate, setToggleUpdate] = useState(false);
    const [form, setForm] = useState({
        id: Math.floor(Math.random() * 100) + 1,
        detail: "",
        createAt: moment().format("DD/MM/YYYY"),
        transaction: "",
        type_transaction: "D",
    });

    useEffect(() => {
        if (id && detailAccount && currentLocation) {
            const transactions = detailAccount.transactions
            const filterData = transactions.filter(data => data.id === Number(id));
            setForm(filterData[0])
            setToggleUpdate(true)
        }
    }, [id, detailAccount, currentLocation]);

    const formHandler = (e) => {
        e.preventDefault();
        if (toggleUpdate) {
            patchTransaction(form)
        } else {
            addTransaction(form)
        }
        history.goBack();
    }

    const updateHeader = toggleUpdate ? 'Please update information and submit or back to cancel the update' : 'Please input detail transaction information or back to cancel.'

    return (
        <div className='flex justify-between items-center mx-auto'>
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{toggleUpdate && 'Update'} Account Transaction</h3>
                            <p className="mt-1 text-sm text-gray-600">
                                {updateHeader}
                            </p>
                        </div>
                    </div>
                    <div className="mt-5 md:mt-0 md:col-span-2">
                        <form onSubmit={formHandler}>
                            <div className="shadow overflow-hidden sm:rounded-md">
                                <div className="px-4 py-5 bg-white sm:p-6">
                                    <div className="grid grid-cols-6 gap-6">
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="detailAccount" className="block text-sm font-medium text-gray-700">Detail</label>
                                            <input type="text" name="detailAccount" id="detailAccount" autoComplete="detailAccount-name" value={form.detail}
                                                placeholder="Please input Account name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-b-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline-none"
                                                onChange={(e) => setForm({ ...form, detail: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Account Type</label>
                                            <select id="type" name="type"
                                                autoComplete="type"
                                                value={form.type}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={(e) => setForm({ ...form, type_transaction: e.target.value })}
                                            >
                                                <option value="D">Debit</option>
                                                <option value="C">Credit</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="transaction_account" className="block text-sm font-medium text-gray-700">Transaction Balance</label>
                                            <input
                                                type="number"
                                                name="transaction_account"
                                                id="transaction_account"
                                                autoComplete="balance"
                                                placeholder='Please input balance'
                                                value={form.transaction}
                                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-b-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline-none ${toggleUpdate && 'bg-gray-300'}`}
                                                onChange={(e) => setForm({ ...form, transaction: Number(e.target.value) })}
                                                disabled={toggleUpdate}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
                                    <button onClick={() => history.goBack()} type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                        Back
                                    </button>
                                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default AddUpdateFormDetail;