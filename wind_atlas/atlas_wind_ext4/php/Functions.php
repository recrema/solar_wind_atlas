<?php

class Functions
{
	private $MAX_LENGTH = 9;

    public function Query($query)
    {
    	require_once 'DBConn.php';
    	$dbconn = new DBConn();
    	$newConn = $dbconn->NewConnection();
    	$success = $newConn['success'];
    	$conn = $newConn['connection'];
    	if($success){
	        try {
	        	$result = $conn->query($query);
		    	return array('success'=>true,'results'=>$result);
		    }
		    catch(PDOException $e)
		    {
		    	return array('success'=>false,'errcode'=>$e->getCode(),'errmessage'=>$e->getMessage());
		    }
    	}
    }

    public function generateHash($s) {
    	$intermediateSalt = uniqid(rand(), true);
    	$salt = substr($intermediateSalt, 0, $this->MAX_LENGTH);
    	return array(hash("sha256", $s . $salt),$intermediateSalt);
    }    

    public function escapeLiteral($strings) {
    	$result = array();
    	foreach ($strings as &$v) {
    		array_push($result,pg_escape_literal($v));
    	}
    	return array($result);
    }
    
}

?>