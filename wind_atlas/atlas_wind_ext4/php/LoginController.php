<?php
################################################################################################################################################
#		This loging controler is only for ajax requests just in case of the javascript need to request info 
#		about the user state. Its possible to check if user is loged in (action 1), Logout (action 2), Login (default, no action)
#		This code is the same used in the lock.php,login.php and logout.php
#
################################################################################################################################################
error_reporting(E_ALL); // to change here the error reporting E_ALL for all E_ERROR just for errors!
ini_set("display_errors", "On");

  $message['success'] = false;
  $action = 0;
  if(isset($_POST['_action'])){ $action = $_POST['_action']; };
  //Check if there is a user session 
  if($action == 1){
    require_once 'LoginModel.php';
    $loginModel = new LoginModel();
    $loginModel->IsAuth();
    if(LoginModel::$SUCCESS){
      $message['success'] = true;
      $message['group']=LoginModel::$GROUP;
      $message['user']=LoginModel::$USER;
    }
    echo json_encode($message);
  }
  //Logout
  elseif($action == 2){
  	require_once 'LoginModel.php';
  	$loginModel = new LoginModel();
  	$loginModel->Logout();
  	if(LoginModel::$SUCCESS){
  		$message['success'] = true;
  	}
  	echo json_encode($message);
  }
  //Login
  else{
  	$username =  $_POST["_user"];
    $password =  $_POST["_password"];
    require_once 'DBConn.php';
    $connection = new DBConn();

    require_once 'LoginModel.php';
    $loginModel = new LoginModel();
    $loginModel->CheckLogin($username,$password);
    if(!LoginModel::$SUCCESS){
      $message['error']['reason'] = LoginModel::$MESSAGE;
    }else{
      $message['success'] = true;
      $message['group']=LoginModel::$GROUP;
      $message['user']=LoginModel::$USER;
    }

    $connection->Disconnect();
    echo json_encode($message);
  }

?>
