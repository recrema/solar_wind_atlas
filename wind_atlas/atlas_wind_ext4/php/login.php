<?php
require_once 'DBConn.php';
$connection = new DBConn();

require_once 'LoginModel.php';
$loginModel = new LoginModel();
$loginModel->CheckLogin('admin','admin');

echo(LoginModel::$SUCCESS);
echo('<br>');
echo('------------');
echo('<br>');
echo(LoginModel::$MESSAGE);
echo('<br>');
echo($_SESSION['username']);
echo('<br>');
echo($_SESSION['gid']);
echo('<br>');
echo($_SESSION['authorized']);
echo('<br>');

?>
