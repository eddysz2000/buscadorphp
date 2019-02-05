//Funcion de carga inicial de la pagina
$(function(){

  //boton para mostrar todo la BD
  $('#mostrarTodos').on('click', mostrarTodos);


})

function mostrarTodos(){
    //event.preventDefault();

    $.ajax({
    url: "buscador.php",
    dataType: "json",
    type: 'POST',
    //data: ('ciudad=' + ciudad + '&tipo=' + tipo),
    success: function (datos) {
    ver_todos_busqueda(datos, precio);
    }
    });

}