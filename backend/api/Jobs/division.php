<?php
    include '../../index.php'; // This include statement will allow us to use $conn from index.php which will be the connection to the MySQL DB

    $content = json_decode(array_keys($_POST)[0], true);

    // $query = "SELECT DISTINCT J1.title FROM Jobs J1 NOT IN (SELECT J2.title FROM Jobs J2 WHERE J2.username='amazon_official')";
    $query = "SELECT * FROM Companies WHERE NOT EXISTS(SELECT DISTINCT J1.title FROM Jobs J1 WHERE J1.title NOT IN (SELECT J2.title FROM Jobs J2 WHERE Companies.username=J2.username))";

        # Using $conn from index.php 
    $result = mysqli_query($conn, $query);

    if (mysqli_num_rows($result) > 0) { # If result is more than 0, user found return back the username in the response
        $return = array();
        
        while($row = mysqli_fetch_array($result)) {
            array_push($return, array($row));
            // echo print_r($row);       // Print the entire row data
        }
        $response = array("success" => true, "message" => $return);
        }
    else {
        $response = array("success" => true, "message" => "error");
    }

    echo json_encode($response);

    // if (!empty($_POST)) {
    //     $content = json_decode(array_keys($_POST)[0], true);

    //     $query = "SELECT * FROM Companies WHERE NOT EXISTS( (SELECT DISTINCT title FROM Jobs ) EXCEPT (SELECT title FROM Jobs WHERE Companies.username=Jobs.username) )";

    //      # Using $conn from index.php 
    //     $result = mysqli_query($conn, $query);

    //     if (mysqli_num_rows($result) > 0) { # If result is more than 0, user found return back the username in the response
    //         $return = array();
            
    //         while($row = mysqli_fetch_array($result)) {
    //             array_push($return, array($row));
    //             // echo print_r($row);       // Print the entire row data
    //         }
    //         $response = array("success" => true, "message" => $return);
    //       }
    //     else {
    //         $response = array("success" => true, "message" => "error");
    //     }
  
    //     echo json_encode($response);
    // }
?>
