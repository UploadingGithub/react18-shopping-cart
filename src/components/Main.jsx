import Product from './Product';


function Main({ cartItems, onAdd, onRemove, products }) {
    return (
        <div className="block col-2">
            <h2>Products</h2>

            {/* Listado de productos. */}
            <div className="row">
                {
                    products.map(product => (
                        <Product 
                            key={product.id} 
                            product={product} 
                            /* 
                            item es para saber si el producto está en el carrito o no:
                                - sí está en el carrito: item = product 
                                - no está en el carrito: item = null

                            Se usa para renderizar condicionalmente en el Componente Product.jsx:
                                - sí está en el carrito: poner botones + y -
                                - no está en el carrito: poner botón "Add To Cart"
                            */
                            item={cartItems.find(x => x.id === product.id)}
                            onAdd={onAdd}
                            onRemove={onRemove}
                        />           
                    ))
                }
            </div>

        </div>

    );
}

export default Main;

