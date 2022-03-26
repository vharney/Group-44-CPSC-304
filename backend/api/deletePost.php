<?php
    include '../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    error_reporting(E_ALL ^ E_WARNING); 

    $postID = 1;
    $query="DELETE FROM Posts_Create
                WHERE postID='$postID'";
    // change postID later
    
    if ($conn->query($query) === TRUE){
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $conn->error;
    }

    // if (!empty($_POST)) {
    //     $content = json_decode(array_keys($_POST)[0], true);

    //     $postID = $content["postID"];

    //     $query="DELETE FROM Posts_Create
    //             WHERE postID=1";

    //     if ($conn->query($query) === TRUE){
    //         echo "Record deleted successfully";
    //     } else {
    //         echo "Error deleting record: " . $conn->error;
    //     }

    // }
?>