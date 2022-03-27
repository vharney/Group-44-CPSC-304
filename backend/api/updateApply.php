<?php
    include '../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    $username_comp = 'amazon_official';
    $username_emp = 'geek42';
    $title = 'Software Engineer';
    $status = 'accepted';

    $query = "UPDATE Applies 
                SET status='$status'
                WHERE username_comp='$username_comp' AND
                    username_emp='$username_emp' AND 
                    title='$title'";

    echo $query;

    if ($conn->query($query) === TRUE) {
        $response = array("success" => true, "message" => "record updated");
    } else {
        $response = array("success" => true, "message" => "update failed");
    }
    echo json_encode($response);

    // if (!empty($_POST)) { 
    //     $content = json_decode(array_keys($_POST)[0], true);
    //     $username_comp = $content["username_comp"];
    //     $username_emp = $content["username_emp"];
    //     $title = $content["title"];
    //     $status = $content["status"];

    //     $query = "UPDATE Applies 
    //             SET status='$status',
    //             WHERE username_comp='$username_comp' AND
    //                 username_emp='$username_emp' AND
    //                 title='$title'";

    //     if ($conn->query($query) === TRUE) {
    //         $response = array("success" => true, "message" => "record updated");
    //     } else {
    //         $response = array("success" => true, "message" => "update failed");
    //     }
    //     echo json_encode($response);
    // }

?>