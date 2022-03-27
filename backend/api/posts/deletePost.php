<?php
    include '../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    error_reporting(E_ALL ^ E_WARNING); 
    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);
        
        $postID = $content["postID"];

        $query="DELETE FROM Posts_Create
                    WHERE postID='$postID'";

        
        if ($conn->query($query) === TRUE){
            $response = array("success" => true, "message" => "delete success");
        } else {
            $response = array("success" => true, "message" => "failed");
        }
        echo json_encode($response);
    }
?>