import { createAction, createReducer,on } from "@ngrx/store";

export interface ProductsState{
    showProductCode:boolean;
}
const initialState: ProductsState ={
    showProductCode:true
}
export const productsReducer = createReducer(
    initialState,
    on(createAction('[Prodcuts Page] Toggle Show Procut Code'),(state)=>({
        ...state,
        showProductCode:!state.showProductCode,

    }))
);