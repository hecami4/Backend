/*"use strict";
var http = require("http")
http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text/plain'});
  res.end("It is working!\n")
}).listen(3000);
console.log('Server running on port 3000')
*/
$(document).ready(function(){
   $('select').formSelect();
 });

 //Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 0,
  to: 0,
  prefix: "$"
})

function setSearch() {
  let busqueda = $('#checkPersonalizada')
  busqueda.on('change', (e) => {
    if (this.customSearch == false) {
      this.customSearch = true
    } else {
      this.customSearch = false
    }
    $('#personalizada').toggleClass('invisible')
  })
}

setSearch()

/**
 * PROCESAMOS JSON
 */
//inicializamos el contenedor de datos
let misDatosJson;
let hayDatos = false;
let rango = "0;0";
let ciudades;
let tipos;

//PRIMERO
function getJsonData(){
	//limpiamos en caso de que haya algo
	$(".misdatos").html('');
	//llamamamos JSON con Jquery
	// PHP i.e. $jsonData = json_decode(file_get_content("/mike/data-1.json"));
	$.getJSON( "data.json", function( data ) {
		//asignamos datos al contenedor de datos
		misDatosJson = data;
		//console.log(misDatosJson);
		//ya que estan asignados, los procesamos
		processData();
    creaCatalogos();
	});
}


//SEGUNDO
function processData(){
	console.log("Tamanio de misdatosJson");
	console.log(misDatosJson.length);

	var currentHtml;
	// si si tenemos datos, los procesamos:
	if(misDatosJson.length > 0){
		hayDatos = true;
		var rangoCurrent = rango.split(";");
		//console.log(rangoCurrent[0]);
		var filtroPorRango = false;

    // aquí comienza mi Prueba

		$.each( misDatosJson, function( key, value ) {
  			console.log("-------------- LLAVE: " + key + " PRECIO" + value.Precio);
  			//Solo queremos displayType dentro de cada elemento de "misDatosJson"
  			if(rangoCurrent[1] > 0 ){
  				filtroPorRango = true;
  			}
  			currentHtml = "";

  			if(filtroPorRango){
  				var currentPrecio = value.Precio.replace("$", "");
  				 currentPrecio = parseInt(currentPrecio.replace(",", ""));
  				 console.log(currentPrecio + " LI: " +  rangoCurrent[0]  + " LS: "+  rangoCurrent[1]);
  				if(currentPrecio > rangoCurrent[0] && currentPrecio < rangoCurrent[1]){
  					console.log( value.Id );
		  			currentHtml = "<div><p>ID: "+ value.Id
		  			+ "<br>"+value.Tipo +""
		  			+ "<br>"+value.Precio +""
		  			+ "<br>"+value.Telefono +""
		  			+ "<br>"+value.Direccion +""
		  			+ "<br>"+value.Ciudad +", CP "+value.Codigo_Postal +"</p><hr /></div>";
  				}
  			} else {
  				currentHtml = "<div><p>ID: "+ value.Id
	  			+ "<br>"+value.Tipo +""
	  			+ "<br>"+value.Precio +""
	  			+ "<br>"+value.Telefono +""
	  			+ "<br>"+value.Direccion +""
	  			+ "<br>"+value.Ciudad +", CP "+value.Codigo_Postal +"</p><hr /></div>";
  			}
  			$(".misdatos").append( currentHtml );

		});
	}

}

/*
 * JALAMOS FILTROS
 */

function updateRango(){
	rango = $('#rangoPrecio').val();
	$("#rangoSeleccionado").html("Rango: " + rango);
  //$("#ciudad").html("Ciudad: " + ciudad);
}
updateRango();

function creaCatalogos(){
  //ciudades += misDatosJson[i];
  var UniqueCities= $.unique(misDatosJson.map(function (d) {return d.Ciudad;}));
  //console.log(UniqueCities);
  var setCities = new Set(UniqueCities);
  UniqueCities = Array.from(setCities);
  console.log(UniqueCities);
  var UniqueTypes= $.unique(misDatosJson.map(function (d) {return d.Tipo;}));
  //console.log(UniqueTypes);
  var setTypes = new Set(UniqueTypes);
  UniqueTypes = Array.from(setTypes);
  console.log(UniqueTypes)
  //Ciudades = misDatosJson[index].Ciudad.distinct;
  //console.log ("catalogo ciudades " +Ciudades);

UniqueCities.forEach(function(element0){
  Ciudades= document.getElementById("ciudad");
  console.log(element0);
  Ciudades.innerHTML += "<option>"+element0+"</option>"
});

UniqueTypes.forEach(function(element1){
  Tipos= document.getElementById("tipo");
  console.log(element1);
  Tipos.innerHTML += "<option>"+element1+"</option>"
});

}
