$(function(){
  var Bienes = {
    formulario: $('#formulario'),
    btnTodos: $('#mostrarTodos'),
    contBienes: $('#bienes'),
    listaCiudades: $('#selectCiudad'),

    Init: function(){
      var self = this
      self.cargarSelect()
      self.cargarTodos()
      self.formulario.submit(function(e){
        e.preventDefault()
        self.searchBienes()
      })
    },
    
    cargarSelect: function(){
     var self = this
     var datos = {todos: ""}
     self.ajaxCiudad(datos)
     self.ajaxTipo(datos)
    },

    searchBienes: function(e){
      var self = this
      var ciudad = $('form').find('select[id="selectCiudad"]').val()
      var tipo = $('form').find('select[id="selectTipo"]').val()
      var from = self.toNumero($('.irs-from').text())
      var to = self.toNumero($('.irs-to').text())
      var todos = ''

      var datos = {todos: todos, ciudad: ciudad, tipo: tipo, from: from, to: to}
      console.log(datos)
      self.ajaxData(datos)
      console.log(datos)
    },

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
    
    toNumero: function(num){
      var numero = num
      var newNumero = Number(numero.replace('$', '').replace(',', '').replace(' ', ''))
      return newNumero
    },
    
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

    renderCiudades: function(ciudades){
      var self = this
      var ciudad = ciudades
  
      ciudad.map((ciudad)=>{
        var ciudadTemplate = '<option value="'+ciudad+'">'+ciudad+'</option>';
        $('#selectCiudad').append(ciudadTemplate)
      })
    },

    renderTipos: function(tipos){
      var self = this
      var tipo = tipos
 
      tipo.map((tipo)=>{
        var tipoTemplate = '<option value="'+tipo+'">'+tipo+'</option>';
        $('#selectTipo').append(tipoTemplate)
      })
    }
    
  }
  Bienes.Init()
})
