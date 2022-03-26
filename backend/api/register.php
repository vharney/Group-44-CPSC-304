<?php
    include '../index.php'; // This include statement will allow us to use $conn from index.php which will be the connection to the MySQL DB

    if (!empty($_POST)) {
        $content = json_decode(array_keys($_POST)[0], true);
        // echo $content["username"];
        // echo $content["password"];
        // $query="INSERT INTO Users VALUES('".$content["username"]."', '".$content["password"]."', '".$content["phone"]."', '".$content["acode"]."', '".$content["fullName"]."')";
        // echo $query;

        $username = $content["username"];
        $password = $content["password"];
        $full_name = str_replace("_", " ", $content["fullName"]);
        $phone = $content["phone"];
        $acode = $content["acode"];
        $user_type = $content["userType"];
        $employee_num = $content["employeeNum"];
        $age = $content["age"];
        $profession = str_replace("_", " ", $content["profession"]);
        $position = $content["position"];

        $user_query = "INSERT INTO Users VALUES('$username', '$password', '$phone', '$acode', '$full_name')";

        if ($user_type == "companies") {
            $company_query = "INSERT INTO Companies VALUES('$username', '$employee_num', NULL)";
            if ($conn->query($user_query) === TRUE and $conn->query($company_query) === TRUE){
                $response = array("success" => true, "message" => "register success");
            } else {
                $response = array("success" => true, "message" => "failed");
            }
        }
        else {
            $employees_query = "INSERT INTO Employees_Hire VALUES('$username', '$age', NULL, NULL, '$profession', NULL, '$position')";
            if ($conn->query($user_query) === TRUE and $conn->query($employees_query) === TRUE){
                $response = array("success" => true, "message" => "register success");
            } else {
                $response = array("success" => true, "message" => "failed");
            }
        }

        echo json_encode($response);
    }
?>