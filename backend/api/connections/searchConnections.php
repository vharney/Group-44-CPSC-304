<?php
    include '../../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);

        $username = $content["username"];
        $fnameuname = $content["fnameuname"];

        $query="SELECT * FROM Users, Employees_Hire 
                WHERE Users.username=Employees_Hire.username AND (Users.username LIKE '%$fnameuname%' OR Users.fullname LIKE '%$fnameuname%') AND Users.username!='$username'
                    AND NOT EXISTS (SELECT * FROM Connections WHERE username_1='$username' AND username_2=Users.username)";
        // echo $query;
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
    }
?>
