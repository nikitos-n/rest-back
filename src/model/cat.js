const path = require('path')
const { readJSONAsync, writeJSONAsync } = require('../utils/parseJsonData')

const dbJsonPath = path.resolve(process.cwd(), 'src/data/db_cats.json')

exports.fetchAllCats = async () => {
    return readJSONAsync(dbJsonPath)
}

exports.fetchCatById = async (id) => {
    const cats = await readJSONAsync(dbJsonPath)
    return cats.find((cat) => cat.id === id)
}

exports.fetchCatByOwnerId = async (id) => {
    const cats = await readJSONAsync(dbJsonPath)
    return cats.filter((cat) => cat.ownerId === id)
}

exports.addNewCat = async (data) => {
    const cats = await readJSONAsync(dbJsonPath)
    cats.push(data)
    await writeJSONAsync(dbJsonPath, cats)
}

exports.update = async (dataOfNewCat) => {
    const cats = await readJSONAsync(dbJsonPath)
    const foundCatIndex = cats.findIndex(cat => cat.id === dataOfNewCat.id)
    if (foundCatIndex === -1) {
        return false
    }
    cats[foundCatIndex] = dataOfNewCat
    await writeJSONAsync(dbJsonPath, cats)
    return true
}

exports.delete = async (id) => {
    // 1 взять всех котов
    const cats = await readJSONAsync(dbJsonPath)
    // 2 удалить кота по id
    let catBeenFound = false
    const filteredCats = cats.filter(cat => {
        if (cat.id !== id) {
            return true
        }
        catBeenFound = true
        return false
    })
    if (catBeenFound) {
        // 3 сохранить обновленный масив котов
        await writeJSONAsync(dbJsonPath, filteredCats)
        return true
    }
    return false
}
exports.deleteOwnerId = async (id) => {
    // 1 взять всех котов
    const cats = await readJSONAsync(dbJsonPath)
    // 2 Обновляем у котов поле ownerId null
    const updatedCats = cats.map(cat => {
        if (cat.ownerId === id) {
            cat.ownerId = null
        }
        return cat
    })
    // 3 сохранить обновленный масив котов
    await writeJSONAsync(dbJsonPath, updatedCats)
}
