<?php

require_once '../LoginModel.php';
$loginModel = new LoginModel();


	if(isset($_POST["gid"])&& isset($_POST["act"]))
			{
			$user_id=$_POST["gid"];
			$action=$_POST["act"];
			require_once '../DBConn.php';
			$connection = new DBConn();
			if ($action=="user")
				{
				$user=$loginModel->Query("SELECT gid, username, permissions, name, address, email, phone FROM users where gid=$user_id");
				$user_row = pg_fetch_all($user);
				echo json_encode($user_row);
				}
			else if ($action=="users")
			{
			$result=$loginModel->Query("SELECT gid, username, permissions, name, address, email, phone FROM users order by name");
			$row=pg_fetch_all($result);
			echo json_encode($row);
			}
			
		}
	
			
?>
