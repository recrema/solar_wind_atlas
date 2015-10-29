<?php
error_reporting(E_ALL); // to change here the error reporting E_ALL for all E_ERROR just for errors!
ini_set("display_errors", "On");

require_once '../LoginModel.php';
$loginModel = new LoginModel();

require_once '../DBConn.php';
$connection = new DBConn();


#http://php.net/manual/en/function.pg-query-params.php
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
			  	$result=$loginModel->Query('DELETE from users where gid=$1;',array($_POST["gid"]));
				echo '<p>User successfully deleted.</p><button type="button" class="pure-button pure-button-green" onclick="botao2()">Ok</button>';
			  }
		  }
		  
		else if ($_POST["action"]=="ins")
		  {
		  $mypassword=$loginModel->generateHash($_POST["pass"]);
		  $result=$loginModel->Query('SELECT username from users where username=$1;',array($_POST["user"]));
		  $arr = pg_fetch_array($result, NULL, PGSQL_ASSOC);
			if ($arr["username"]==$_POST["user"]) {
				echo '<p>Username <b><i>'.$_POST["user"].'</b></i> already exists! Please choose another username.</p><button type="button" class="pure-button pure-button-green" onclick="botao3()">Back</button>';
			}
			else {
// 				$result=$loginModel->Query("INSERT into users (name, address, email, phone, permissions, passcode, username) VALUES ('".$_POST["name"]."','".$_POST["address"]."','".$_POST["email"]."','".$_POST["phone"]."','".$_POST["permissions"]."','".$mypassword."','".$_POST["user"]."');");
				$result=$loginModel->Query('INSERT into users (name, address, email, phone, permissions, passcode, username) VALUES ($1,$2,$3,$4,$5,$6,$7);',array($_POST["name"],$_POST["address"],$_POST["email"],$_POST["phone"],$_POST["permissions"],$mypassword,$_POST["user"]));
				echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully inserted</p><button type="button" class="pure-button pure-button-green" onclick="botao2()">Ok</button>';
				}
		  
		  
		  

		 }
		 
		else if ($_POST["action"]=="edit")
		  {
		  $mypassword=$loginModel->generateHash($_POST["pass"]);
		  $dbpass=$loginModel->Query('SELECT passcode FROM users where gid=$1;',array($_POST["gid"]));
		  $user_dbpass=pg_fetch_all($dbpass);
		  $pass_db=$user_dbpass[0] ['passcode'];
		  
		  $verify=$loginModel->verify($_POST["oldpass"],$pass_db);
		  if ($verify!=1)
		  {
			  echo '<p>The old password is not correct, please try again.</p><button type="button" class="pure-button pure-button-green" onclick="botao1()">Back</button>';
		  }
		  else
		  {
		  	if ($_POST["pass"]==NULL){
// 		  		$result=$loginModel->Query("UPDATE users set name='".$_POST["name"]."', username='".$_POST["user"]."', address='".$_POST["address"]."',email='".$_POST["email"]."',phone='".$_POST["phone"]."', permissions='".$_POST["permissions"]."' where gid='".$_POST["gid"]."';");
		  		$result=$loginModel->Query('UPDATE users set name=$1, username=$2, address=$3,email=$4,phone=$5, permissions=$6 where gid=$7;',array($_POST["name"],$_POST["user"], $_POST["address"],$_POST["email"],$_POST["phone"],$_POST["permissions"],$_POST["gid"]));
		  		echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully altered</p><button type="button" class="pure-button pure-button-green" onclick="botao1()">Ok</button>';
		  		
		  	}
		  	else{
// 			$result=$loginModel->Query("UPDATE users set name='".$_POST["name"]."', username='".$_POST["user"]."', address='".$_POST["address"]."',email='".$_POST["email"]."',phone='".$_POST["phone"]."', permissions='".$_POST["permissions"]."',passcode='".$mypassword."' where gid='".$_POST["gid"]."';");
			$result=$loginModel->Query('UPDATE users set name=$1, username=$2, address=$3, email=$4,phone=$5, permissions=$6, passcode=$7 where gid=$8;',array($_POST["name"],$_POST["user"],$_POST["address"],$_POST["email"],$_POST["phone"],$_POST["permissions"],$mypassword,$_POST["gid"]));
			echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully altered</p><button type="button" class="pure-button pure-button-green" onclick="botao1()">Ok</button>';
		  	}
		  }
		 }
		 
		 else if ($_POST["action"]=="confedit")
		  {
		  	if ($_POST["pass"]==NULL){
// 		  		$result=$loginModel->Query("UPDATE users set name='".$_POST["name"]."', username='".$_POST["user"]."', address='".$_POST["address"]."',email='".$_POST["email"]."',phone='".$_POST["phone"]."', permissions='".$_POST["permissions"]."' where gid='".$_POST["gid"]."';");
		  		$result=$loginModel->Query('UPDATE users set name=$1, username=$2, address=$3,email=$4,phone=$5, permissions=$6 where gid=$7;',array($_POST["name"],$_POST["user"],$_POST["address"],$_POST["email"],$_POST["phone"],$_POST["permissions"],$_POST["gid"]));
		  		echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully altered</p><button type="button" class="pure-button pure-button-green" onclick="botao2()">Ok</button>';
		  	}
		  	else{
			  $mypassword=$loginModel->generateHash($_POST["pass"]);
// 			  $result=$loginModel->Query("UPDATE users set name='".$_POST["name"]."', username='".$_POST["user"]."', address='".$_POST["address"]."',email='".$_POST["email"]."',phone='".$_POST["phone"]."', permissions='".$_POST["permissions"]."',passcode='".$mypassword."' where gid='".$_POST["gid"]."';");
			  $result=$loginModel->Query('UPDATE users set name=$1, username=$2, address=$3,email=$4,phone=$5, permissions=$6,passcode=$7 where gid=$8;',array($_POST["name"],$_POST["user"],$_POST["address"],$_POST["email"],$_POST["phone"],$_POST["permissions"],$mypassword,$_POST["gid"]));
			  echo '<p>User <b><i>'.$_POST["name"].'</b></i> successfully altered</p><button type="button" class="pure-button pure-button-green" onclick="botao2()">Ok</button>';
		  	}
		 }
  }



?>
