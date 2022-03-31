<?php
    include '../../index.php'; // This include statement will allow us to use $conn from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);
        
        $username = $content["username"];
        $title = str_replace("_", " ", $content["title"]);
        $location = str_replace("_", " ", $content["location"]);
        $salary = $content["salary"];

        // INSERT INTO Posts_Create VALUES(NULL, "zoom_official", ":/database/Media/1", "Looking for a Software Engineer", "We are looking for a Software Engineer. Click the link below to apply if you have the required qualifications", "hiring");
        $query= "INSERT INTO Jobs VALUES('$username', '$title', $salary, '$location')";

        if ($conn->query($query) === TRUE) {
            $response = array("success" => true, "message" => "job created");
        } else {
            $response = array("success" => true, "message" => "fail");
        }
        echo json_encode($response);
    }
?>