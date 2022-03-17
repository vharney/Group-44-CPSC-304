<?php
    include '../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);

        $username = $content["username"];
        $password = $content["password"];

        $query = "SELECT * FROM users WHERE username='$username' AND pw='$password'";

        // echo $query;

        # Using $conn from index.php 
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) { # If result is more than 0, user found return back the username in the response
            $response = array("success" => true, "message" => $username);
        }
        else {
            $response = array("success" => true, "message" => "login failed");
        }

        echo json_encode($response);
    }
?>