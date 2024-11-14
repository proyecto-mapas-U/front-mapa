<?php
$nomusuario = $_POST['nombre'];
$telusuario = $_POST['telefono'];

function imprimir_en_consola($nomusuario) {
    $console = $nomusuario;
    if (is_array($console))
    $console = implode(',', $console);
   
    echo "<script>console.log('Console: " . $console . "' );</script>";
   }
   
   
?>