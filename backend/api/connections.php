<?php
    include '../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);

        $username = $content["username"];

        $query="SELECT * FROM Connections WHERE username_1='$username' AND status='approved'";
    }
?>