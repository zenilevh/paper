import React, { useState } from 'react';
import Table from 'components/Table';
import { useStoreState } from 'easy-peasy';
import { useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Overview = () => {
    const { account, dataSearch } = useStoreState((state) => state)
    const [accountList, setAccountList] = useState([])

    useEffect(() => {
        if (dataSearch.length > 0) {
            setAccountList(dataSearch)
        } else {
            setAccountList(account.account_type)
        }
    }, [dataSearch, account]);

    return (
        <section
            id="section-demo-account"
            className="h-full w-full overflow-y-auto px-5 py-4"
        >
            <Redirect from='/' to="/overview" />
            <div className=" w-full px-16 pt-8">
                <div className="container mx-auto">
                    {/* content */}
                    <div className='w-full'>
                        {
                            accountList && <Table withAdd withDelete withEdit withSearch data={accountList} withDropDown linkAdd="/add-account" />
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Overview;
