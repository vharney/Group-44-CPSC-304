<?php
    include '../index.php'; // This include statement will allow us to use $conn from index.php which will be the connection to the MySQL DB

    $username_comp = 'apple_official';
    $username_emp = 'geek42';
    $title = 'Graphic Designer';
    $status = 'pending';

    $query="INSERT INTO Applies(username_comp, username_emp, title, status) VALUES 
            ((SELECT username from Jobs WHERE username='$username_comp'), '$username_emp', (SELECT title from Jobs WHERE title='$title'), '$status')";

  
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
