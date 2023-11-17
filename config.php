<?php

define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', '');
define('DB_NAME', 'login');
define('DB_PORT', '4306');

// Try connecting to the Database
// $conn = new mysqli("localhost", "root", "", "myDB","3308");
$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME, DB_PORT);

//Check the connection
if ($conn == false) {
    echo "Can't connect to database";
    dir('Error: Cannot connect');
}
// else {
//     echo "Connected succesfully to database";
// }
