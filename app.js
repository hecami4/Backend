/*var http = require("http");
var fs   = require("fs");

var server = http.createServer(function(req,res){
  res.writeHead(200,{'Content-Type':'text/html'});
  var myReadStream = fs.createReadStream(__dirname+"/index.html","utf-8")
  //res.end("It is working!\n")
  myReadStream.pipe(res);
}).listen(3000);
console.log('Server running on port 3000')
*/
document.getElementById("checkPersonalizada").checked = false;
getJsonData();

$(document).ready(function(){
   $('select').formSelect();
   //$('select').material_select();
   var instance = M.FormSelect.getInstance('select');
    });

 //Inicializador del elemento Slider
$("#rangoPrecio").ionRangeSlider({
  type: "double",
  grid: false,
  min: 0,
  max: 100000,
  from: 0,
  to: 100000,
  prefix: "$",
  onFinish:function(data){
    var limSup= data.to
    var limInf= data.from
    //resultados();
  }
  })
const limSup= $("#rangoPrecio").to
console.log(limSup)
const limInf= $("#rangoPrecio").from
console.dir(limInf)

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

//PRIMERO TRAEMOS LOS DATOS
function getJsonData(){
	//limpiamos  en caso de que haya algo
	$("#aqui").html('');
	//llamamamos JSON con Jquery
	$.getJSON( "data.json", function( data ) {
		//asignamos datos al contenedor de datos
		misDatosJson = data;
    creaCatalogos();
	});
}

//Capturamos los valores del slider
function updateRango(){
	rango = $('#rangoPrecio').val();
  $("#rangoSeleccionado").html("Rango: " + rango);
  var rangoCurrent = rango.split(";");
  Current0 = rangoCurrent[0];
  Current1 = rangoCurrent[1];
}
updateRango();

//PROCESA TODOS LOS DATOS ANTES DE QUE SE VEAN LOS FILTROS
function processData(){
  console.log("Tamanio de misdatosJson");
	console.log(misDatosJson.length);
	var currentHtml;
	// si hay datos, los procesamos:
	if(misDatosJson.length > 0){
		hayDatos = true;
		var rangoCurrent = rango.split(";");

  	$.each( misDatosJson, function( key, value ) {
    		console.log("-------------- LLAVE: " + key + " PRECIO" + value.Precio);
  			if(document.getElementById('checkPersonalizada').checked){

  			} else {
        	currentHtml = "<div class='card horizontal'>"
          + "<div class='card-image'>"
          + "<img src='img/home.jpg'> </div>"
          + "<div class='card-stacked'>"
          + "<div class='card-content'>"
          + "<div><b> Direccion: </b> <p>"+ value.Direccion +"</p> </div>"
	  			+ "<div><b> Ciudad: </b> <p>"+value.Ciudad +"</p> </div>"
	  			+ "<div><b> Telefono: </b> <p>"+value.Telefono +"</p> </div>"
	  			+ "<div><b> Codigo Postal: </b> <p>"+value.Codigo_Postal +"</p> </div>"
	  			+ "<div><b> Precio: </b> <p>"+value.Precio +"</p> </div>"
	  			+ "<div><b> Tipo: </b> <p>"+value.Tipo +"</p> </div> </div>"
          + "<div class='card-action right-align'><a href='#'>Ver más</a></div> "
          + "</div></div>";
  			}
  			$("#aqui").append( currentHtml );

		});
	}

}

//ESTABLECE VALORES PARA ELEGIR RUTINA DE MUESTRA DE PROPIEDADES

