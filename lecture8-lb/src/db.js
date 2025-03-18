const getDataFromDatabase = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    return [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
        { id: 4, name: 'David' },
    ]
}

module.exports = {
    getDataFromDatabase
}