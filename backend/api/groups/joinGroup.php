<?php
    include '../../index.php'; // This include statement will allow us to use $conn from index.php which will be the connection to the MySQL DB
    
    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);

        $groupID = $content["groupID"];
        $username = $content["username"];

        $query_1="INSERT INTO Joins VALUES('$groupID', '$username')";
        $query_2="UPDATE User_Groups SET memberNum=memberNum+1 WHERE groupID='$groupID'";

        if ($conn->query($query_1) === TRUE AND $conn->query($query_2) === TRUE) {
            $response = array("success" => true, "message" => "record updated");
        } else {
            $response = array("success" => true, "message" => "failed");
        }
        echo json_encode($response);
    }
    // if ($conn->query($query_1) === TRUE){
    //     echo "Record added successfully";
    //     $query_2="UPDATE User_Groups 
    //             SET memberNum=memberNum+1
    //             WHERE groupID='$groupID'";
    //     echo $query_2;
    
    //     if ($conn->query($query_2) === TRUE){
    //         echo "Record updated successfully";
    //     } else {
    //         echo "Error adding record: " . $conn->error;
    //     }
    // } else {
    //     echo "Error adding record: " . $conn->error;
    // }
    
    // if (!empty($_POST)) {
    //     $content = json_decode(array_keys($_POST)[0], true);
    //     $response = array('success' => true, 'message' => $content);

    //     $username_comp = $content['username_comp'];
    //     $username_emp = $content['username_emp'];
    //     $title = $content['title'];
    //     $status = 'pending';

    //     $query='INSERT INTO Applies VALUES($username_comp, $username_emp, $title, $status)';
    //     // echo $query;
    //     mysqli_query($conn, $query);
    //     echo json_encode($response);
    // }
?>
