



function Header({ countCartItems }) {
    return (
        <div className="row center block">
            <div>
                <a href="#/"><h2>Simple Shopping Cart</h2></a>
            </div>
            <div>
                <a href="#/cart">Cart
                {
                    countCartItems 
                    ?
                    <button className="badge">{countCartItems}</button>  
                    :
                    ""
                }                
                </a>{" "}
                <a href="#/signin">Sign in</a>
            </div>
        </div>

    );
}

export default Header;

