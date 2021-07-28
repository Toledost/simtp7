//var tablaColas = document.getElementById("tablaColas");

function obtenerInputs(){
    var cantEventos = Number(document.getElementById("cantEventos").value);
    var desde = Number(document.getElementById("mostrarDesde").value);
    var hasta = Number(document.getElementById("mostrarHasta").value);
    
    return [cantEventos, desde, hasta];
}

function intervaloBondis(){
    var intervalo = 0;
    var rnd = Math.random();
    if(rnd < 0.2){
        intervalo = 20;
    }
    else if (rnd < 0.6){
        intervalo = 40;
    }
    else if(rnd < 1){
        intervalo = 120;
    }
    return intervalo;
}

function calcularDemora(){ 
    var demora = "No demora"; // cambiar a false 
    var rnd = Math.random();
    if(rnd < 0.3){
        demora = "Sí demora";
    }
    return demora;
}

function calcularFinDemoraViaje(){
    var finDemoraViaje = intervaloBondis();
    var demora = calcularDemora()
    var minutosDemora = 5;
    if(demora == "Sí demora"){
        finDemoraViaje += minutosDemora;
    }
    return finDemoraViaje;
}

function calcularDesperfecto(){ // si el bondi sale o no sale
    var salida = "sale";
    var rnd = Math.random();
    if (rnd < 0.1){
        salida = "no sale";
    }
    return salida;
}



function generarBondis(cantEventos, desde, hasta){

    var filaTabla = [ new Array(24).fill(0), new Array(24).fill(0)];
    var grillaFinal = []; 
    var horaLlegada = 0; // de la persona

    var intervaloEntreBondis = 0;
    var proximoBondi = 0;
    var tieneDemora = "";
    var finDemoraViaje = 0; 
    var sale = "";
    var tiempoEspera = 0;
    var minutoSubida = 0;
    var acTiempoEspera = 0; 
    var acBondis = 0;
    var reloj = 0;
    

    
    for (var i=0; i<=cantEventos ; i++){
        
        var tieneDemora = calcularDemora();
        var tiempoEspera = finDemoraViaje - reloj - horaLlegada;
        
        //para reloj
        if (i == 0){ // si es la primera vez 
            var reloj = i;
        }
        if (proximoBondi <= finDemoraViaje){ // cambio a la llegada de algun bondi ( o sea cuando pasa por el Bv)
            // falta que haga el cambio de fin viaje para que lo ponga en reloj
            reloj = finDemoraViaje;
        }
        if (sale == "no sale"){
            reloj = proximoBondi - intervaloEntreBondis;
            tiempoEspera = 0;
            //intervaloEntreBondis += filaTabla[0][1];
            //console.log(reloj, tiempoEspera);
        }
        if (sale == "sale"){
            var acBondis = acBondis + 1;
        }
        
        
        var intervaloEntreBondis = intervaloBondis();
        var proximoBondi = intervaloEntreBondis + reloj;

        //para finDemoraViaje
        if(tieneDemora == "Sí demora"){ // para agregarle los 5 min si es qeu demora
            finDemoraViaje = proximoBondi + 5;
            
        }
        if(tieneDemora == "No demora"){
            finDemoraViaje = proximoBondi;
        }


        
        
        
        //para ver si sale o no sale 
        var sale = calcularDesperfecto();
        
        // ver si agregar el tiempo en el que sube al bondi, solo agregarlo en el vector insertarRegistro
        //var minutoSubida = finDemoraViaje; // agregar la condicion si hay bondi en camino 
        acTiempoEspera += tiempoEspera;
        
        
        
        

        filaTabla.splice(0, 1);
        var insertarRegistro = [reloj,intervaloEntreBondis,proximoBondi,tieneDemora,finDemoraViaje,sale,tiempoEspera,acTiempoEspera,acBondis];
        
        console.log(acTiempoEspera,acBondis);
        var resultado = acTiempoEspera/acBondis;
        document.getElementById("resultado").innerHTML = resultado;

        filaTabla.push(insertarRegistro);
    
        if((i >= desde && i <= hasta) || i == cantEventos) {
            grillaFinal.push(insertarRegistro);
        }
    }
    
    console.log(grillaFinal); 
    
    return grillaFinal;
}


function rellenarTabla() {

    var cantEventos = obtenerInputs()[0];
    var desde = obtenerInputs()[1];
    var hasta = obtenerInputs()[2];

    tablaColas.innerHTML = "<tr><th>Reloj</th><th>Intervalo entre colectivos</th><th>Próximo colectivo</th><th>Tiene demora</th><th>Fin demora viaje</th><th>Sale</th><th>Tiempo de espera</th><th>AC tiempo de espera </th><th>Acumulador de colectivos</th></tr>";
    var grilla;
    grilla = generarBondis(cantEventos,desde,hasta);
    for(var i=0; i<grilla.length; i++) {
        var cadena = '<tr><td>' + grilla[i][0] +'</td>'
        cadena += '<td>' + (grilla[i][1]) + '</td>';
        cadena += '<td>' + (grilla[i][2]) + '</td>';
        cadena += '<td>' + grilla[i][3] + '</td>';
        cadena += '<td>' + grilla[i][4] + '</td>';
        cadena += '<td>' + grilla[i][5] + '</td>';
        if(i == grilla.length-1) {
            cadena += '<td class="metrica">' + grilla[i][6] + '</td>';
            cadena += '<td class="metrica">' + grilla[i][7] + '</td>';
            cadena += '<td class="metrica">' + grilla[i][8] + '</td></tr>';
            //cadena += '<td class="metrica">' + grilla[i][9] + '</td></tr>';
        } else {
            cadena += '<td>' + grilla[i][6] + '</td>';
            cadena += '<td>' + grilla[i][7] + '</td>';
            cadena += '<td>' + grilla[i][8] + '</td></tr>';
            //cadena += '<td>' + grilla[i][9] + '</td></tr>';
        }

        tablaColas.innerHTML += cadena;
    }

}


function main() {
    rellenarTabla();
    tablaColas.style.display = "block";
}

document.getElementById("btnAceptar").addEventListener('click', () => {
    main();
})

