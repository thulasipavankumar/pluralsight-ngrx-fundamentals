import { createAction, createReducer,on } from "@ngrx/store";
import { ProductsPageActions } from "./products.actions";

export interface ProductsState{
    showProductCode:boolean;
}
const initialState: ProductsState ={
    showProductCode:true
}
export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProcutCode,(state)=>({
        ...state,
        showProductCode:!state.showProductCode,

    }))
);