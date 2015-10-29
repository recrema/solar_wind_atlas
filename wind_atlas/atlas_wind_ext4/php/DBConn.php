<?php
error_reporting(E_ALL); // to change here the error reporting E_ALL for all E_ERROR just for errors!
ini_set("display_errors", "On");

class DBConn
{

	private $Host;
	private $SQLUsername;
	private $SQLPassword;
	private $Database;
	private $Conn;
	private $Port;
	public function DBConn()
	{
		$cred_class        = new credentials();
		$credentials       = $cred_class->get_credentials();
		$this->Host        = $credentials['host'];
		$this->SQLUsername = $credentials['user'];
		$this->SQLPassword = $credentials['pass'];
		$this->Database    = $credentials['db'];
		$this->Port        = $credentials['port'];
		//Makes the connection
		$this->Connection();
		//Destroys the specified variables
		unset($this->Host);
		unset($this->SQLUsername);
		unset($this->SQLPassword);
		unset($this->Database);
		unset($this->Port);
	}
	public function Connection()
	{
		$this->Conn = pg_connect("host=$this->Host user=$this->SQLUsername password=$this->SQLPassword port=$this->Port dbname=$this->Database") or die("Couldn't connect to SQL Server");
	}
	public function Disconnect()
	{
		pg_close($this->Conn);
	}	
}
class credentials
{
    private $Host;
    private $SQLUsername;
    private $SQLPassword;
    private $Database;
    private $Conn;
    private $Port;
    private $mapserver_host;
    private $root;
    
    public function get_credentials()
    {
        $this->Host        = "localhost";
        $this->SQLUsername = "atlasrecrema";
        $this->SQLPassword = "R3crema";
        $this->Database    = "recrema_atlas";
        $this->Port        = "5432";
        return array(
            'host' => $this->Host,
            'user' => $this->SQLUsername,
            'pass' => $this->SQLPassword,
            'db' => $this->Database,
            'port' => $this->Port
        );
    }
    
}
?>
