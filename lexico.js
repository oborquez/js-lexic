
// Definir variables
var evento = "";
var nombreArchivo = "";
var cadenaPalabras="abstract\n"+
                    "and\n"+
                    "array\n"+
                    "as\n"+
                    "break\n"+
                    "callable\n"+
                    "case\n"+
                    "catch\n"+
                    "class\n"+
                    "clone\n"+
                    "const\n"+
                    "continue\n"+
                    "declare\n"+
                    "default\n"+
                    "die\n"+
                    "do\n"+
                    "echo\n"+
                    "else\n"+
                    "elseif\n"+
                    "empty\n"+
                    "enddeclare\n"+
                    "endfor\n"+
                    "endforeach\n"+
                    "endif\n"+
                    "endswitch\n"+
                    "endwhile\n"+
                    "eval\n"+
                    "exit\n"+
                    "extends\n"+
                    "final\n"+
                    "finally\n"+
                    "for\n"+
                    "foreach\n"+
                    "function\n"+
                    "global\n"+
                    "goto\n"+
                    "if\n"+
                    "implements\n"+
                    "include\n"+
                    "include_once\n"+
                    "instanceof\n"+
                    "insteadof\n"+
                    "interface\n"+
                    "isset\n"+
                    "list\n"+
                    "namespace"+
                    "new\n"+
                    "or\n"+
                    "print\n"+
                    "private\n"+
                    "protected\n"+
                    "public\n"+
                    "require\n"+
                    "require_once\n"+
                    "return\n"+
                    "static\n"+
                    "switch\n"+
                    "throw\n"+
                    "trait\n"+
                    "try\n"+
                    "unset\n"+
                    "use\n"+
                    "var\n"+
                    "while\n"+
                    "xor\n"+
                    "yield";

  // catchar eventos
  document.addEventListener('DOMContentLoaded', function(event) {

    //asignar nombres de elementos
    var btnAnalizar = document.getElementById("analizar");
    var btnCancelar = document.getElementById("cancelar");
    var btnGuardar = document.getElementById("guardar");
    var cadena = document.getElementById("cadena");
    var resultado = document.getElementById('resultado');
    var tituloEvento = document.getElementById('titulo-evento');
    var notify = document.getElementById("notify");


    // evento crear
    document.getElementById("b-crear").onclick = function(){

        evento = "crear";
        tituloEvento.textContent = "Crear";
        resultado.style.display = 'none';
        // Cursor a text area cadena
        cadena.focus();

        // botones de control
        btnAnalizar.style.display = "none";
        btnGuardar.style.display = "inline-block";
        btnCancelar.style.display = "inline-block";

    };

    // opción de palabras reservadas
    document.getElementById("b-preservadas").onclick = function(){

      evento = "reservadas";
      tituloEvento.textContent = "Palabras Reservadas";
      resultado.style.display = 'none';
      cadena.value = cadenaPalabras;
      btnAnalizar.style.display = "none";
      btnGuardar.style.display = "inline-block";
      btnCancelar.style.display = "inline-block";

    };



    //botones de control
    btnCancelar.onclick = function(){

        document.getElementById("cadena").value = "";
        btnAnalizar.style.display = "inline-block";
        resultado.style.display = 'none';
        btnGuardar.style.display = "none";
        btnCancelar.style.display = "none";
        tituloEvento.textContent = "";
        evento = "";
        nombreArchivo = "";
    };

    // Guardar contenido segun evento
    btnGuardar.onclick = function(){

      // en caso de guardar palabras reservadas, se guarda en el arreglo
      if(evento == "reservadas"){

        cadenaPalabras = cadena.value;
        btnCancelar.click();
      }else{ // de lo contrario se guarda un archivo local
          var texto = cadena.value;
          nombreArchivo =  (nombreArchivo == "" ? "analizador_lexico.txt"  : nombreArchivo);
          console.log(nombreArchivo);
          let a = document.createElement('a');
          a.href = "data:application/octet-stream,"+encodeURIComponent(texto);
          a.download = nombreArchivo;
          a.click();

      }
      notify.style.display = "block";
      setTimeout(function(){ notify.style.display = "none"; }, 1000);

    }

    // Analizador lexico
    btnAnalizar.onclick = function(){

      resultado.style.display = 'block';

      var buscarreservadas="";
      var arraydepalabras = cadenaPalabras.split('\n');


      buscarreservadas=arraydepalabras[0]
      for (let i = 1; i < arraydepalabras.length; i++) {
          buscarreservadas+="|"+arraydepalabras[i];
      }
      var numerodereservadas = analizarcodigo('(\\b|^)(' + buscarreservadas + ')(\\b|$)',cadena.value);
      document.getElementById("reservadas").textContent = numerodereservadas;

      // Buscar Numeros
      totaldenumeros=analizarcodigo('(\\b[0-9]+)',cadena.value);
      document.getElementById("numeros").textContent=totaldenumeros;

      // Buscar Ids
      numerodepalabras = analizarcodigo('\\w*.\\b',cadena.value);
      document.getElementById("ids").textContent=(numerodepalabras-numerodereservadas)-totaldenumeros;


      // Buscar Llaves
      var abrirllaves = cadena.value.split('{')
      var cerrarllaves = cadena.value.split('}')
      document.getElementById("llave1").textContent = abrirllaves.length-1;
      document.getElementById("llave2").textContent = cerrarllaves.length-1;


      // Buscar Corchetes
      var abrircorchetes = cadena.value.split('[')
      var cerrarcorchetes =cadena.value.split(']')
      document.getElementById("corchete1").textContent = abrircorchetes.length-1;
      document.getElementById("corchete2").textContent = cerrarcorchetes.length-1;

      // Buscar Parentesis
      var abrirparentesis = cadena.value.split('(')
      var cerrarparentesis =cadena.value.split(')')
      document.getElementById("parentesis1").textContent = abrirparentesis.length-1;
      document.getElementById("parentesis2").textContent = cerrarparentesis.length-1;




    }


    // abrir archivo
    document.getElementById("b-abrir").onclick = function() {

        document.getElementById('f-archivo').click();

    };


    // leer archivo
    document.getElementById('f-archivo').addEventListener('change', (event) => {
           var input = event.target;
           nombreArchivo = event.target.value;

           var reader = new FileReader();
           reader.onload = function(){
             evento = "abrir";
             var text = reader.result;
             cadena.value = text;
           };
           reader.readAsText(input.files[0]);
           input.value = '';
           // botones de control
           btnGuardar.style.display = "inline-block";
           btnCancelar.style.display = "inline-block";


    });



  });

  // Se analiza el código buscando
      function analizarcodigo(busqueda,dondebuscar) {
          var matching = new RegExp(busqueda, 'ig');
          var count = dondebuscar.match(matching);
          var result = 0;
          if (count !== null) {
              result = count.length;
          }
          return result;
      }
