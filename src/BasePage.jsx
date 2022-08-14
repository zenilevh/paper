import React from 'react';
import Navbar from './components/Navbar';
import { Switch, Route, Redirect } from 'react-router-dom'
import Overview from 'pages/Overview';
import AddUpdateForm from 'components/AddUpdateForm';
import DetailTransaction from 'pages/DetailTransaction';

const BasePage = () => {
    // ALAMAT DEPRACATED

    return (
        <div className="w-full h-full">
            <Navbar />
            <div className="absolute top-0 flex h-screen w-full flex-row overflow-hidden pt-20">
                <div className="relative z-0 flex h-full w-full overflow-auto pb-20 pt-4">
                    <Switch>
                        <Route exact path={`/`}>
                            <Redirect to={`/overview`} />
                        </Route>
                        <Route exact path={`/overview`}>
                            <Overview />
                        </Route>
                        <Route exact path={`/overview/update-account/:id`}>
                            <AddUpdateForm />
                        </Route>
                        <Route exact path={`/overview/detail-account/:id`}>
                            <DetailTransaction />
                        </Route>
                        <Route exact path={`/overview/detail-account/:id/transaction/:uid`}>
                            <AddUpdateForm />
                        </Route>
                        <Route exact path={`/overview/add-account`}>
                            <AddUpdateForm />
                        </Route>
                        <Route path="*">404!</Route>
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export default BasePage;