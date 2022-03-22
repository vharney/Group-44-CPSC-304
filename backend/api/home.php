
<?php
    include '../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    error_reporting(E_ALL ^ E_WARNING); 

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);

        $username = $content["username"];

        $query="SELECT * FROM Users WHERE username='$username'";

        $query_emp = "SELECT * FROM Employees_Hire WHERE username='$username'";
        $query_comp = "SELECT * FROM Companies WHERE username='$username'";
        // echo $query;

        # Using $conn from index.php 
        $result = mysqli_query($conn, $query);
        $result_emp = mysqli_query($conn, $query_emp);
        $result_comp = mysqli_query($conn, $query_comp);

        if (mysqli_num_rows($result_emp) > 0) { # If result is more than 0, user found return back the username in the response
            $return = "";
            while($row = mysqli_fetch_array($result)) {
                $return = $row["fullname"];
                // echo print_r($row);       // Print the entire row data
            }
            $response = array("success" => true, "message" => $return);
        }
        else if (mysqli_num_rows($result_comp) > 0) { // MAYBE DIFFERENT HOME PAGE FOR COMPANIES AND USERS, TO BE IMPLEMENTED LATER
            $return = "";
            while($row = mysqli_fetch_array($result)) {
                $return = $row["fullname"];
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