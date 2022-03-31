<?php
    include '../../index.php'; // This include statement will allow us to use "$conn" from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) { 
        $content = json_decode(array_keys($_POST)[0], true);
        $username = $content["username"];
        $new_username = str_replace("_", " ", $content["newUsername"]);
        $password = $content["password"];
        $fullname = str_replace("_", " ", $content["fullname"]);
        $phone = $content["phone"];
        $acode = $content["acode"];

        $query = "UPDATE Users 
                SET username='$new_username',
                    pw='$password',
                    phone='$phone',
                    fullname='$fullname',
                    acode='$acode'
                WHERE username='$username'";

        if ($conn->query($query) === TRUE) {
            $response = array("success" => true, "message" => "record updated");
        } else {
            $response = array("success" => true, "message" => "update failed");
        }
        echo json_encode($response);
    }

    // $username = "geek42";
    // $password = "test123";
    // $phone = '6043831123';
    // $fullname = 'Luke';
    // $acode = substr($phone, 0, 3);
    // $query = "UPDATE Users 
    //             SET username='$new_username',
    //                 pw='$password',
    //                 phone='$phone',
    //                 fullname='$fullname',
    //                 acode='$acode'
    //             WHERE username='$username'";
    // if ($conn->query($query) === TRUE) {
    //     echo "Record updated successfully";
    //   } else {
    //     echo "Error updating record: " . $conn->error;
    //   }
    // TODO: acode hasn't been connected with the change of phone

    // if (!empty($_POST)) {
    //     $content = json_decode(array_keys($_POST)[0], true);

    //     $username = $content["username"];
    //     $password = $content["password"];
    //     $phone = $content["phone"];
    //     $fullname = $content["fullname"];
    //     // acode?

    //     // username cannot be changed
    //     $query = "UPDATE Users 
    //             SET pw='$password',
    //                 phone='$phone',
    //                 fullname='$fullname'
    //             WHERE username='$username'";

    //     // echo $query;

    //     # Using $conn from index.php 
    //     $result = mysqli_query($conn, $query);

    //     if (mysqli_num_rows($result) > 0) { # If result is more than 0, user found return back the username in the response
    //         $response = array("success" => true, "message" => $username);
    //     }
    //     else {
    //         $response = array("success" => true, "message" => "login failed");
    //     }

    //     echo json_encode($response);
    // }
?>