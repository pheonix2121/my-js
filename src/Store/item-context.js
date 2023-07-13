import React, { useCallback, useState, useEffect } from 'react';
import axios from 'axios';

const itemsAPI = 'https://crudcrud.com/api/02be20e35fd1424baa98ef65e59eb28e';

const ItemContext = React.createContext({
    items: [],
    addItem: (item) => { },
    removeQuantity: (id) => { },
    addQuantity: (id) => { }
});

export const ItemContextProvider = (props) => {
    const [items, setItems] = useState([]);

    const fetchItemsHandler = useCallback(async () => {
        try {
            const res = await axios.get(`${itemsAPI}/products`);
            setItems(res.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchItemsHandler();
    }, [fetchItemsHandler]);


    const addItemsHandler = async (item) => {
        try {
            const res = await axios.post(`${itemsAPI}/products`, item);
            fetchItemsHandler();
        } catch (error) {
            console.log(error);
        }
    };

    const removeItemQuantity = async (id) => {
        const existingItem = items.find(product => product._id === id)

        const updatedItem = { ...existingItem, quantity: +existingItem.quantity - 1 }
        delete updatedItem._id;
        try {
            const res = await axios.put(`${itemsAPI}/products/${existingItem._id}`, updatedItem);
            fetchItemsHandler();
        } catch (error) {
            console.log(error)
        }
    }

    const addItemQuantity = async (id) => {
        const existingItem = items.find(product => product._id === id)

        const updatedItem = { ...existingItem, quantity: existingItem.quantity + 1 }
        delete updatedItem._id;
        try {
            const res = await axios.put(`${itemsAPI}/products/${existingItem._id}`, updatedItem);
            fetchItemsHandler();
        } catch (error) {
            console.log(error)
        }
    }

    const itemContext = {
        items: items,
        addItem: addItemsHandler,
        removeQuantity: removeItemQuantity,
        addQuantity: addItemQuantity
    };

    return (
        <ItemContext.Provider value={itemContext}>
            {props.children}
        </ItemContext.Provider>
    );
};

export default ItemContext;