<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, X-Requested-With");
    header("Content-Type: application/json; charset=UTF-8");

    $host = 'database-304.cusgozwqwnxy.us-east-1.rds.amazonaws.com:1522';
    $user = 'admin';
    $pass = 'admin1234';
    $db_name = 'project';

    $conn = new mysqli($host, $user, $pass, $db_name);

    if ($conn->connect_error) {
        die('Connection Error: '.$conn->connect_error);
    }
    else {
        echo "Connection Successful \n";
    }

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);
        $response = array("success" => true, "message" => $content);
        // echo $content["username"];
        // echo $content["password"];
        $query="insert into users values('".$content["username"]."', '".$content["password"]."', '".$content["phone"]."', '".$content["city"]."', '".$content["acode"]."', '".$content["fullName"]."')";
        // echo $query;
        mysqli_query($conn, $query);
        echo json_encode($response);
    }

    // $content = $_POST['username'];
    // if (isset($_POST['username'])) {
    //     $_POST = json_decode(array_keys($_POST)[0], true);
    // }
    // $response = array("success" => true, "message" => json_decode(array_keys($_POST)[0], true));
    // echo json_encode($response);
    // $query="insert into users values('test2', 'test123', '415 658-9932', 'Vancouver', '415', 'Adam Test2')";
    // mysqli_query($conn, $query);
?>
