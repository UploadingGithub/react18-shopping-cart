


function Basket({ cartItems, onAdd, onRemove }) {

    // Función reduce: para obtener el precio total de todas las unidades de todos los productos.
    let itemsPrice = cartItems.reduce((acumulador, producto) => acumulador + producto.qty * producto.price, 0); // 0 = valor inicial del acumulador.

    let taxPrice = itemsPrice * 0.14; // Por ejemplo.

    let shippingPrice = itemsPrice > 2000 ? 0 : 20; // Por ejemplo.

    let totalPrice = itemsPrice + taxPrice + shippingPrice;


    return (
        <aside className="block col-1">
            <h2>Cart Items</h2>

            <div>
                {/* Si el carrito de compras está vacío */}
                {
                    cartItems.length === 0 && <div>Cart is empty</div>                    
                }

                {/* Si el carrito de compras no está vacío: renderizar el listado de sus productos, unidades, y precios. */}
                {
                    /* 
                    No hay que poner condición de si cartItems está vacío, porque si está vacío, al usar un map, devuelve un [] vacío.
                    Y por tanto no renderiza nada. 
                    */

                    cartItems.map(item => (
                        <div className="row" key={item.id}>
                            <div className="col-1">{item.name}</div>
                            <div className="col-1">
                                <button className="remove" onClick={() => onRemove(item)}>-</button>
                                <button className="add" onClick={() => onAdd(item)}>+</button>
                            </div>
                            <div className="col-1 text-right">
                                {item.qty} x ${item.price.toFixed(2)}
                            </div>
                        </div>
                    ))
                }

                {/* Si el carrito de compras no está vacío: renderizar el resumen final. */}
                {
                    cartItems.length !== 0 && (
                        <>
                            <hr />
                            <div className="row">
                                <div className="col-2">Items Price</div>
                                <div className="col-1 text-right">${itemsPrice.toFixed(2)}</div>
                            </div>       
                            <div className="row">
                                <div className="col-2">Tax Price</div>
                                <div className="col-1 text-right">${taxPrice.toFixed(2)}</div>
                            </div>                 
                            <div className="row">
                                <div className="col-2">Shipping Price</div>
                                <div className="col-1 text-right">${shippingPrice.toFixed(2)}</div>
                            </div>
                            <div className="row">
                                <div className="col-2"><b>Total Price</b></div>
                                <div className="col-1 text-right">${totalPrice.toFixed(2)}</div>
                            </div>
                            <hr />
                            <div className="row">
                                <button onClick={() => alert("Checkout")}>Checkout</button>
                            </div>
                        </>
                    )  
                }
            </div>        
        </aside>
    );
}

export default Basket;

