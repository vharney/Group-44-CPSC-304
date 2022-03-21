<?php
    include '../index.php'; // This include statement will allow us to use $conn from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);
        $response = array("success" => true, "message" => $content);
        // echo $content["username"];
        // echo $content["password"];
        $query="INSERT INTO Users VALUES('".$content["username"]."', '".$content["password"]."', '".$content["phone"]."', '".$content["acode"]."', '".$content["fullName"]."')";
        // echo $query;
        mysqli_query($conn, $query);
        echo json_encode($response);
    }
?>

<!-- INSERT INTO Users VALUES('zoom_official', 'zoom123', '4166048976', '416', 'Zoom'); -->