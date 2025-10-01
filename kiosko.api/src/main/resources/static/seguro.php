<?php
session_start();//inicio la sesion
if ($_SESSION["real"] != 1){//verifica si es igual a 1
header("location: error.php");
exit();//y si no lo es lo manda a la pagina de error
}

?>