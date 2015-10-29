<?php

class Functions
{
	private $MAX_LENGTH = 9;


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