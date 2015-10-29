<?php
error_reporting(E_ERROR); // to change here the error reporting E_ALL for all E_ERROR just for errors!
ini_set("display_errors", "Off");

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
		session_name("atlases");
		session_start();
	}

	public function Query($sql,$parm_array)
	{
// 		$result = pg_query($sql);
		$result = pg_query_params($sql,$parm_array);
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
	#login
	public function CheckLogin($formuser,$formpass){
		$user = $formuser;
		$pass = $formpass;
// 		$result = $this->Query('SELECT username,gid,passcode,permissions FROM users WHERE username=\''.$formuser.'\' LIMIT 1');
		$result = $this->Query('SELECT username,gid,passcode,permissions FROM users WHERE username=$1 LIMIT 1',array($formuser));
		$row = pg_fetch_assoc($result);
		if($this->verify($formpass,$row['passcode']) == 1){
			$_SESSION['username'] = $row['username'];
			$_SESSION['gid'] = $row['gid'];
			$_SESSION['permissions'] = $row['permissions'];
			$_SESSION['authorized'] = 1;
			$_SESSION['ip'] = $_SERVER['REMOTE_ADDR'];
			$_SESSION['project'] = 'atlases';
			LoginModel::$SUCCESS = true;
			LoginModel::$GROUP = $_SESSION['permissions'];
			LoginModel::$USER = $_SESSION['username'];
		}
		else{
			$_SESSION['authorized'] = 0;
			$this->destroySession('username');
			$this->destroySession('gid');
			sleep(3); # if the user is invalid we will wait 3 seconds, to minimize brute force attacks
			LoginModel::$MESSAGE = "Incorrect Username or Password.";
		}
		
	}
	#logout
	public function Logout(){
		if(isset($_SESSION['username']) && isset($_SESSION['gid'])&& isset($_SESSION['permissions'])&&isset($_SESSION['project']) && $_SESSION['authorized']==1 && $_SESSION['project']=='atlases'){
			session_destroy();
			LoginModel::$SUCCESS = true;
		}
		
	}
	
	//Checks if the user is authorized or not
	public function IsAuth(){
		if(isset($_SESSION['username']) && isset($_SESSION['gid'])&& isset($_SESSION['permissions'])&&isset($_SESSION['project']) && $_SESSION['authorized']==1 && $_SESSION['project']=='atlases'){
			LoginModel::$SUCCESS = true;
			LoginModel::$GROUP = $_SESSION['permissions'];
			LoginModel::$USER = $_SESSION['username'];
		}
	}
}
?>
