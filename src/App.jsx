/* 
----------------------------------------------------------------------------------------------------------------
En este añadido, utiliza 2 Hooks de React versión 18:
- useTransition
y
- useDeferredValue
----------------------------------------------------------------------------------------------------------------


-----------------
useTransition
-----------------
(1)
useTransition lo utiliza para evitar bloquear el componente App.jsx (y el resto),
mientras se lee del localStorage para cargar los posibles productos del carrito de compras,
estableciendo esa lectura como de baja prioridad.

En este pequeño ejemplo apenas se aprecia / apenas se necesitaría, porque la carga de datos desde el localStorage es pequeña,
pero en una aplicación con mucha carga sí puede ser útil.



-----------------
useDeferredValue
-----------------
(2)
useDeferredValue lo utiliza para calcular con baja prioridad el valor del número de productos en el carrito de compras.

Imagino que es sólo de ejemplo, porque no parece que fuera a ralentizar mucho la aplicación, el usar directamente: cartItems.length

*/


import { useState, useEffect, useTransition, useDeferredValue } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Basket from './components/Basket'
import data from './data';


function App() {

    const { products } = data;

    // Variable de estado --> carrito de compras.
    const [cartItems, setCartItems] = useState([]);

    // Para hacer baja prioridad: el leer los productos que haya almacenados en el localStorage. // -------------------------------------------------> (1)
    const [isPending, startTransition] = useTransition();

    // Para hacer baja prioridad: el calcular el valor del número de productos en el carrito de compras. // -----------------------------------------> (2)
    const cartItemsDeferred = useDeferredValue(cartItems.length);


    /* 
    --------------------------------------------------------------------------------------------------------------------
    Se ejecuta sólo en el primer renderizado.

    Para cada vez que se reinicie la aplicación, vuelva a cargar los productos del carrito de compras, y no los pierda.
    --------------------------------------------------------------------------------------------------------------------
    */
    useEffect(() => {

        // Lo metido dentro de startTransition, tiene una prioridad baja al ejecutarse/renderizarse. // <--------------------------------------------- (1)
        startTransition(() => {
            // Si ya se habían seleccionado productos: cargar el carrito de compras con ellos. Si no, cargar el carrito de compras con un array vacío.
            setCartItems(
                localStorage.getItem("cartItems") 
                ? 
                JSON.parse(localStorage.getItem("cartItems")) 
                : 
                []
            );
        });        
        
    }, []);




    // ------------------------------------------
    // Añadir producto al carrito de compras.
    // ------------------------------------------
    const onAdd = (product) => {
        /* 
        Comprobar si el producto a añadir ya existía en el carrito de compras: 
        - si existe     : devuelve el producto 
        - si no existe  : devuelve undefined        
        */
        const exist = cartItems.find(x => x.id === product.id);

        // Si el producto existe, incrementar en 1 su número de unidades, y guardarlo de nuevo en la variable de estado: en el carrito de compras.
        if (exist) {
            const newCartItems = cartItems.map((x) => x.id === product.id ? {...exist, qty: exist.qty + 1} : x); 
            setCartItems(newCartItems); 
            // Guardar en el localStorage del navegador para esta aplicación, los productos del carrito de compras.
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));          
        }
        // Si el producto no existe, guardarlo en la variable de estado: en el carrito de compras.
        else {
            const newCartItems = [...cartItems, {...product, qty: 1}];
            setCartItems(newCartItems);
            // Guardar en el localStorage del navegador para esta aplicación, los productos del carrito de compras.
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }        
    }


    // ------------------------------------------
    // Eliminar producto del carrito de compras.
    // ------------------------------------------
    const onRemove = (product) => {
        /* 
        El producto a eliminar del carrito de compras se supone que ya existe, puesto que el usuario le ha dado a eliminarlo.
        
        Ahora encontrar dicho producto a eliminar:
        */  
        const exist = cartItems.find(x => x.id === product.id);

        // Si su cantidad es 1, eliminarlo del carrito de compras.
        if (exist.qty === 1) {
            const newCartItems = cartItems.filter(x => x.id !== product.id);
            setCartItems(newCartItems);
            // Guardar en el localStorage del navegador para esta aplicación, los productos del carrito de compras.
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }
        // Si su cantidad es mayor de 1: restarle 1 a su cantidad.
        else {
            const newCartItems = cartItems.map((x) => x.id === product.id ? {...exist, qty: exist.qty - 1} : x);
            setCartItems(newCartItems);
            // Guardar en el localStorage del navegador para esta aplicación, los productos del carrito de compras.
            localStorage.setItem("cartItems", JSON.stringify(newCartItems));
        }
    }


    
    return (
        isPending
        ?
        <div>Loading...</div>
        :
        (
            <div>
                {/* <Header countCartItems={cartItems.length} /> */}
                <Header countCartItems={cartItemsDeferred} /> {/* <----------------------------------------------------------------------------------- (2) */}

                <div className="row">
                    <Main cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} products={products} />
                    <Basket cartItems={cartItems} onAdd={onAdd} onRemove={onRemove} />
                </div>
            </div>
        )
    );
}

export default App;

