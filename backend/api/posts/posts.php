
<?php
    include '../../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    error_reporting(E_ALL ^ E_WARNING); 

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);

        // $post = $content["query"];

        $query="SELECT Users.username, fullname, title, text_content FROM Posts_Create, Users WHERE Posts_Create.username=Users.username ORDER BY postID DESC";

        # Using $conn from index.php 
        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) { # If result is more than 0, user found return back the username in the response
            $return = array ();
            
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
