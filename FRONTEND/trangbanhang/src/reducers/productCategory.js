import * as types from './../constants/ActionType';
const productCategoryInitialState = [];
var findIndex =(productCategory,id)=>{
    var result =-1;
    productCategory.forEach((productCategory,index) => {
        if(productCategory.IDProductCategory ===id){
            result =index;
        }
    });
    return result;
}
const productCategory = (state = productCategoryInitialState, action) => {
    var index =-1;
    switch (action.type) {
        case types.FETCH_PRODUCT_CATEGORY:
            state = action.productCategory
            return [...state]
        case types.ADD_PRODUCT_CATEGORY:
            console.log(action);
            state.push(action.productCategory)
            return [...state];
        case types.DELETE_PRODUCT_CATEGORY:
            index =findIndex(state,action.IDProductCategory);
            state.splice(index,1);
            return [...state];
        case types.UPDATE_PRODUCT_CATEGORY:
            index =findIndex(state,action.productCategory.IDProductCategory);
            state[index] =action.productCategory;
            return [...state];
        default:
            return [...state]
    }
}

export default productCategory;