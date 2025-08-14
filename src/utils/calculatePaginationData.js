//sayfalama verilerini hesaplayan fonsiyon

export const calculatePaginationData = (count,perPage,page) => {

    //toplam sayfa sayısını hesapla
    //yuvarlama yap

    const totalPages = Math.ceil(count / perPage)

    //sonraki sayfa var mı

    const hasNextPage = Boolean(totalPages - page)

    //önceki sayfa var mı

    const hasPreviousPage = page !== 1

    return {
        page,
        perPage,
        totalItems: count,
        totalPages,
        hasNextPage,
        hasPreviousPage
    }
}