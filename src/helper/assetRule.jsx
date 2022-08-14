const assetRule = (totalbalance, inputBalance, type, account) => {
    let balance = 0;
    if (type === "C") {
        if (account === "Assets" || account === "Expenses") {
            balance = totalbalance - inputBalance
        } else {
            balance = totalbalance + inputBalance
        }
    } else {
        if (account === "Assets" || account === "Expenses") {
            balance = totalbalance + inputBalance
        } else {
            balance = totalbalance - inputBalance
        }
    }
    return balance;
}

export default assetRule;