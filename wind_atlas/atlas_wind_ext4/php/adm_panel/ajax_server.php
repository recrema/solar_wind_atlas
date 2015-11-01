<?php
error_reporting(E_ALL); // to change here the error reporting E_ALL for all E_ERROR just for errors!
ini_set("display_errors", "On");

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
// 				$user=$loginModel->Query("SELECT gid, username, permissions, name, address, email, phone FROM users where gid=$user_id");
				$user=$loginModel->Query('SELECT gid, username, permissions, name, address, email, phone FROM users where gid=$1',array($user_id));
				$user_row = pg_fetch_all($user);
				echo json_encode($user_row);
				}
			else if ($action=="users")
			{
				if($_SESSION['permissions']==1){
					$result=$loginModel->Query('SELECT gid, username, permissions, name, address, email, phone FROM users order by name',array());
					$row=pg_fetch_all($result);
					echo json_encode($row);
				}else{
					//noting user is not admin
				}
			}
			
		}
	
			
?>
