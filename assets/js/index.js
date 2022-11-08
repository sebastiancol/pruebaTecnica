window.onload = () => {
    getData();
    const elem = document.querySelector('.carousel');
    new Flickity(elem, {
        imagesLoaded: true,
        percentPosition: false,
        draggable: false,
        freeScroll: true,
        wrapAround: true,
        autoPlay: true
    });
}

const productData = {};

function getData() {
    ///funcion que trae la data del api
    fetch('https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            drawComponents(data);
        })
        .catch(err => console.error(err));
}

function drawComponents(data) {
    const { title, price_max, compare_at_price, options, media, description } = data;

    const header = document.querySelector('#header');
    header.innerHTML = getHeaderComponent(title, price_max, compare_at_price);

    const carousel = document.querySelector('#carousel');
    const images = media.map(m => m.src);
    carousel.innerHTML = getCarousel(images);

    const color = document.querySelector('#color');
    const colors = options.filter(option => option.name === 'Color');
    color.innerHTML = getColorComponent(colors);

    const size = document.querySelector('#size');
    const sizes = options.filter(option => option.name === 'Size');
    size.innerHTML = getSizeComponent(sizes);

    const price = document.querySelector('#price');
    price.innerHTML = getPriceComponent(price_max);

    document.querySelector('#buttons').innerHTML = getButtonsComponent();
    document.getElementById('favoriteBtn').addEventListener('click', addFavorite);
    document.getElementById('cartBtn').addEventListener('click', addCart);

    document.querySelectorAll('.dot').forEach(el => {
        el.addEventListener('click', evt => {
            const { target } = evt;
            const backgroundColor = window.getComputedStyle(target, null).getPropertyValue('background-color');
            target.style.border = '2px solid black';
            productData['color'] = backgroundColor;
        });
    });

    document.querySelectorAll('.square').forEach(el => {
        el.addEventListener('click', evt => {
            const { target } = evt;
            const size = target.innerText;
            target.style.border = '2px solid black';
            target.style.fontWeight = 'bold';
            target.style.color = 'black';
            productData['size'] = size;
        });
    });

    document.querySelector('#description').innerHTML = description;
}

function getCarousel(images) {
    //funcion que trae las imagenes
    let template = '';

    images.forEach(src => {
        template += `
            <img src='${src}' />
        `;
    });

    return template;
}

/**componente del header */

function getHeaderComponent(title, price_max, compare_at_price) {
    return `
        <h1 class='header-title'>${title}</h1>
        <span class='price-max'>$${getFormattedPrice(price_max)}</span>
        <span class='compare-at-price'>$${getFormattedPrice(compare_at_price)}</span>
        <hr/>
    `;
}

function getFormattedPrice(price) {
    return (price / 100).toFixed(2);
}

/**End Header Component */


/**Color Component */

function getColorComponent(colors) {
    const [{ name, values }] = colors;
    let template = `<span class='color-text'>${name}: </span>`;

    values.forEach(color => {
        template += `
            <span class="dot" style='background-color: ${color.toLowerCase()}'></span>
        `;
    });

    return `
        ${template}
        <hr />
    `;
}

/**End Color Component */


/**Size Component */

function getSizeComponent(sizes) {
    const [{ name, values }] = sizes;
    let template = `<span class='size-text'>${name}: </span>`;

    values.forEach(size => {
        template += `
            <span class="square">${size}</span>
        `;
    });

    return `
        ${template}
        <hr />
    `;
}

/**End Size Component */


/**Price Component */

function getPriceComponent(price_max) {
    return `
        <div class="counter">
            <span class="down" onClick='decreaseCount(event, this, ${price_max})'>-</span>
            <input type="text" value="1" id="counter-value">
            <span class="up" onClick='increaseCount(event, this, ${price_max})'>+</span>
        </div>
        <div>
            <span style="color: #ccc; font-weight: bold">
                Total Price: <span id='total-price' style="color: #555">
                    ${getTotalPrice(1, price_max)}
                </span>
            </span>
        </div>
    `;
}

function decreaseCount(event, element, price_max) {
    const input = document.getElementById('counter-value');
    const totalPrice = document.getElementById('total-price');
    let value = parseInt(input.value, 10);

    if (value > 1) {
        value = isNaN(value) ? 0 : value;
        value--;
        input.value = value;
        totalPrice.innerHTML = getTotalPrice(input.value, price_max);
    }
}

function increaseCount(event, element, price_max) {
    const input = document.getElementById('counter-value');
    const totalPrice = document.getElementById('total-price');
    let value = parseInt(input.value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    input.value = value;
    totalPrice.innerHTML = getTotalPrice(input.value, price_max);
}

function getTotalPrice(value, price) {
    return `$ ${((value * price) / 100)}`;
}

/**End Price Component */

/**Buttons Component */

function getButtonsComponent() {
    return `
        <button class="favorite" id="favoriteBtn">Add to favorite</button>
        <button class="cart" id="cartBtn">Add to cart</button>
    `;
}

function addFavorite(evt) {
    evt.preventDefault();
    alert('Add to favorite');

}

function addCart(evt) {
    evt.preventDefault();
    if (JSON.stringify(productData) !== '{}') {
        alert(`
            Color: ${productData.color}
            Size: ${productData.size}
        `);
    } else {
        alert('Product no selected.')
    }
}

/**End Buttons Component */








