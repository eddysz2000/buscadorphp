$(function(){

  //creacion de variables generales para el renderizado y seleccion de datos
  var Bienes = {
    formulario: $('#formulario'),
    btnTodos: $('#mostrarTodos'),
    contBienes: $('#bienes'),
    
    //carga inicial de funciones
    Init: function(){
      var self = this
      self.cargarSelect() //carga de valores de la lista de ciudades y tipos
      self.cargarTodos()  //carga de todos los datos
      self.formulario.submit(function(e){
        e.preventDefault()
        self.searchBienes()
      })
    },
    
    //funcion que permite cargar los datos de la lista de valores de los filtros del formulario
    cargarSelect: function(){
     var self = this
     var datos = {todos: ""}
     self.ajaxCiudad(datos) //lista de valores de las ciudades
     self.ajaxTipo(datos) //lista de valores de los tipos
    },

    //funcion que atiende el filtrado de datos para luego se renderizado
    searchBienes: function(e){
      var self = this
      var ciudad = $('form').find('select[id="selectCiudad"]').val()
      var tipo = $('form').find('select[id="selectTipo"]').val()
      var from = self.toNumero($('.irs-from').text())
      var to = self.toNumero($('.irs-to').text())
      var todos = ''

      var datos = {todos: todos, ciudad: ciudad, tipo: tipo, from: from, to: to}
      self.ajaxData(datos)
    },

    //funcion que carga todos los datos ignorando los filtros
    cargarTodos: function(){
      var self = this
      var ciudad = ''
      var tipo = ''
      var from = ''
      var to = ''
      self.btnTodos.on('click', (e)=>{
        var datos = {todos: 'todo',ciudad: ciudad, tipo: tipo, from: from, to: to}
        self.ajaxData(datos);
      })
    },

    //funcion que obtiene los datos, es usado con filtro de formulario o en el caso de presionar el boton "mostrar todos"
    ajaxData: function(datos){
      var self = this
      $.ajax({
        url: 'buscador.php',
        type: 'POST',
        data: datos
      }).done(function(data){
        var newData = JSON.parse(data)
        self.renderBienes(newData)

      })
    },

    //funcion que obtiene los datos para mostrarse en el filtro de ciudades
    ajaxCiudad: function(datos){
      var self = this
      $.ajax({
        url: 'ciudad.php',
        type: 'POST',
        data: datos
      }).done(function(data){
        var newData = JSON.parse(data)
        self.renderCiudades(newData)
        $('select').material_select()
      })
    },

    //funcion que obtiene los datos para mostrarse en el filtro de tipos
    ajaxTipo: function(datos){
      var self = this
      $.ajax({
        url: 'tipo.php',
        type: 'POST',
        data: datos
      }).done(function(data){
        var newData = JSON.parse(data)
        self.renderTipos(newData)
        $('select').material_select()
      })
    },
    
    //funcion que convierte en numero el filtro de rango de precios
    toNumero: function(num){
      var numero = num
      var newNumero = Number(numero.replace('$', '').replace(',', '').replace(' ', ''))
      return newNumero
    },
    
    //funcion que renderiza los datos obtenidos del filtro del formulario o en caso de presionar la opcion "mostrar todos"
    renderBienes: function(bienes){
      var self = this
      var bien = bienes
      self.contBienes.html('')

      bien.map((bien)=>{
        var bienTemplate = '<div class="itemMostrado card horizontal">'+
                                '<img src="img/home.jpg">'+
                              '<div class="card-stacked">'+
                                '<div class="card-content">'+
                                  '<div>'+
                                    '<b>Direccion: </b>:direccion:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Ciudad: </b>:ciudad:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Telefono: </b>:telefono:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Código postal: </b>:codigo_postal:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Precio: </b>:precio:<p></p>'+
                                  '</div>'+
                                  '<div>'+
                                    '<b>Tipo: </b>:tipo:<p></p>'+
                                  '</div>'+
                                '</div>'+
                                '<div class="card-action right-align">'+
                                  '<a href="#">Ver más</a>'+
                                '</div>'+
                              '</div>'+
                            '</div>';

        var newBien = bienTemplate.replace(':direccion:', bien.Direccion)
                                  .replace(':ciudad:', bien.Ciudad)
                                  .replace(':telefono:', bien.Telefono)
                                  .replace(':codigo_postal:', bien.Codigo_Postal)
                                  .replace(':precio:', bien.Precio)
                                  .replace(':tipo:', bien.Tipo)
        self.contBienes.append(newBien)
        
      })
    },

    //funcion que renderiza los datos en la seleccion de ciudades
    renderCiudades: function(ciudades){
      var self = this
      var ciudad = ciudades
  
      ciudad.map((ciudad)=>{
        var ciudadTemplate = '<option value="'+ciudad+'">'+ciudad+'</option>';
        $('#selectCiudad').append(ciudadTemplate)
      })
    },

    //fucion que renderiza los datos en la seleccion de tipos
    renderTipos: function(tipos){
      var self = this
      var tipo = tipos
 
      tipo.map((tipo)=>{
        var tipoTemplate = '<option value="'+tipo+'">'+tipo+'</option>';
        $('#selectTipo').append(tipoTemplate)
      })
    }
    
  }

  //funcion de carga inicial
  Bienes.Init()
})
