window.addEventListener('load', () =>{
    
    apiRequest()
});

async function apiRequest(){
    //console.log('entrando')
    // en este funcion usamos fetch para enlazar la api
    await fetch('https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js') 
    .then(Response=>Response.json())
    .then(data=>{
       dataApi(data);
    })
    .catch(errorApi)
}


function dataApi(data){

    //en esta funcion damos manejos a los datos obtenidos de la api
    
    /* ok nombre
    okprecio real
    ok precio mas alto %   
    ok descripcion
    ok galeria de imagenes
    ok variantes del prpoducto (s/m/l) y su respectivo precio*/

    console.log(data)

    //aca traemos el valor del nombre
    const name = document.getElementById('title');
    name.append(data.title)

    //aca traemos el valor del precio
    const price = document.getElementById('price');
    price.append(data.price)

    //aca traemos el precio maximo
    const price_max = document.getElementById('preciHigh');
    price_max.append(data.price_max)

    //aca traemos el valor de la descipcion del producto
    const description = document.getElementById('description');
    description.innerHTML = `<p>${data.description} </p>`
    
    //aca traemos las imagenes
    const fotos = data.images
    //console.log(fotos)
    let photos = [];
    photos.push(fotos)

    for(let i in photos){
        const img= document.createElement('img');
        img.src=photos[i][0]
        img.alt="imagen1"
        const img2= document.createElement('img');
        img2.src=photos[i][1]
        const img3 = document.createElement('img');
        img3.src=photos[i][2]
        const img4 = document.createElement('img');
        img4.src=photos[i][3]
        document.getElementById('images').append(img,img2,img3,img4)
    }

    /*fotos.forEach(f => {
       
        const img= document.createElement('img');
      
            img.src=f.images;   
        
                        
        document.getElementById('images').append(img)
        
    });*/

 
    //aca traemos la informacion de las variantes del producto
    const variants = data.variants
    let varianst_data= []
    variants.forEach(f =>{
        const options= document.createElement('option')
        options.value=f.options
        varianst_data.push(options)
       for(let i in varianst_data){
         //const variant = varianst_data[i][0]
         //const size = varianst_data[i][1]
         console.log(varianst_data[i])
       }
        document.getElementById('options').appendChild(options);
    })
    //console.log(variants)

      
    
}

function errorApi(){
    //funcionn de error si la api falla
    console.log('error en la api')
}  

/*
const variants = document.getElementById('variants');
variants.addEventListener('submit', (event)=>{
    event.preventDefault();
})*/


/*const modal = document.getElementById('agregar');
//modal.addEventListener('click',modalWindow)

async function modalWindow(){
    await fetch('/assets/views/modal.html')
    .then(modalInfo)
    .catch(errorModal)
}

function modalInfo(){
    console.log('modal ok')
}


function errorModal(){
    console.log('error en el modal')
}*/

//acciones de la ventana modal
if(document.getElementById("btnModal")){
    let modal2 = document.getElementById("myModal");
    let btn = document.getElementById("btnModal");
    let span = document.getElementsByClassName("close")[0];
    let body = document.getElementsByTagName("body")[0];

    btn.onclick = function() {
        modal2.style.display = "block";

        body.style.position = "static";
        body.style.height = "100%";
        body.style.overflow = "hidden";
    }

    span.onclick = function() {
        modal2.style.display = "none";

        body.style.position = "inherit";
        body.style.height = "auto";
        body.style.overflow = "visible";
    }

    window.onclick = function(event) {
        if (event.target == modal2) {
            modal2.style.display = "none";

            body.style.position = "inherit";
            body.style.height = "auto";
            body.style.overflow = "visible";
        }
    }
}

//aca esta la funcionalida del carrosuel
const main = document.querySelector('.main')
const point = document.querySelectorAll('.point')

point.forEach( (eachPoint,i)=>{
    point[i].addEventListener('click',()=>{
        let position =i;
        let operation = position * -25

        main.style.transform = `translateX(${ operation}%)`

        point.forEach((eachPoint,i)=>{
            point[i].classList.remove('active');
        })
        point[i].classList.add('active');
    })
} );

