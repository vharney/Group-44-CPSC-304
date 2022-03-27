<?php
    include '../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    error_reporting(E_ALL ^ E_WARNING); 

    $username = 'apple_official';
    $title = 'Graphic Designer';
    $location = 'Montreal';

    $query="DELETE FROM Jobs
                WHERE username='$username' AND title='$title' AND location='$location'";

    // NOT DELETE ON CASCADE, THE JOBS STILL EXIST IN APPLIES
    
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