function eligefiltros(){
  var valorCiudad;
  var valorTipo;
  var personal = document.getElementById('checkPersonalizada').checked

  if (typeof(selectedCity) ==='undefined' || selectedCity ==='undefined'){
    valorCiudad = 'nada'
  } else {valorCiudad = 'algo'}

  if (typeof(selectedType) ==='undefined' || selectedType ==='undefined'){
    valorTipo = 'nada'
  } else {valorTipo='algo'}

 if (personal == false) {
   console.log('processdata')
   processData();
 } else if ( valorCiudad === 'algo' && valorTipo === 'nada') {
       console.log('todoCiudades')
       //console.log('ciudad '+selectedCity + ' tipo'+selectedType)
       todoCiudades();
     } else if (valorCiudad === 'nada' && valorTipo === 'algo' ){
                      console.log('todoTipos')
                      //console.log('ciudad '+selectedCity + ' tipo'+selectedType)
                      todoTipos();
            }else if (valorCiudad === 'nada' && valorTipo === 'nada'){
                        console.log('soloPrecio')
                        //console.log('ciudad '+selectedCity + ' tipo'+selectedType)
                        soloPrecio();
                } else  if (valorCiudad === 'algo' && valorTipo === 'algo') {
           console.log('todojunto')
           //console.log('ciudad '+selectedCity + ' tipo'+selectedType)
           todojunto();
 } else {processData();}
};

/*
 *  VALORES DE FILTROS
 */

   $("#ciudad").change(function() {
   selectedCity=  $('select#ciudad').val();
   console.log("ciudad "+selectedCity);
   //resultados();
});

   $("#tipo").change(function() {
   selectedType=  $('select#tipo').val();
   console.log("tipo "+selectedType);
  //resultados();
   });

   $("#rangoPrecio").on("change", function(){
     var $inp = $(this);
     var limInf1 = $inp.data("from");
     var limSup1 = $inp.data("to");
   })

//LLENAMOS CATALOGOS PARA FILTROS

function creaCatalogos(){
  var UniqueCities= $.unique(misDatosJson.map(function (d) {return d.Ciudad;}));
  var setCities = new Set(UniqueCities);
  UniqueCities = Array.from(setCities);
  console.log(UniqueCities);
  var UniqueTypes= $.unique(misDatosJson.map(function (d) {return d.Tipo;}));
  var setTypes = new Set(UniqueTypes);
  UniqueTypes = Array.from(setTypes);
  console.log(UniqueTypes)
  $('.ciudad').html('<option value="undefined"> Todas las ciudades </option>');
  $('.tipo').html('<option value="undefined"> Todos los tipos </option>');

UniqueCities.forEach(function(element0){
  Ciudades= document.getElementById("ciudad");
  console.log(element0);
  $('.ciudad').formSelect().append($("<option value='"+element0+"'>"+element0+"</option>"))
  $('select').formSelect();

});

UniqueTypes.forEach(function(element1){
  Tipos= document.getElementById("tipo");
  console.log(element1);
  $('.tipo').formSelect().append($("<option value='"+element1+"'>"+element1+"</option>"))
  $('select').formSelect();
  updateRango();
});

}

//CUANDO SOLO HAY CIUDAD SELECCIONADA
function todoCiudades(){
  $("#aqui").html('');
  var currentHtml;
  var output = misDatosJson.filter(function(x){
    return x.Ciudad == selectedCity &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) <= Current1 &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) >= Current0
         });
    console.log("lsargo output "+output.length)
    output.forEach(function(Object){
      /*$.each(output, function(Object){*/
      currentHtml = "<div></div";
      currentHtml = "<div class='card horizontal'>"
                  + "<div class='card-image'>"
                  + "<img src='img/home.jpg'> </div>"
                  + "<div class='card-stacked'>"
                  + "<div class='card-content'>"
                  + "<div><b> Direccion: </b> <p>"+ Object.Direccion +"</p> </div>"
	  			        + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
	  			        + "<div><b> Telefono: </b> <p>"+Object.Telefono +"</p> </div>"
	  			        + "<div><b> Codigo Postal: </b> <p>"+Object.Codigo_Postal +"</p> </div>"
	  			        + "<div><b> Precio: </b> <p>"+Object.Precio +"</p> </div>"
	  			        + "<div><b> Tipo: </b> <p>"+Object.Tipo +"</p> </div> </div>"
                  + "<div class='card-action right-align'><a href='#'>Ver más</a></div> "
                  + "</div></div>";
      $("#aqui").append( currentHtml );
    })
}

