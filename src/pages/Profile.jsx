import React from 'react';
import { useStoreState } from 'easy-peasy';


const Profile = () => {
    const { account } = useStoreState(state => state);

    if (Object.keys(account).length === 0) return <div></div>

    return (
        <div className="max-w-5xl mx-auto py-16 bg-white">
            <article className="overflow-hidden">
                <div className="bg-[white] rounded-b-md">
                    <div className="p-9">
                        <div className="space-y-6 text-slate-700">
                            <p className="text-xl font-extrabold tracking-tight uppercase font-body">
                                {account.name}
                            </p>
                        </div>
                    </div>
                    <div className="p-9">
                        <div className="flex w-full">
                            <div className="grid grid-cols-4 gap-12">
                                <div className="text-sm font-light text-slate-500">
                                    <p className="text-sm font-normal text-slate-700">
                                        Address:
                                    </p>
                                    <p>{account.address.Country}</p>
                                    <p>{account.address.City}</p>
                                    <p>{account.address.Street}</p>
                                    <p>{account.address.provice}</p>
                                </div>
                                <div className="text-sm font-light text-slate-500">
                                    <p className="text-sm font-normal text-slate-700">Phone :</p>
                                    <p>{account.address.Phone}</p>
                                    <p>{account.address.code}</p>
                                </div>
                                <div className="text-sm font-light text-slate-500">
                                    <p className="text-sm font-normal text-slate-700">Total Balance</p>
                                    <p>
                                        {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR" }).format(account.total_balance)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-9">
                        <div className="flex flex-col mx-0 mt-8">
                            {/* <Table/> */}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    )
}

export default Profile;