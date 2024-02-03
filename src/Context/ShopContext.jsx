import React, { createContext, useState } from "react";
import all_product from '../Components/Assets/all_product'

// 상품 정보 저장을 위한 ShopContext 생성 및 자식 컴포넌트 렌더링
export const ShopContext = createContext(null);

// 장바구니 기능 생성
const getDefaultCart = () => {
    let cart = {}; // 처음에는 빈 객체로 수량을 담을 장바구니 생성
    for (let index = 0; index < all_product.length+1; index++) {
        cart[index] = 0; // 배열(상품정보) 길이만큼 반복문 실행 => 모든 상품 초기 수량을 cart에 0으로 설정 
    }
    return cart; // 초기화된 장바구니 상태 반환
}

const ShopContextProvider = ( props ) => {
    const [cartItems, setCartItems] = useState(getDefaultCart()); //cartItems = 현재 장바구니의 상태. 초기 cartItems = getDefaultCart
    // console.log(cartItems); // 장바구니 배열의 key-value pair가 0으로 설정된 것을 알 수 있음

    // 장바구니 추가
    const addToCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]+1}))
    }

    // 장바구니 삭제
    const removeFromCart = (itemId) => {
        setCartItems((prev) => ({...prev, [itemId]:prev[itemId]-1}))
    }

    // 장바구니 상품 가격 합계
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems) {
            if(cartItems[item]>0)
            {
                let itemInfo = all_product.find((product) => product.id===Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for (const item in cartItems)
        {
            if(cartItems[item]>0) 
            {
                totalItem+= cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems, getTotalCartAmount, all_product, cartItems, addToCart, removeFromCart}; // ShopContext에 상품 정보/장바구니 정보 저장, props로 내려줌

    // 하위 컴포넌트에서 ShopContext를 이용하여 상품 정보에 접근
    return (
        <ShopContext.Provider value={contextValue}> 
            {props.children} {/* 컴포넌트의 자식 컴포넌트들을 렌더링함 */}
        </ShopContext.Provider> 
    )
}

export default ShopContextProvider;