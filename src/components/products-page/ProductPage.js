import { Grid } from '@mui/material'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { ProductsApi } from '../../hooks/react-query/config/productsApi'
import { CustomStackFullWidth } from '../../styled-components/CustomStyles.style'
import { noFoodFoundImage } from '../../utils/LocalImages'
import { networkLimit } from '../../utils/someVariables'
import CustomShimmerForBestFood from '../CustomShimmer/CustomShimmerForBestFood'
import CustomEmptyResult from '../empty-view/CustomEmptyResult'
import GroupButtons from '../restaurant-details/foodSection/GroupButtons'
import ProductList from './ProductList'

const ProductPage = ({ product_type }) => {
    const [foodOrRestaurant, setFoodOrRestaurant] = useState('products')
    const [page_limit, setPageLimit] = useState(networkLimit)
    const [offset, setOffset] = useState(1)
    const [type, setType] = useState('all')

    const { isLoading, data, isError, error, refetch } = useQuery(
        ['popular-food', offset, page_limit, type],
        () => ProductsApi.products(product_type, offset, page_limit, type)
    )
    if (isError) {
        return <h1>{error.messages}</h1>
    }
    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12} align="center">
                    <CustomStackFullWidth
                        alignItems="center"
                        justifyContent="center"
                    >
                        <GroupButtons setType={setType} type={type} />
                    </CustomStackFullWidth>
                </Grid>
                <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    container
                    spacing={{ xs: 2, sm: 2, md: 3 }}
                >
                    {data?.data?.products.length === 0 && (
                        <CustomEmptyResult
                            image={noFoodFoundImage}
                            label="No Food Found"
                        />
                    )}
                    {data?.data ? (
                        <>
                            <ProductList
                                product_list={data?.data}
                                page_limit={page_limit}
                                offset={offset}
                                setOffset={setOffset}
                            />
                        </>
                    ) : (
                        <CustomShimmerForBestFood />
                    )}
                </Grid>
            </Grid>
        </>
    )
}

export default ProductPage
