import {createContext, ReactNode, useContext, useState} from "react"
import { ShoppingCart } from "../component/ShoppingCart"
import { useLocalStorage } from "../hooks/useLocalStorage"
type ShoppingCartProviderProps={
    children:ReactNode
}
type cartItem={
    id:number
    quantity:number


}
type ShoppingCartContext={
    openCart:()=>void
    closeCart:()=>void
    getQuantitity:(id:number )=>number
    increaseQuantity:(id:number)=>void
    decreaseQuantity:(id:number)=>void
    removeFromCart:(id:number)=>void
    cartQuantity:number
    cartItem: cartItem[]
}

const ShoppingCartContext= createContext({} as ShoppingCartContext )

export function useShoppingCart(){
    return useContext(ShoppingCartContext)
}

export function ShoppingCartProvider({children}:ShoppingCartProviderProps){
    const [cartItem,setCartItem]=useLocalStorage<cartItem[]>("Shopping-cart",[])
    const[isOpen,setIsOpen]=useState(false)

    const cartQuantity = cartItem.reduce((quantity,item)=>
        item.quantity+quantity, 0)
      

    const openCart= ()=> setIsOpen(true)
    const closeCart= ()=> setIsOpen(false)
    
    function getQuantitity(id:number){
        return cartItem.find(item=>item.id===id)?.quantity||0
    }
    function increaseQuantity(id:number){
        setCartItem(currItem=>{
            if(currItem.find(item=>item.id===id)==null){
                return [...currItem,{id,quantity:1}]
            }
            else {
                return currItem.map(item=>{
                    if(item.id===id){
                        return {...item,quantity: item.quantity+1}
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }
    function decreaseQuantity(id:number){
        setCartItem(currItem=>{
            if(currItem.find(item=>item.id===id)?.quantity===1){
                return currItem.filter(item=> item.id!==id)
            }
            else {
                return currItem.map(item=>{
                    if(item.id===id){
                        return {...item,quantity: item.quantity-1}
                    }
                    else {
                        return item
                    }
                })
            }
        })
    }
    function removeFromCart(id:number){
        setCartItem(currItem=> {
            return currItem.filter(item=>item.id!==id)
        })
    }

    
    
    
    return <ShoppingCartContext.Provider value={{getQuantitity,increaseQuantity,decreaseQuantity,removeFromCart,cartItem,cartQuantity,openCart,closeCart}}>
        {children}
        <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
}