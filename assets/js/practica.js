
fetch('practica.json')
    .then(Response=>Response.json())
    .then(data=>{
        //console.log(data.nombre,data.apellido,data.Influencers)
        //console.log(data.Influencers[0])
        let datos= [];
        datos.push(data.Influencers)
        for( let i in datos){
            console.log(datos[i][2])
        }
        //console.log(datos)
        /* let info = document.getElementById('info2')
        info.innerHTML=`<p>${datos}</p>`
       for( let i in datos){
            console.log(datos[i])
        }*/
    })
    .catch(error)
function error (){
    console.log('no funciona')
}    