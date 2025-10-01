<?php 
session_start();

// El usuario y contraseña correctos son: ina y 3646
if ($_POST["usu"]=="ina" && $_POST["contrasenia"]=="3646"){
    // LOGIN EXITOSO
    $_SESSION["real"] = "1";
    $_SESSION["use"] = $_POST["usu"];
    $_SESSION["pas"] = $_POST["contrasenia"]; 
    
    // REDIRECCIÓN CORRECTA: Va al panel de administración (test.php)
    header("location: admiprueba.html");
}
else {
    // LOGIN FALLIDO
    header("location: index.html?login=fallido");
}
?>