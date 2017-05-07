function traducirMes(texto){
    var mes=texto.substring(0,texto.indexOf(" "));
    switch(mes){
        case "January":mes="Enero";break;
        case "February":mes="Febrero";break;
        case "March":mes="Marzo";break;
        case "April":mes="Abril";break;
        case "May":mes="Mayo";break;
        case "June":mes="Junio";break;
        case "July":mes="Julio";break;
        case "August":mes="Agosto";break;
        case "September":mes="Septiembre";break;
        case "October":mes="Octubre";break;
        case "November":mes="Noviembre";break;
        case "December":mes="Diciembre";break;
    }
    return mes+texto.substring(texto.indexOf(" "));
}

setInterval(function(){
    var h=$(".fc-left h2")[0];
    if(h)h.innerText=traducirMes(h.innerText);
    h=$(".fc-head .fc-sun span")[0];if(h)h.innerText="Domingo";
    h=$(".fc-head .fc-mon span")[0];if(h)h.innerText="Lunes";
    h=$(".fc-head .fc-tue span")[0];if(h)h.innerText="Martes";
    h=$(".fc-head .fc-wed span")[0];if(h)h.innerText="Miercoles";
    h=$(".fc-head .fc-thu span")[0];if(h)h.innerText="Jueves";
    h=$(".fc-head .fc-fri span")[0];if(h)h.innerText="Viernes";
    h=$(".fc-head .fc-sat span")[0];if(h)h.innerText="Sabado";
}, 1000);