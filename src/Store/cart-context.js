import React, { useCallback, useEffect, useState } from 'react'
import axios from 'axios'


const itemsAPI = 'https://crudcrud.com/api/02be20e35fd1424baa98ef65e59eb28e'

const CartContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item) => { },
    removeItem: (id) => { }
})


export const CartContextProvider = (props) => {
    const [items, setItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0)

    const fetchItemsHandler = useCallback(async () => {
        try {
            const res = await axios.get(`${itemsAPI}/cart`);
            setItems(res.data);
            const totalAmount = res.data.reduce((currAmount, item) => {
                return currAmount + item.cartAmount * item.price;
            }, 0)
            if (totalAmount) {
                setTotalAmount(totalAmount)
            }
        } catch (error) {
            console.log(error)
        }
    }, []);
    useEffect(() => {
        fetchItemsHandler();
    }, [fetchItemsHandler])

    const addtoCartHandler = async (item) => {
        const existingCartItem = items.find(product => product.cartId === item.cartId)

        if (existingCartItem) {
            const updatedItem = { ...existingCartItem, cartAmount: existingCartItem.cartAmount + 1 }
            delete updatedItem._id;
            try {
                const res = await axios.put(`${itemsAPI}/cart/${existingCartItem._id}`, updatedItem);
                fetchItemsHandler();
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const res = await axios.post(`${itemsAPI}/cart`, item);
                fetchItemsHandler();
            } catch (error) {
                console.log(error)
            }
        }
    }

    const removeFromCartHandler = async (item) => {
        if (item.cartAmount !== 1) {
            const updatedItem = { ...item, cartAmount: item.cartAmount - 1 }
            delete updatedItem._id
            try {
                const res = await axios.put(`${itemsAPI}/cart/${item._id}`, updatedItem);
                fetchItemsHandler();
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const res = await axios.delete(`${itemsAPI}/cart/${item._id}`);
                fetchItemsHandler();
            } catch (error) {
                console.log(error)
            }
        }

    }



    const cartContext = {
        items: items,
        totalAmount: totalAmount,
        addItem: addtoCartHandler,
        removeItem: removeFromCartHandler
    }
    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartContext;