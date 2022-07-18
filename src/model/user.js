const path = require('path')
const { readJSONAsync, writeJSONAsync } = require('../utils/parseJsonData')

const dbJsonPath = path.resolve(process.cwd(), 'src/data/db_user.json')

exports.fetchAllUsers = async () => {
    const users = await readJSONAsync(dbJsonPath)
    return users.map((user) => {
        const { id, email, name, image } = user
        return { id, email, name, image }
    })
}

exports.fetchSomeUsers = async (paginationParams) => {
    const pageSize = parseInt(paginationParams.pageSize)
    const pageNumber = parseInt(paginationParams.pageNumber)
    const users = await readJSONAsync(dbJsonPath)
    console.log('users ', pageNumber * pageSize, (pageNumber * pageSize) + pageSize)
    return users.slice(pageNumber * pageSize, (pageNumber * pageSize) + pageSize)
}

exports.fetchUserById = async (id) => {
    const users = await readJSONAsync(dbJsonPath)
    return users.find((user) => user.id === id)
}

exports.fetchUserByEmail = async(email) => {
    const users = await readJSONAsync(dbJsonPath)
    return users.find((user) => user.email === email)
}

exports.addNewUser = async (data) => {
    const users = await readJSONAsync(dbJsonPath)
    users.push(data)
    await writeJSONAsync(dbJsonPath, users)
}

exports.update = async (dataOfNewUser) => {
    const users = await readJSONAsync(dbJsonPath)
    const foundUserIndex = users.findIndex((user) => user.id === dataOfNewUser.id)
    if (foundUserIndex === -1) {
        return false
    }
    users[foundUserIndex] = dataOfNewUser
    await writeJSONAsync(dbJsonPath, users)
    return true
}

exports.delete = async (id) => {
    // 1 взять всех пользователей
    const users = await readJSONAsync(dbJsonPath)
    // 2 удалить пользователя по id
    let userBeenFound = false
    const filteredUsers = users.filter(user => {
        if (user.id !== id) {
            return true
        }
        userBeenFound = true
        return false
    })
    if (userBeenFound) {
        // 3 сохранить обновленный масив пользователей
        await writeJSONAsync(dbJsonPath, filteredUsers)
        return true
    }
    return false
}
