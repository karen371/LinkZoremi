const productos = [
    {
        id: 1,
        nombre: "Muñeca de Mulan",
        categoria: "personajes",
        imagen: "./Img/mulan.png",
        precio: "$20.000",
        tamaño: "20 cm",
        material: "Hilo 100% algodón",
        estado: "Disponible",
        personalizable: false,
        descripcion: "Hermosa muñeca tejida a mano inspirada en Mulan."
    },
    {
        id: 2,
        nombre: "Deadpool (Estilo Funko)",
        categoria: "personajes",
        imagen: "./Img/deadpool.png",
        precio: "$15.000",
        tamaño: "14 cm",
        material: "Hilo 100% algodón",
        estado: "Disponible",
        personalizable: false,
        descripcion: "El antihéroe más querido en versión amigurumi estilo funko."
    },
    {
        id: 3,
        nombre: "Frutillita",
        categoria: "personajes",
        imagen: "./Img/frutillita.png",
        precio: "$40.000",
        tamaño: "34 cm",
        material: "Hilo 100% algodón",
        estado: "Disponible",
        personalizable: false,
        descripcion: "Clásica y tierna muñequita Frutillita."
    },
    {
        id: 4,
        nombre: "Giyu Tomioka",
        categoria: "personajes",
        imagen: "./Img/Tomioka.png",
        precio: "$13.000",
        tamaño: "10 cm",
        material: "Hilo de algodón",
        estado: "Disponible",
        personalizable: false,
        descripcion: "Amigurumi del Pilar del Agua, Giyu Tomioka."
    },
    {
        id: 5,
        nombre: "Tokito",
        categoria: "personajes",
        imagen: "./Img/Tokito.png",
        precio: "$13.000",
        tamaño: "10 cm",
        material: "Hilo de algodón",
        estado: "Disponible",
        personalizable: false,
        descripcion: "Amigurumi del Pilar de la Niebla, Muichiro Tokito."
    },
    {
        id: 6,
        nombre: "Millie y su perrito",
        categoria: "personajes",
        imagen: "./Img/millie.jpeg",
        precio: "$45.000",
        tamaño: "33 cm (Millie) - 10 cm (Perrito)",
        material: "Hilo de algodón",
        estado: "Disponible",
        personalizable: false,
        descripcion: "Conjunto de Millie junto a su adorable perrito, tejidos a mano."
    },
    {
        id: 7,
        nombre: "Zoro",
        categoria: "personajes",
        imagen: "./Img/Zoro.jpg",
        precio: "$13.000",
        tamaño: "10 cm",
        material: "Hilo de algodón",
        estado: "Disponible",
        personalizable: false,
        descripcion: "Roronoa Zoro de One Piece en versión amigurumi."
    },
    {
        id: 8,
        nombre: "Princesa Merida (Estilo Funko)",
        categoria: "personajes",
        imagen: "./Img/Merida.jpg",
        precio: "$15.000",
        tamaño: "14 cm",
        material: "Hilo de algodón",
        estado: "Disponible",
        personalizable: false,
        descripcion: "Valiente Princesa Merida tejida en estilo funko."
    },
    {
        id: 9,
        nombre: "Gato de Chenille",
        categoria: "animales",
        imagen: "./Img/GatoChenille.jpg",
        precio: "$8.000",
        tamaño: "Largo 10cm, alto 10cm",
        material: "Chenille",
        estado: "Disponible",
        personalizable: false,
        descripcion: "Suavecito gato tejido con lana chenille."
    },
    {
        id: 10,
        nombre: "Perro Salchicha",
        categoria: "animales",
        imagen: "./Img/Salchicha.jpg", 
        precio: "$8.000",
        tamaño: "Largo 17cm, alto 10cm",
        material: "Chenille",
        estado: "Disponible",
        personalizable: false,
        descripcion: "Tierno perrito salchicha tejido en chenille."
    }
];

// Referencias al DOM
const productsGrid = document.getElementById('products-grid');
const chips = document.querySelectorAll('.chip');
const modalOverlay = document.getElementById('productModal');
const closeModalBtn = document.getElementById('closeModalBtn');

