export const formatCurrency = (value, locale = 'en-US', currency = 'USD') => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(value)
}


export const formatAssetType = (assetType) => {
    if (!assetType) {
        return ''
    }

    switch (assetType) {
        case 'real_estate':
            return 'Real Estate'
        default:
            return assetType.charAt(0).toUpperCase() + assetType.slice(1)
    }
}