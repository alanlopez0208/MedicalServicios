<?php
// Configuración de la base de datos
$hostname = "medicalsantacruz.com";
$username = "msc";
$password = "Medical@SantaCruz05";
$database = "MedStaCruz";

try {
    // Establecer conexión con la base de datos utilizando PDO
    $connection = new PDO("mysql:host=$hostname;dbname=$database", $username, $password);

    // Configurar PDO para que lance excepciones en caso de errores
    $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Verificar si se ha enviado el formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Obtener los datos del formulario
        $nombre = $_POST["name"];
        $correo = $_POST["email"];
        $telefono = $_POST["phone"];
        $mensaje = $_POST["message"];

        // Preparar la consulta SQL utilizando parámetros para evitar inyección SQL
        $sql = "INSERT INTO Contact (nombre, correo, telefono, mensaje) VALUES (:nombre, :correo, :telefono, :mensaje)";
        $statement = $connection->prepare($sql);

        // Asignar los valores a los parámetros
        $statement->bindParam(":nombre", $nombre);
        $statement->bindParam(":correo", $correo);
        $statement->bindParam(":telefono", $telefono);
        $statement->bindParam(":mensaje", $mensaje);

        if ($statement->execute()) {


            $url = "../contactUs.html?mensaje=success";
        } else {



            $url = "../contactUs.html?mensaje=error";
        }

        header("Location: " . $url);
    }
} catch (PDOException $e) {
    echo "Error de conexión a la base de datos: " . $e->getMessage();
}

// Cerrar la conexión
$connection = null;
?>