// Referencias al interior del Modal
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalPrice = document.getElementById('modalPrice');
const modalSize = document.getElementById('modalSize');
const modalMaterial = document.getElementById('modalMaterial');
const modalStatus = document.getElementById('modalStatus');
const modalCustom = document.getElementById('modalCustom');
const modalDesc = document.getElementById('modalDesc');
const modalWspLink = document.getElementById('modalWspLink');

// Número de WhatsApp (Formato internacional sin +)
const numeroWhatsApp = "56981720658"; 

/**
 * Genera el enlace de WhatsApp con un mensaje predeterminado
 */
function generarLinkWhatsApp(nombreProducto) {
    const texto = `Hola Zoremi! Me interesa el amigurumi 🧶 ${nombreProducto}`;
    return `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(texto)}`;
}

/**
 * Renderiza las tarjetas de productos en base al array y la categoría
 */
function renderizarProductos(categoria = 'todos') {
    productsGrid.innerHTML = ''; // Limpiar grid

    const productosFiltrados = productos.filter(p => categoria === 'todos' || p.categoria === categoria);

    if (productosFiltrados.length === 0) {
        productsGrid.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-light); grid-column: 1 / -1;">No hay productos en esta categoría por ahora.</p>';
        return;
    }

    productosFiltrados.forEach((prod, index) => {
        const article = document.createElement('article');
        article.className = 'product-card';
        article.style.animationDelay = `${index * 60}ms`; // Efecto cascada
        
        // Asignar clase de estilo según estado
        let badgeClass = 'product-badge';
        if (prod.estado === 'A pedido') badgeClass += ' badge-fav';
        if (prod.estado === 'Agotado') badgeClass += ' badge-sold'; // Para un futuro uso

        article.innerHTML = `
            <div class="product-img-wrap">
                <span class="${badgeClass}">${prod.estado}</span>
                <span class="product-img"><img src="${prod.imagen}" alt="${prod.nombre}" loading="lazy"></span>
            </div>
            <div class="product-info">
                <h2 class="product-name">${prod.nombre}</h2>
                <div class="product-meta">
                    <span class="product-price">${prod.precio}</span>
                </div>
                <div class="product-footer">
                    <button class="details-btn" data-id="${prod.id}">Ver detalles</button>
                </div>
            </div>
        `;

        productsGrid.appendChild(article);
    });

    // Agregar eventos a los nuevos botones "Ver detalles"
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = parseInt(e.target.dataset.id);
            abrirModal(id);
        });
    });
}

/**
 * Abre el modal y lo llena con los datos del producto correspondiente
 */
function abrirModal(id) {
    const prod = productos.find(p => p.id === id);
    if (!prod) return;

    modalImg.src = prod.imagen;
    modalImg.alt = prod.nombre;
    modalTitle.textContent = prod.nombre;
    modalPrice.textContent = prod.precio;
    modalSize.textContent = prod.tamaño;
    modalMaterial.textContent = prod.material;
    
    modalStatus.textContent = prod.estado;
    if (prod.estado === 'A pedido') {
        modalStatus.style.color = 'var(--soft-orange)';
    } else if (prod.estado === 'Agotado') {
        modalStatus.style.color = '#e74c3c';
    } else {
        modalStatus.style.color = 'var(--moss-green)';
    }

    modalCustom.textContent = prod.personalizable ? "Sí" : "No";
    modalDesc.textContent = prod.descripcion;
    
    modalWspLink.href = generarLinkWhatsApp(prod.nombre);

    modalOverlay.classList.add('active');
}

/**
 * Cierra el modal
 */
function cerrarModal() {
    modalOverlay.classList.remove('active');
}

// Eventos de Filtros
chips.forEach(chip => {
    chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const cat = chip.dataset.filter;
        renderizarProductos(cat);
    });
});

// Eventos del Modal
closeModalBtn.addEventListener('click', cerrarModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) cerrarModal();
});

// Renderizar todos los productos al inicio
document.addEventListener('DOMContentLoaded', () => {
    renderizarProductos('todos');
});
