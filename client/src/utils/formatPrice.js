export const formatPrice = (price) => {
    if (price === undefined || price === null) return '0 TND';
    return new Intl.NumberFormat('fr-TN', {
        style: 'currency',
        currency: 'TND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
};
