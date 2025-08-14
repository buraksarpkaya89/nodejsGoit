// sayıları parse etme fonksiyonu
//amaç string gelenleri integer'a çevirme
// geçersiz ifade (null,undefinded vb) geldiğinde bunu default değere döndürme

const parseNumber = (number,defaultValue) => {
    //Gelen değeri kontrol et

    const isString = typeof number === "string"

    // geçersiz ise
    if(!isString) return defaultValue

    // string ise integer'a çevir
    const parsedNumber = parseInt(number)

    // eğer çevirme işlemi başarız olursa

    if(Number.isNaN(parsedNumber)){
        return defaultValue
    }

    return parsedNumber
}

// sayfalama parametrelerini parse eden fonksiyon
// örnek sorgu:  http://localhost:3000/users?page=1&perPage=3

export const parsePaginationParams  = (query) => {

    const {page,perPage} = query

    const parsedPage = parseNumber(page,1)

    const parsedPerPage = parseNumber(perPage,10)

    //parse edilmiş değerleri döndür
    return {
        page: parsedPage,
        perPage: parsedPerPage
    }

}

