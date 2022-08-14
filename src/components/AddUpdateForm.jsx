import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';

const AddUpdateForm = () => {
    const { addAccountType, patchAccountType } = useStoreActions((state) => state)
    const { account } = useStoreState((state) => state)
    const { id } = useParams();
    const history = useHistory()
    const [toggleUpdate, setToggleUpdate] = useState(false);
    const [form, setForm] = useState({
        id: Math.floor(Math.random() * 100) + 1,
        account: "",
        type: "Assets",
        balance_account: "",
        transactions: []
    });

    useEffect(() => {
        if (id && account) {
            const accountType = account.account_type
            const filterData = accountType.filter(data => data.id === Number(id));
            setForm(filterData[0])
            setToggleUpdate(true)
        }
    }, [id, account]);

    const formHandler = (e) => {
        e.preventDefault();
        if (toggleUpdate) {
            patchAccountType(form)
        } else {
            addAccountType(form)
        }
        history.push('/')
    }

    const updateHeader = toggleUpdate ? 'Please update information and submit or back to cancel the update' : 'Please input account information first before add transactions.'

    return (
        <div className='flex justify-between items-center mx-auto'>
            <div className="mt-10 sm:mt-0">
                <div className="md:grid md:grid-cols-3 md:gap-6">
                    <div className="md:col-span-1">
                        <div className="px-4 sm:px-0">
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{toggleUpdate && 'Update'} Account Information</h3>
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
                                            <label htmlFor="account" className="block text-sm font-medium text-gray-700">Account</label>
                                            <input type="text" name="account" id="account" autoComplete="account-name" value={form.account}
                                                placeholder="Please input Account name"
                                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-b-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline-none"
                                                onChange={(e) => setForm({ ...form, account: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">Account Type</label>
                                            <select id="type" name="type"
                                                autoComplete="type"
                                                value={form.type}
                                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                onChange={(e) => setForm({ ...form, type: e.target.value })}
                                            >
                                                <option value="Assets">Assets</option>
                                                <option value="Expenses">Expenses</option>
                                                <option value="Liabilities">Liabilities</option>
                                                <option value="Equity">Equity</option>
                                                <option value="Revenue">Revenue</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-4">
                                            <label htmlFor="balance_account" className="block text-sm font-medium text-gray-700">Current Balance</label>
                                            <input
                                                type="number"
                                                name="balance_account"
                                                id="balance_account"
                                                autoComplete="balance"
                                                placeholder='Please input balance'
                                                value={form.balance_account}
                                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 border-b-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md outline-none ${toggleUpdate && 'bg-gray-300'}`}
                                                onChange={(e) => setForm({ ...form, balance_account: Number(e.target.value) })}
                                                disabled={toggleUpdate}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex justify-between">
                                    <Link to="/">
                                        <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
                                            Back
                                        </button>
                                    </Link>
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

export default AddUpdateForm;