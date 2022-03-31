
<?php
    include '../../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);
        $title=str_replace("_", " ", $content['title']);

        $query="SELECT MIN(DISTINCT salary)
            FROM Jobs 
            WHERE title='$title'";

        $result = mysqli_query($conn, $query);

        if (mysqli_num_rows($result) > 0) { # If result is more than 0, user found return back the username in the response
            $return = array();
            
            while($row = mysqli_fetch_array($result)) {
                array_push($return, array($row));
            }
            $response = array("success" => true, "message" => $return);
        }
        else {
            $response = array("success" => true, "message" => "error");
        }

        echo json_encode($response);
    }
?>
