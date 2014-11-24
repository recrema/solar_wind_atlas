<?php
require_once '../LoginModel.php';
$loginModel = new LoginModel();

require_once '../DBConn.php';
$connection = new DBConn();

$notalowedchars = array("'", '"', "--", ";", "/", "%", ">","<","!");
if (isset($_POST["action"]))
  {
		if ($_POST["action"]=="del")
		  {
			  if ($_POST["user"]==$_POST["gid"])
			  {
				  echo '<p>You cannot delete this user because it is on use!</p><button type="button" class="pure-button pure-button-green" onclick="botao2()">Ok</button>';
			  }
			  else
			  {
			  	$result=$loginModel->Query("DELETE from users where gid=".$_POST["gid"].";");
				echo '<p>User successfully deleted.</p><button type="button" class="pure-button pure-button-green" onclick="botao2()">Ok</button>';
			  }
		  }
		  
		else if ($_POST["action"]=="ins")
		  {
		  $mypassword=$loginModel->generateHash(str_replace($notalowedchars, "", $_POST["pass"]));
		  $result=$loginModel->Query("SELECT username from users where username='".$_POST["user"]."';");
		  $arr = pg_fetch_array($result, NULL, PGSQL_ASSOC);
			if ($arr["username"]==$_POST["user"]) {
				echo '<p>Username <b><i>'.$_POST["user"].'</b></i> already exists! Please choose another username.</p><button type="button" class="pure-button pure-button-green" onclick="botao3()">Back</button>';
			}
			else {
				$result=$loginModel->Query("INSERT into users (name, address, email, phone, permissions, passcode, username) VALUES ('".$_POST["name"]."','".$_POST["address"]."','".$_POST["email"]."','".$_POST["phone"]."','".$_POST["permissions"]."','".$mypassword."','".$_POST["user"]."');");
				echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully inserted</p><button type="button" class="pure-button pure-button-green" onclick="botao2()">Ok</button>';
				}
		  
		  
		  

		 }
		 
		else if ($_POST["action"]=="edit")
		  {
		  $mypassword=$loginModel->generateHash(str_replace($notalowedchars, "", $_POST["pass"]));
		  $dbpass=$loginModel->Query("SELECT passcode FROM users where gid='".$_POST["gid"]."';");
		  $user_dbpass=pg_fetch_all($dbpass);
		  $pass_db=$user_dbpass[0] ['passcode'];
		  
		  $verify=$loginModel->verify(str_replace($notalowedchars, "", $_POST["oldpass"]),$pass_db);
		  if ($verify!=1)
		  {
			  echo '<p>The old password is not correct, please try again.</p><button type="button" class="pure-button pure-button-green" onclick="botao1()">Back</button>';
		  }
		  else
		  {
		  	if ($_POST["pass"]==NULL){
		  		$result=$loginModel->Query("UPDATE users set name='".$_POST["name"]."', username='".$_POST["user"]."', address='".$_POST["address"]."',email='".$_POST["email"]."',phone='".$_POST["phone"]."', permissions='".$_POST["permissions"]."' where gid='".$_POST["gid"]."';");
		  		echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully altered</p><button type="button" class="pure-button pure-button-green" onclick="botao1()">Ok</button>';
		  		
		  	}
		  	else{
			$result=$loginModel->Query("UPDATE users set name='".$_POST["name"]."', username='".$_POST["user"]."', address='".$_POST["address"]."',email='".$_POST["email"]."',phone='".$_POST["phone"]."', permissions='".$_POST["permissions"]."',passcode='".$mypassword."' where gid='".$_POST["gid"]."';");
			echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully altered</p><button type="button" class="pure-button pure-button-green" onclick="botao1()">Ok</button>';
		  	}
		  }
		 }
		 
		 else if ($_POST["action"]=="confedit")
		  {
		  	if ($_POST["pass"]==NULL){
		  		$result=$loginModel->Query("UPDATE users set name='".$_POST["name"]."', username='".$_POST["user"]."', address='".$_POST["address"]."',email='".$_POST["email"]."',phone='".$_POST["phone"]."', permissions='".$_POST["permissions"]."' where gid='".$_POST["gid"]."';");
		  		echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully altered</p><button type="button" class="pure-button pure-button-green" onclick="botao2()">Ok</button>';
		  	}
		  	else{
			  $mypassword=$loginModel->generateHash(str_replace($notalowedchars, "", $_POST["pass"]));
			  $result=$loginModel->Query("UPDATE users set name='".$_POST["name"]."', username='".$_POST["user"]."', address='".$_POST["address"]."',email='".$_POST["email"]."',phone='".$_POST["phone"]."', permissions='".$_POST["permissions"]."',passcode='".$mypassword."' where gid='".$_POST["gid"]."';");
			  echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully altered</p><button type="button" class="pure-button pure-button-green" onclick="botao2()">Ok</button>';
		  	}
		 }
  }



?>
