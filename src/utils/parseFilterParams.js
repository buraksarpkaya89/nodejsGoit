// filtreleme parametrelerini parse eden fonksiyon

export const parseFilterParams = (query) => {

    const {name,email} = query

    const filter = {}
    //isim filtrelemesi
    if(name){
        filter.name = {
            $regex: name,
            $options: 'i' // buyük harf küçük harf duyarsızlığı
        }
    }

    if(email){
        filter.email = {
            $regex: email,
            $options: 'i'
        }
    }

    return filter;
}