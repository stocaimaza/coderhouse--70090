//Integramos MercadoPago del lado del cliente: 

const mp = new MercadoPago("APP_USR-8666a790-3c9b-4f31-8ba2-12fd97542de2", {
    locale: "es-AR"
}); 

document.getElementById("checkout-btn").addEventListener("click", async () => {
    try {
        //Paso los datos del producto: 

        const orderData = {
            title: "Patito", 
            quantity: 1, 
            price: 100
        }

        const response = await fetch("http://localhost:8080/create-preference", {
            method: "POST", 
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(orderData)
        })

        const preference = await response.json();
        createCheckoutButton(preference.id); 
    } catch (error) {
        alert("Error fatal te vas a re morir, tenias tantas carreras para elegir pero te decidiste por la que no tenes talento")
    }
})

const createCheckoutButton = (preferenceId) => {
    const bricksBuilder = mp.bricks(); 

    //Correccion para evitar que se dupliquen los botones: 
    if(window.checkoutButton) window.checkoutButton.unmount();
    // Si ya existe un botón, desmontalo.

    const renderComponent = async () => {
        await bricksBuilder.create("wallet", "wallet-container", {
            initialization: {
                preferenceId: preferenceId
            }
        })
    }
    renderComponent(); 
}