//CUANDO SOLO HAY TIPO SELECCIONADO
function todoTipos(){
  $("#aqui").html('');
  var currentHtml;
  var output = misDatosJson.filter(function(x){
    return x.Tipo   == selectedType &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) <= Current1 &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) >= Current0
         });
    console.log("lsargo output "+output.length)
    output.forEach(function(Object){
      currentHtml = "<div></div";
      currentHtml = "<div class='card horizontal'>"
                  + "<div class='card-image'>"
                  + "<img src='img/home.jpg'> </div>"
                  + "<div class='card-stacked'>"
                  + "<div class='card-content'>"
                  + "<div><b> Direccion: </b> <p>"+ Object.Direccion +"</p> </div>"
	  			        + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
	  			        + "<div><b> Telefono: </b> <p>"+Object.Telefono +"</p> </div>"
	  			        + "<div><b> Codigo Postal: </b> <p>"+Object.Codigo_Postal +"</p> </div>"
	  			        + "<div><b> Precio: </b> <p>"+Object.Precio +"</p> </div>"
	  			        + "<div><b> Tipo: </b> <p>"+Object.Tipo +"</p> </div> </div>"
                  + "<div class='card-action right-align'><a href='#'>Ver más</a></div> "
                  + "</div></div>";
      $("#aqui").append( currentHtml );
    })
}

//CUANDO NO HAY NI CIUDAD NI TIPO SELECCIONADO FILTRAMOS POR VALORES
function soloPrecio(){
  $("#aqui").html('');
  var currentHtml;
  var output = misDatosJson.filter(function(x){
    return Number(x.Precio.replace(/[^0-9.-]+/g,"")) <= Current1 &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) >= Current0
         });
    console.log("lsargo output "+output.length)
    output.forEach(function(Object){
      currentHtml = "<div></div";
      currentHtml = "<div class='card horizontal'>"
                  + "<div class='card-image'>"
                  + "<img src='img/home.jpg'> </div>"
                  + "<div class='card-stacked'>"
                  + "<div class='card-content'>"
                  + "<div><b> Direccion: </b> <p>"+ Object.Direccion +"</p> </div>"
	  			        + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
	  			        + "<div><b> Telefono: </b> <p>"+Object.Telefono +"</p> </div>"
	  			        + "<div><b> Codigo Postal: </b> <p>"+Object.Codigo_Postal +"</p> </div>"
	  			        + "<div><b> Precio: </b> <p>"+Object.Precio +"</p> </div>"
	  			        + "<div><b> Tipo: </b> <p>"+Object.Tipo +"</p> </div> </div>"
                  + "<div class='card-action right-align'><a href='#'>Ver más</a></div> "
                  + "</div></div>";
      $("#aqui").append( currentHtml );
    })
}

//CUANDO TODOS LOS FILTROS TIENEN VALORES
function todojunto(){
  $("#aqui").html('');
  var currentHtml;
  var output = misDatosJson.filter(function(x){
    return x.Ciudad == selectedCity &&
           x.Tipo == selectedType &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) <= Current1 &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) >= Current0
         });
    console.log("lsargo output "+output.length)
    output.forEach(function(Object){
      currentHtml = "<div></div";
      currentHtml = "<div class='card horizontal'>"
                  + "<div class='card-image'>"
                  + "<img src='img/home.jpg'> </div>"
                  + "<div class='card-stacked'>"
                  + "<div class='card-content'>"
                  + "<div><b> Direccion: </b> <p>"+ Object.Direccion +"</p> </div>"
	  			        + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
	  			        + "<div><b> Telefono: </b> <p>"+Object.Telefono +"</p> </div>"
	  			        + "<div><b> Codigo Postal: </b> <p>"+Object.Codigo_Postal +"</p> </div>"
	  			        + "<div><b> Precio: </b> <p>"+Object.Precio +"</p> </div>"
	  			        + "<div><b> Tipo: </b> <p>"+Object.Tipo +"</p> </div> </div>"
                  + "<div class='card-action right-align'><a href='#'>Ver más</a></div> "
                  + "</div></div>";
      $("#aqui").append( currentHtml );
    })
}
