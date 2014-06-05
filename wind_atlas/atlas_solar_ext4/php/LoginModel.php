<?php

class LoginModel{

	public static $SUCCESS = false;
	public static $GROUP = 0;
	public static $USER=0;
	public static $MESSAGE;
	public $Functions;
	
	//Username variables
	private $formuser;
	private $formpass;
	private $passwords = array();
	
	public function LoginModel(){
		require_once 'Functions.php';
		$Functions = new Functions();
		session_start();
	}

	public function Query($sql)
	{
		$result = pg_query($sql);
		if(!$result){die("Error on execution");}
		return $result;
	}	
	
	public function destroySession($name)
	{
		if(isset($_SESSION[$name]))
		{
			$_SESSION[$name] = NULL;
			unset($_SESSION[$name]);
		}
	}
	
	function generateHash($password) {
	    if (defined("CRYPT_BLOWFISH") && CRYPT_BLOWFISH) {
	        $salt = '$2y$11$' . substr(md5(uniqid(rand(), true)), 0, 22);
	        return crypt($password, $salt);
	    }
	    else {
		return 'BLOWFISH cryptography not avaiable in the server.';
		}
	}
	
	function verify($password, $hashedPassword) {
	    return crypt($password, $hashedPassword) == $hashedPassword;
	}

	public function CheckLogin($formuser,$formpass){
		$user = pg_escape_literal($formuser);
		$pass = pg_escape_literal($formpass);
		$result = $this->Query('SELECT username,gid,passcode,permissions FROM users WHERE username=\''.$formuser.'\' LIMIT 1');
		$row = pg_fetch_assoc($result);
		if($this->verify($formpass,$row['passcode']) == 1){
			$_SESSION['username'] = $row['username'];
			$_SESSION['gid'] = $row['gid'];
			$_SESSION['permissions'] = $row['permissions'];
			$_SESSION['authorized'] = 1;
			LoginModel::$SUCCESS = true;
			LoginModel::$GROUP = $_SESSION['permissions'];
			LoginModel::$USER = $_SESSION['username'];
		}
		else{
			$_SESSION['authorized'] = 0;
			$this->destroySession('username');
			$this->destroySession('gid');
			LoginModel::$MESSAGE = "Incorrect Username or Password.";
		}
	}
	#logout
	public function Logout(){
		if(isset($_SESSION['username']) && isset($_SESSION['gid'])&& isset($_SESSION['permissions']) && $_SESSION['authorized']==1){
			$this->destroySession('username');
			$this->destroySession('gid');
			$this->destroySession('permissions');
			$this->destroySession('authorized');
			LoginModel::$SUCCESS = true;
		}
		
	}
	
	//Checks if the user is authorized or not
	public function IsAuth(){
		if(isset($_SESSION['username']) && isset($_SESSION['gid'])&& isset($_SESSION['permissions']) && $_SESSION['authorized']==1){
			LoginModel::$SUCCESS = true;
			LoginModel::$GROUP = $_SESSION['permissions'];
			LoginModel::$USER = $_SESSION['username'];
		}
	}
}
?>
