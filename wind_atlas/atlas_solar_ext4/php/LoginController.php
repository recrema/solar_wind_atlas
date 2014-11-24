<?php

//ini_set('display_errors',1);

  $message['success'] = false;
  $action = 0;
  if(isset($_POST['_action'])){ $action = $_POST['_action']; };
  $notalowedchars = array("'", '"', "--", ";", "/", "%", ">","<","!");
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
  elseif($action == 2){
  	require_once 'LoginModel.php';
  	$loginModel = new LoginModel();
  	$loginModel->Logout();
  	if(LoginModel::$SUCCESS){
  		$message['success'] = true;
  	}
  	echo json_encode($message);
  }
  else{
//     $username = $_POST['_user'];
//     $password = $_POST['_password'];
    $username = str_replace($notalowedchars, "", $_POST["_user"]);
    $password = str_replace($notalowedchars, "", $_POST["_password"]);
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