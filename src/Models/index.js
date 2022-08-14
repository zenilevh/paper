import { action, thunk } from "easy-peasy";
import setCookies from "helper/setCookies";
import initialDb from 'db.json';
import clearAllCookies from "helper/clearAllCookies";

const models = {
    userLists: [],
    account: {},
    detailAccount: {},
    dataSearch: [],
    error: undefined,
    currentPage: 0,
    maxPage: 0,
    doLogin: thunk((actions, payload) => {
        actions.setResetData();
        //Sebenernya ini untuk nanti kalo ada admin, cuman waktu pengerjaan saya cuman 1 hari jadi ga sempet untuk feature tambahan.
        const listUser = localStorage.getItem('userList')
        let procedureFakeLogin = JSON.parse(listUser) || initialDb
        let validUser = procedureFakeLogin.find((list) => (list.user === payload.email && list.password === payload.password));

        if (validUser) {
            setCookies('auth', true, 9999);
            actions.setData(validUser);
        } else {
            actions.setError("Wrong email and password !")
        }
    }),
    setDetail: action((state, payload) => {
        state.detailAccount = payload
    }),
    setData: action((state, payload) => {
        const storageDb = localStorage.getItem('db');
        if (storageDb) {
            state.account = JSON.parse(storageDb);
            localStorage.setItem('db', storageDb);
        } else {
            state.account = payload;
            localStorage.setItem('db', JSON.stringify(payload));
        }
    }),
    addAccountType: action((state, payload) => {
        state.account.account_type.push(payload)
        localStorage.setItem('db', JSON.stringify(state.account));
    }),
    deleteAccountType: action((state, payload) => {
        const filterAccount = state.account.account_type.filter(account => account.id !== payload)
        state.account.account_type = filterAccount

        //set di persist state
        localStorage.setItem('db', JSON.stringify(state.account));
    }),
    patchAccountType: action((state, payload) => {
        const filterAccount = state.account.account_type.map(account => account.id === payload.id ? { ...account, ...payload } : account)
        state.account.account_type = filterAccount

        //set di persist state
        localStorage.setItem('db', JSON.stringify(state.account));
    }),
    addTransaction: action((state, payload) => {
        state.detailAccount.transactions.push(payload)

        //set di persist state
        const index = state.account.account_type.findIndex(acc => acc.id === state.detailAccount.id);
        state.account.account_type[index] = state.detailAccount;

        localStorage.setItem('db', JSON.stringify(state.account));
    }),
    deleteTransaction: action((state, payload) => {
        const filterTransaction = state.detailAccount.transactions.filter(transaction => transaction.id !== payload);
        state.detailAccount.transactions = filterTransaction;
        const index = state.account.account_type.findIndex(acc => acc.id === state.detailAccount.id);
        state.account.account_type[index] = state.detailAccount;

        //set di persist state
        localStorage.setItem('db', JSON.stringify(state.account));
    }),
    patchTransaction: action((state, payload) => {
        console.log(payload, 'payload ###')
        const transactions = state.detailAccount.transactions
        const filterTransactions = transactions.map(transaction => transaction.id === payload.id ? { ...transaction, ...payload } : transaction)
        state.detailAccount.transactions = filterTransactions

        //set di persist state
        const index = state.account.account_type.findIndex(acc => acc.id === state.detailAccount.id);
        state.account.account_type[index] = state.detailAccount;

        localStorage.setItem('db', JSON.stringify(state.account));
    }),
    setLogout: action((state) => {
        clearAllCookies()
        state.isAuthorized = false;
    }),
    setResetData: action((state) => {
        state.error = undefined;
    }),
    setError: action((state, payload) => {
        state.error = payload;
    }),
    deleteSearchData: action((state) => {
        state.dataSearch = []
    }),
    searchData: action((state, payload) => {
        if (payload.toggle) {
            payload.filter === 'Debit' ? payload.filter = 'D' : payload.filter = "C"
            const filterData = state.detailAccount.transactions.filter(el => el.type_transaction.toLowerCase().includes(payload.filter.toLowerCase()))
            if (filterData.length > 0) state.dataSearch = filterData
        } else {

            if (payload.filter !== "" && payload.search !== "") {
                const filterData = state.account.account_type.filter(el => el.type.toLowerCase().includes(payload.filter.toLowerCase()) && el.account.toLowerCase().includes(payload.search.toLowerCase()))
                if (filterData.length > 0) state.dataSearch = filterData
            } else if (payload.filter !== "" || payload.search !== "") {
                const filterData = state.account.account_type.filter(el => payload.filter !== "" ? el.type.toLowerCase().includes(payload.filter.toLowerCase()) : el.account.toLowerCase().includes(payload.search.toLowerCase()))
                if (filterData.length > 0) state.dataSearch = filterData
            }
        }

    })
}

export default models;