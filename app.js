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
    resultados();
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
let filtroPorRango;

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

function updateRango(){
	rango = $('#rangoPrecio').val();
  $("#rangoSeleccionado").html("Rango: " + rango);
  var rangoCurrent = rango.split(";");
  Current0 = rangoCurrent[0];
  Current1 = rangoCurrent[1];

  //console.log(rango);
}
updateRango();

function actualizaestados(){
  valorpers =document.getElementById('checkPersonalizada').checked;
  var filtroPorRango = valorpers
  console.log(filtroPorRango)
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
		//var filtroPorRango = false;
    console.log(filtroPorRango);

  	$.each( misDatosJson, function( key, value ) {
    		console.log("-------------- LLAVE: " + key + " PRECIO" + value.Precio);
  			//Solo queremos displayType dentro de cada elemento de "misDatosJson"
  /*			if(Number(Current1) < 100000 ){
  				filtroPorRango = true;
          resultados();
  			}
  			currentHtml = "";*/

  			if(document.getElementById('checkPersonalizada').checked){
    /*      var currentPrecio = value.Precio.replace("$", "");
           currentPrecio = parseInt(currentPrecio.replace(",", ""));
  				 console.log(currentPrecio + " LI: " +  rangoCurrent[0]  + " LS: "+  rangoCurrent[1]);
  				if(currentPrecio > rangoCurrent[0] && currentPrecio < rangoCurrent[1]){
  					console.log( value.Id );
		  			currentHtml = "<div><p>ID: "+ value.Id
		  			+ "<br>"+value.Tipo +""
		  			+ "<br>"+value.Precio +""
		  			+ "<br>"+value.Telefono +""
		  			+ "<br>"+value.Direccion +""
		  			+ "<br>"+value.Ciudad +", CP "+value.Codigo_Postal +"</p><hr /></div>";*/
            resultados();
  			//	}
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


$("#ciudad").change(function() {
selectedCity=  $('select#ciudad').val();
console.log("ciudad "+selectedCity),
resultados();
});

$("#tipo").change(function() {
selectedType=  $('select#tipo').val();
console.log("tipo "+selectedType);
resultados();
});

$("#rangoPrecio").on("change", function(){
  var $inp = $(this);
  var limInf1 = $inp.data("from");
  var limSup1 = $inp.data("to");
})



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
  $('.ciudad').html('<option value="" disable selected> Elige la ciudad </option>');
  $('.tipo').html('<option value="" disable selected> Escoge un tipo </option>');
  //Ciudades = misDatosJson[index].Ciudad.distinct;
  //console.log ("catalogo ciudades " +Ciudades);

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

function resultados(){

  var output = misDatosJson.filter(function(x){
    return x.Ciudad ==selectedCity &&
           x.Tipo   ==selectedType &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) <= Current1 &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) >= Current0

         });
    $.each(output, function(){
      currentHtml = "<div></div";
      currentHtml = "<div><p>ID: "+ output.Id
      + "<br>"+output.Tipo +""
      + "<br>"+output.Precio +""
      + "<br>"+output.Telefono +""
      + "<br>"+output.Direccion +""
      + "<br>"+output.Ciudad +", CP "+output.Codigo_Postal +"</p><hr /></div>";
    })

//console.log(Number(output[0].Precio.replace(/[^0-9.-]+/g,"")));
console.log(output);
console.log("liminf "+limInf);
console.log("otrolimsup "+$("#rangoPrecio").to);
console.log("limsup "+limSup);
//console.log(Number(output[0].Precio.replace(/[^0-9.-]+/g,"")));

}
