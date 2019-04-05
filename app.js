document.getElementById("checkPersonalizada").checked = false; //asegura que personalizada siempre inicie "apagada"
getJsonData(); //procesa datos desde que abre

//inicializa los dropdowns
$(document).ready(function(){
   $('select').formSelect();
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
  onStart: function(data){
    from=0,
    to=100000
  },
  onFinish:function(data){
    var limSup= data.to
    var limInf= data.from

  }
  })
const limSup= $("#rangoPrecio").to
//console.log(limSup)
const limInf= $("#rangoPrecio").from
//console.dir(limInf)

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
	$(".card-content").html('');
	//llamamamos JSON con Jquery
	$.getJSON( "data.json", function( data ) {
		//asignamos datos al contenedor de datos
		misDatosJson = data;
  	//ya que estan asignados, los procesamos para caatalogos
    creaCatalogos();
	});
}
//Inicializa el slider de 0-a100 o lee los valores
function updateRango(){
	rango = $('#rangoPrecio').val();
  if(rango==""){
      Current0=0;
      Current1=100000;
      }else {
  $("#rangoSeleccionado").html("Rango: " + rango);
  var rangoCurrent = rango.split(";");
  console.log(rangoCurrent)
  Current0 = rangoCurrent[0];
  Current1 = rangoCurrent[1];
}

}
updateRango();

//SEGUNDO
function processData(){
  //console.log("Tamanio de misdatosJson");
	//console.log(misDatosJson.length);
	var currentHtml;
  $('#aqui').html('')
	// si si tenemos datos, los procesamos:
	if(misDatosJson.length > 0){
		hayDatos = true;
		var rangoCurrent = rango.split(";");
	  //console.log(filtroPorRango);
  	$.each( misDatosJson, function( key, value ) {
    		// revisa el tamaño y llaves del arreglo console.log("-------------- LLAVE: " + key + " PRECIO" + value.Precio);
  			  currentHtml = "<div class='card horizontal'>"
          + "<div class='card-image'><img src='img/home.jpg'> </div>"
          + "<div class='card-stacked'>"
          + "<div class='card-content'>"
          + "<div><b> Direccion: </b> <p>"+ value.Direccion +"</p> </div>"
	  			+ "<div><b> Ciudad: </b> <p>"+value.Ciudad +"</p> </div>"
	  			+ "<div><b> Telefono: </b> <p>"+value.Telefono +"</p> </div>"
	  			+ "<div><b> Codigo Postal: </b> <p>"+value.Codigo_Postal +"</p> </div>"
	  			+ "<div><b> Precio: </b> <p>"+value.Precio +"</p> </div>"
	  			+ "<div><b> Ciudad: </b> <p>"+value.Ciudad +"</p> </div>"
          + "<div><b> Tipo: </b> <p>"+value.Tipo +"</p> </div> </div>"
          + "<div class='card-action right-align'>"
          + "<a href='#'>Ver más</a> </div> </div> </div>";
  			$("#aqui").append( currentHtml );
		});
	}
}

 //Define la rutina a seguir
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
   //console.log('processdata')
   processData();
 } else if ( valorCiudad === 'algo' && valorTipo === 'nada') {
    //   console.log('todoCiudades')
       //console.log('ciudad '+selectedCity + ' tipo'+selectedType)
       todoCiudades();
     } else if (valorCiudad === 'nada' && valorTipo === 'algo' ){
      //                console.log('todoTipos')
                      //console.log('ciudad '+selectedCity + ' tipo'+selectedType)
                      todoTipos();
            }else if (valorCiudad === 'nada' && valorTipo === 'nada'){
        //                console.log('soloPrecio')
                        //console.log('ciudad '+selectedCity + ' tipo'+selectedType)
                        soloPrecio();
                } else  if (valorCiudad === 'algo' && valorTipo === 'algo') {
          // console.log('todojunto')
           //console.log('ciudad '+selectedCity + ' tipo'+selectedType)
           todojunto();
 } else {processData();}
};

/*
 * JALAMOS FILTROS
 */

   $("#ciudad").change(function() {
   selectedCity=  $('select#ciudad').val();
   //console.log("ciudad "+selectedCity);

});

   $("#tipo").change(function() {
   selectedType=  $('select#tipo').val();
   //console.log("tipo "+selectedType);

   });

   $("#rangoPrecio").on("change", function(){
     var $inp = $(this);
     var limInf1 = $inp.data("from");
     var limSup1 = $inp.data("to");
   })


//llena los dropdowns con las ciudades en json
function creaCatalogos(){
  //ciudades += misDatosJson[i];
  var UniqueCities= $.unique(misDatosJson.map(function (d) {return d.Ciudad;}));
  //console.log(UniqueCities);
  var setCities = new Set(UniqueCities);
  UniqueCities = Array.from(setCities);
  var UniqueTypes= $.unique(misDatosJson.map(function (d) {return d.Tipo;}));
  //console.log(UniqueTypes);
  var setTypes = new Set(UniqueTypes);
  UniqueTypes = Array.from(setTypes);
  $('.ciudad').html('<option value="undefined"> Todas las ciudades </option>');
  $('.tipo').html('<option value="undefined"> Todos los tipos </option>');
  //Ciudades = misDatosJson[index].Ciudad.distinct;
  //console.log ("catalogo ciudades " +Ciudades);

UniqueCities.forEach(function(element0){
  Ciudades= document.getElementById("ciudad");
  $('.ciudad').formSelect().append($("<option value='"+element0+"'>"+element0+"</option>"))
  $('select').formSelect();

});

UniqueTypes.forEach(function(element1){
  Tipos= document.getElementById("tipo");
  $('.tipo').formSelect().append($("<option value='"+element1+"'>"+element1+"</option>"))
  $('select').formSelect();
  updateRango();
});

}

