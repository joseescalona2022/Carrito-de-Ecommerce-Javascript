//verCarrito.addEventListener("click", () => {
const pintarCarrito = () => {
    modalcontainer.innerHTML = "";
    modalcontainer.style.display ="flex";
    const modalHeader = document.createElement("div");
    modalHeader.className = "modal-header";
    modalHeader.innerHTML = `
       <h1 class= "modal-header-title">Carrito.</h1>
    `;
    modalcontainer.append(modalHeader);

    const modalbutton = document.createElement("h1");
    modalbutton.innerText = "x";
    modalbutton.className = "modal-header-button";

    modalbutton.addEventListener("click", () => {
        modalcontainer.style.display = "none";

    });

    modalHeader.append(modalbutton);


    carrito.forEach((product) => {
     let carritoContent = document.createElement("div");
     carritoContent.className = "modal-content";
     carritoContent.innerHTML = `
          <img src="${product.img}">
          <h3>${product.nombre}</h3>
          <p>${product.precio} $</p> 
          <span class="restar"> - </span>
          <p>cantidad: ${product.cantidad}</p>
          <span class="sumar"> + </span>
          <p>Total: ${product.cantidad * product.precio}<p>
          <span class="borrar-producto"> 🚫 </span>
        `;

      modalcontainer.append(carritoContent);

      let restar = carritoContent.querySelector(".restar")

        restar.addEventListener("click", () => { 
            if(product.cantidad !== 1) {
                product.cantidad--;
            }
         saveLocal()
         pintarCarrito();
      });

      let sumar = carritoContent.querySelector(".sumar");
        sumar.addEventListener("click", () => { 
         product.cantidad++;
         saveLocal();
         pintarCarrito();
      });

      let eliminar = carritoContent.querySelector(".borrar-producto");
      
      eliminar.addEventListener("click", () => {
          eliminarProducto(product.id);
       })


     // let eliminar = document.createElement("span");
      //eliminar.innerText = "🚫";
      //eliminar.className = "borrar-producto"
      //carritoContent.append(eliminar);

     // eliminar.addEventListener("click", eliminarProducto);
    });

    const total = carrito.reduce((acc, el) => acc + el.precio * el.cantidad, 0);

    const totalBuying = document.createElement("div");
    totalBuying.className = "total-content"
    totalBuying.innerHTML = `total a pagar: ${total} $`;
    modalcontainer.append(totalBuying);

};
verCarrito.addEventListener("click", pintarCarrito);

const eliminarProducto = (id) => {
    const foundId = carrito.find((element)=> element.id === id);

    carrito = carrito.filter((carritoId) => {
        return carritoId !== foundId;
    });

    carritoCounter();
    saveLocal();
    pintarCarrito();
};

const carritoCounter = () => {
    cantidadCarrito.style.display = "block"


    const carritoLenght = carrito.length;

    localStorage.setItem("carritoLength", JSON.stringify(carritoLenght))
    cantidadCarrito.innerText = JSON.parse(localStorage.getItem("carritoLength"));
};

carritoCounter();