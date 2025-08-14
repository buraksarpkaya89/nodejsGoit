import { SORT_ORDER } from "../constants/index.js";
import User from "../db/models/User.js";

import { calculatePaginationData } from "../utils/calculatePaginationData.js";


export const getAllUsers = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = "_id",
    filter = {}
}) => {

    const limit = perPage;

    //MongoDB için skip değeri sayfada kaç kayıt atlanacak 

    // örnek : 3. sayfa için 10 kayıt ( (3-1) * 10 = 20)
    const skip = (page - 1) * perPage

    const usersQuery = User.find(filter)

    const userCount = await User.find(filter)
    .merge(usersQuery)
    .countDocuments()

    const users = await usersQuery
        .skip(skip)
        .limit(limit)
        .sort({ [sortBy]: sortOrder})
        .exec()

    // sayfalama verilerini hesapla 

    const paginationData = calculatePaginationData(perPage, page)

    return {
        data: users,
        ...paginationData
    }
}