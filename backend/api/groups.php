
<?php
    include '../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);

        $username = $content["username"];

        $query="SELECT Joins.groupID, groupName, memberNum FROM User_Groups, Joins WHERE User_Groups.groupID=Joins.groupID AND Joins.username!='$username'";

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
