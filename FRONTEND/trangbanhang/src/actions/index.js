import * as types from './../constants/ActionType';
import callApi from '../utils/apiCaller';
export const actAddToCart = (product, quantity) => {
    return {
        type: types.ADD_TO_CART,
        product,
        quantity
    }
}

export const actChangeMessage = (message) => {
    return {
        type: types.CHANGE_MESSAGE,
        message
    }
}
export const actChangeTitle = (login) => {
    return {
        type: types.CHANGE_TITLE,
        login
    }
}
export const actDeleteProductInCart = (product) => {
    return {
        type: types.DELETE_PRODUCT_IN_CART,
        product
    }
}
export const actUpdateProductInCart = (product, quantity) => {
    return {
        type: types.UPDATE_PRODUCT_IN_CART,
        product,
        quantity
    }
}
export const actFetchCustomerRequest = () => {
    return (dispatch) => {
        return callApi('getdataaccount', 'GET', null).then(res => {
            dispatch(actFetchCustomer(res && res.data));
        })
    }
}

export const actFetchCustomer = (customer) => {
    return {
        type: types.FETCH_CUSTOMER,
        customer
    }
}
export const actFetchAddressRequest = () => {
    return (dispatch) => {
        return callApi('selectAddress', 'GET', null).then(res => {
            dispatch(actFetchAddress(res && res.data));
        })
    }
}

export const actFetchAddress = (address) => {
    return {
        type: types.FETCH_ADDRESS,
        address
    }
}

export const actLogout = () => {
    return {
        type: types.LOGOUT,
    }
}

export const actUpdateMajorAddressRequest = (IDCustomer,IDCustomerAddress) => {
    return (dispatch) => {
        return callApi('updateCustomerAddress', 'POST', {
            IDCustomer : IDCustomer,
            IDCustomerAddress : IDCustomerAddress
        }).then(res => {
            dispatch(actUpdateMajorAddress(res && res.data));
        })
    }
} 
export const actUpdateMajorAddress = (address) => {
    return {
        type: types.CHANGE_MAJOR_ADDRESS,
        address
    }
}

export const actAddOrderRequest = (order) => {
    return (dispatch) => {
        return callApi('addOrder', 'POST',{order}).then(res => {
            dispatch(actAddOrder(res && res.data));
        })
    }
}

export const actAddOrder = (order) => {
    return {
        type: types.ADD_ORDER,
        order
    }
}

export const actFetchOrderRequest = () => {
    return (dispatch) => {
        return callApi('selectOrder', 'GET',null).then(res => {
            dispatch(actFetchOrder(res && res.data));
        })
    }
}

export const actFetchOrder = (order) => {
    return {
        type: types.FETCH_ORDER,
        order
    }
}

export const actCancelOrderRequest = (IDOrder) => {
    return (dispatch) => {
        return callApi('cancelOrder', 'POST',{IDOrder}).then(res => {
            dispatch(actCancelOrder(res && res.data));
        })
    }
}

export const actCancelOrder = (order) => {
    return {
        type: types.CANCEL_ORDER,
        order
    }
}

export const actAddAddressRequest = (address) => {
    return (dispatch) => {
        return callApi('addAddress', 'POST',{address}).then(res => {
            dispatch(actAddAddress(res && res.data));
        })
    }
}

export const actAddAddress = (address) => {
    return {
        type: types.ADD_NEW_ADDRESS,
        address
    }
}

export const actDeleteAddressRequest = (IDCustomerAddress) => {
    return (dispatch) => {
        return callApi('deleteAddress', 'POST',{IDCustomerAddress}).then(res => {
            dispatch(actDeleteAddress(IDCustomerAddress&&IDCustomerAddress));
        })
    }
}

export const actDeleteAddress = (IDCustomerAddress) => {
    return {
        type: types.DELETE_ADDRESS,
        IDCustomerAddress
    }
}

export const actAddOrderDetailRequest = (orderDetail) => {
    return (dispatch) => {
        return callApi('addOrderDetail', 'POST',{orderDetail}).then(res => {
            dispatch(actAddOrderDetail(res && res.data));
        })
    }
}

export const actAddOrderDetail = (orderDetail) => {
    return {
        type: types.ADD_NEW_ORDER_DETAIL,
        orderDetail
    }
}

export const actClearCart = () => {
    return {
        type: types.CLEAR_CART,
    }
}

export const actFetchOrderDetailRequest = () => {
    return (dispatch) => {
        return callApi('selectOrderDetail', 'GET',null).then(res => {
            dispatch(actFetchOrderDetail(res && res.data));
        })
    }
}

export const actFetchOrderDetail = (orderDetail) => {
    return {
        type: types.FETCH_ORDER_DETAIL,
        orderDetail
    }
}

export const actFetchProductRequest = () => {
    return (dispatch) => {
        return callApi('selectProduct', 'GET', null).then(res => {
            dispatch(actFetchProduct(res && res.data));
        })
    }
}

export const actFetchProduct = (product) => {
    return {
        type: types.FETCH_PRODUCT,
        product
    }
}

export const actFetchProductCategoryRequest = () => {
    return (dispatch) => {
        return callApi('selectProductCategory', 'GET', null).then(res => {
            dispatch(actFetchProductCategory(res && res.data));
        })
    }
}

export const actFetchProductCategory = (productCategory) => {
    return {
        type: types.FETCH_PRODUCT_CATEGORY,
        productCategory
    }
}

export const actFetchProductFilter = (product) => {
    return {
        type: types.FETCH_PRODUCT_FILTER,
        product
    }
}

export const actRegisteredRequest = (customer) => {
    return (dispatch) => {
        return callApi('register', 'POST', {customer}).then(res => {
            dispatch(actRegistered(res && res.data));
        })
    }
}

export const actRegistered = (customer) => {
    return {
        type: types.REGISTERED,
        customer
    }
}

export const actUpdateCustomerRequest = (customer) => {
    return (dispatch) => {
        return callApi('updateCustomer', 'POST',{customer}).then(res => {
            dispatch(actUpdateCustomer(res && res.data));
        })
    }
}

export const actUpdateCustomer = (customer) => {
    return {
        type: types.UPDATE_CUSTOMER,
        customer
    }
}

export const actGetCustomerEditRequest = (IDCustomer) => {
    return (dispatch) => {
        return callApi('getCustomerEdit', 'POST',IDCustomer).then(res => {
            dispatch(actGetCustomerEdit(res && res.data));
        })
    }
}

export const actGetCustomerEdit = (customer) => {
    return {
        type: types.GET_PRODUCT_EDIT,
        customer
    }
}