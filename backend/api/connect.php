<?php
    include '../index.php'; // This include statement will allow us to use $conn from index.php which will be the connection to the MySQL DB

    $username_1 = 'will_iam';
    $username_2 = 'geek42';
    $status = 'pending';

    $query="INSERT INTO Connections(username_1, username_2, status) VALUES 
            ((SELECT username from Users WHERE username='$username_1'), (SELECT username from Users WHERE username='$username_2'), '$status')";

  
    echo $query;
    // mysqli_query($conn, $query);
    if ($conn->query($query) === TRUE){
        echo "Record added successfully";
    } else {
        echo "Error adding record: " . $conn->error;
    }
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