//ejecuta rutinas y muestra resultados
function todoCiudades(){
  $("#aqui").html('');
  var currentHtml;
  var output = misDatosJson.filter(function(x){
    return x.Ciudad == selectedCity &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) <= Current1 &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) >= Current0
         });
    //console.log("lsargo output "+output.length)
    output.forEach(function(Object){
      /*$.each(output, function(Object){*/
      currentHtml = "<div></div";
      currentHtml = "<div class='card horizontal'>"
      + "<div class='card-image'><img src='img/home.jpg'> </div>"
      + "<div class='card-stacked'>"
      + "<div class='card-content'>"
      + "<div><b> Direccion: </b> <p>"+ Object.Direccion +"</p> </div>"
      + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
      + "<div><b> Telefono: </b> <p>"+Object.Telefono +"</p> </div>"
      + "<div><b> Codigo Postal: </b> <p>"+Object.Codigo_Postal +"</p> </div>"
      + "<div><b> Precio: </b> <p>"+Object.Precio +"</p> </div>"
      + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
      + "<div><b> Tipo: </b> <p>"+Object.Tipo +"</p> </div> </div>"
      + "<div class='card-action right-align'><a href='#'>Ver más</a></div>"
      + "</div></div>";
      $("#aqui").append( currentHtml );
    })
}


function todoTipos(){
  $("#aqui").html('');
  var currentHtml;
  var output = misDatosJson.filter(function(x){
    return x.Tipo   == selectedType &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) <= Current1 &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) >= Current0
         });
    //console.log("lsargo output "+output.length)
    output.forEach(function(Object){
      /*$.each(output, function(Object){*/
      currentHtml = "<div></div";
      currentHtml = "<div class='card horizontal'>"
      + "<div class='card-image'><img src='img/home.jpg'> </div>"
      + "<div class='card-stacked'>"
      + "<div class='card-content'>"
      + "<div><b> Direccion: </b> <p>"+ Object.Direccion +"</p> </div>"
      + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
      + "<div><b> Telefono: </b> <p>"+Object.Telefono +"</p> </div>"
      + "<div><b> Codigo Postal: </b> <p>"+Object.Codigo_Postal +"</p> </div>"
      + "<div><b> Precio: </b> <p>"+Object.Precio +"</p> </div>"
      + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
      + "<div><b> Tipo: </b> <p>"+Object.Tipo +"</p> </div> </div>"
      + "<div class='card-action right-align'><a href='#'>Ver más</a></div>"
      + "</div></div>";
      $("#aqui").append( currentHtml );
    })
}


function soloPrecio(){
  $("#aqui").html('');
  var currentHtml;
  var output = misDatosJson.filter(function(x){
    return Number(x.Precio.replace(/[^0-9.-]+/g,"")) <= Current1 &&
           Number(x.Precio.replace(/[^0-9.-]+/g,"")) >= Current0
         });
    //console.log("lsargo output "+output.length)
    output.forEach(function(Object){
      /*$.each(output, function(Object){*/
      currentHtml = "<div></div";
      currentHtml = "<div class='card horizontal'>"
      + "<div class='card-image'><img src='img/home.jpg'> </div>"
      + "<div class='card-stacked'>"
      + "<div class='card-content'>"
      + "<div><b> Direccion: </b> <p>"+ Object.Direccion +"</p> </div>"
      + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
      + "<div><b> Telefono: </b> <p>"+Object.Telefono +"</p> </div>"
      + "<div><b> Codigo Postal: </b> <p>"+Object.Codigo_Postal +"</p> </div>"
      + "<div><b> Precio: </b> <p>"+Object.Precio +"</p> </div>"
      + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
      + "<div><b> Tipo: </b> <p>"+Object.Tipo +"</p> </div> </div>"
      + "<div class='card-action right-align'><a href='#'>Ver más</a></div>"
      + "</div></div>";
      $("#aqui").append( currentHtml );
    })
}

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
      /*$.each(output, function(Object){*/
      currentHtml = "<div></div";
      currentHtml = "<div class='card horizontal'>"
      + "<div class='card-image'><img src='img/home.jpg'> </div>"
      + "<div class='card-stacked'>"
      + "<div class='card-content'>"
      + "<div><b> Direccion: </b> <p>"+ Object.Direccion +"</p> </div>"
      + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
      + "<div><b> Telefono: </b> <p>"+Object.Telefono +"</p> </div>"
      + "<div><b> Codigo Postal: </b> <p>"+Object.Codigo_Postal +"</p> </div>"
      + "<div><b> Precio: </b> <p>"+Object.Precio +"</p> </div>"
      + "<div><b> Ciudad: </b> <p>"+Object.Ciudad +"</p> </div>"
      + "<div><b> Tipo: </b> <p>"+Object.Tipo +"</p> </div> </div>"
      + "<div class='card-action right-align'><a href='#'>Ver más</a></div>"
      + "</div></div>";
      $("#aqui").append( currentHtml );
    })
}
