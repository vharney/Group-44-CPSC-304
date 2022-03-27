<?php
    include '../../index.php'; // This include statement will allow us to use $conn from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);

        $username_1 = $content["username_1"];
        $username_2 = $content["username_2"];

        $query = "UPDATE Connections SET status='approved' WHERE username_1='$username_1' AND username_2='$username_2'";
        $query_2 = "INSERT INTO Connections VALUES('$username_2', '$username_1', 'approved')";

        if ($conn->query($query) === TRUE and $conn->query($query_2) === TRUE) {
            $response = array("success" => true, "message" => "record updated");
        } else {
            $response = array("success" => true, "message" => "failed");
        }
        echo json_encode($response);
    }
?>
