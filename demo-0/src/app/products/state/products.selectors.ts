import { createFeatureSelector, createSelector } from "@ngrx/store";
import { sumProducts } from "src/app/utils/sum-products";
import { getRouterSelectors } from "@ngrx/router-store";
import * as fromProducts from './products.reducers'

export const selectProductsState = createFeatureSelector<fromProducts.ProductsState>('products')
export const selectProducts = createSelector(
    selectProductsState,
    fromProducts.selectproducts
)
export const selectProductsEntities = createSelector(
    selectProductsState,
    fromProducts.selectProductEntites
)
export const selectProductsLoading = createSelector(
    selectProductsState,
    (productsState) => productsState.loading
)

export const selectProductsShowProductCode = createSelector(
    selectProductsState,
    (productsState) => productsState.showProductCode
)


export const selectProductsTotal = createSelector(
    selectProducts,
    (products) => sumProducts(products)
)

export const selectProductsErrorMessage = createSelector(
    selectProductsState,
    (productsState) => productsState.errorMessage
)
export const {selectRouteParams} = getRouterSelectors();
export const selectProductsById =  createSelector(
    selectProductsEntities,
    selectRouteParams,
    (productEntities,{id})=> productEntities[id]
)

