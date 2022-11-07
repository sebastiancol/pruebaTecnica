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

    const name = document.getElementById('title');
    name.append(data.title)

    const price = document.getElementById('price');
    price.append(data.price)

    const price_max = document.getElementById('preciHigh');
    price_max.append(data.price_max)

    const description = document.getElementById('description');
    description.innerHTML = `<p>${data.description} </p>`
    
    const fotos = data.images
    //console.log(fotos)
    fotos.forEach(f => {
       
        const img= document.createElement('img');
        img.src=f.images;                   
        document.getElementById('images').append(img)
        
    });

    //<p>${data.variants}</p>

    const variants = data.variants
    let info= []
    variants.forEach(f =>{
        const options= document.createElement('option')
        options.value=f.options
        info.push(options)
        //const option2= document.createElement('option')
        ///option2.value=f.option2
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


