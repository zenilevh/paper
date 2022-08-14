const getRandomDate = () => {
    const min = Math.ceil(1);
    const max = Math.floor(29);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const getRandomMonth = () => {
    const min = Math.ceil(1);
    const max = Math.floor(12);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
const getRandomYear = () => {
    const min = Math.ceil(1988);
    const max = Math.floor(2000);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const dateGenerator = `${getRandomDate()}/${getRandomMonth()}/${getRandomYear()}`

export default dateGenerator;