import { SORT_ORDER } from "../constants/index.js";

//sıralama yönünü parse eden fonksiyon

const parseSortOrder  = (sortOrder) => {

    //queryden gelen sıralama değerinin bizim değerlerden olup olmadığını kontol et
    const isKnownOrder = [SORT_ORDER.ASC,SORT_ORDER.DESC].includes(sortOrder)

    //eğer geçerli bir değer varsa onu döndür
    if(isKnownOrder) return sortOrder

    //geçersiz ise varsayılan olarak artan sıralama olsun
    return SORT_ORDER.ASC;
}

// sıralama alanlarını parse eden bir fonksiyon yaz.

const parseSortBy = (sortBy) => {

    const keysOfUser = [
        '_id',
        'name',
        'email',
        'createdAt'
    ]

    //eğer gelen alan listede varsa onu döndür
    if(keysOfUser.includes(sortBy)) return sortBy

    return '_id'
}


// sıralama parametrelerini pase eden fonksiyon

export const parseSortParams = (query) => {

    //queryden gelen sortOrder ve sortBy parametrelerini al

    const {sortOrder,sortBy} = query

    const parsedSortOrder = parseSortOrder(sortOrder)
    const parsedSortBy = parseSortBy(sortBy)

    return {
        sortOrder: parsedSortOrder,
        sortBy : parsedSortBy
    }


}