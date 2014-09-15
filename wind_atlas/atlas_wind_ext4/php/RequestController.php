<?php

require_once ('../../lib/recaptcha-php-1.11/recaptchalib.php');

$privatekey = "6Lekj_ISAAAAAGyficFGrtB4BHYg4lAPuOJ9Ij5Y";
$resp = recaptcha_check_answer($privatekey, $_SERVER["REMOTE_ADDR"], $_POST["recaptcha_challenge_field"], $_POST["recaptcha_response_field"]);

if (!$resp->is_valid)
	{

	// What happens when the CAPTCHA was entered incorrectly

	$message['error']['reason'] = "The reCAPTCHA wasn't entered correctly. Go back and try it again.";
	$message['error']['response'] = "(reCAPTCHA said: " . $resp->error . ")";
	}
  else
	{
	require ("../../lib/PHPMailer-master/class.phpmailer.php");

	$mail = new PHPMailer();
	$mail->IsSMTP();
	$mail->Host = "mail.masdar.ac.ae";

	// $mail->SMTPAuth = true; // SMTP? (optional)
	// $mail->Username = 'seumail@dominio.net'; // User SMTP
	// $mail->Password = 'senha'; // Password SMTP
	require_once 'LoginModel.php';
	$loginModel = new LoginModel();
	$loginModel->IsAuth();
	if(LoginModel::$SUCCESS){
		$isauth = true;
		$group=LoginModel::$GROUP;
		$user=LoginModel::$USER;
	}
	$mail->From = $_POST["email"];
	$mail->FromName = $_POST["name"];
	$mail->AddAddress('lcalisto@masdar.ac.ae');
// 	$mail->AddAddress('jestima@masdar.ac.ae');
	$mail->IsHTML(true);
	$mail->Subject = 'Recrema Wind Atlas Request- ';
	$mail->Subject .= $_POST["summary"];
	$mail->Body = utf8_decode($_POST["request"]);
	if (isset($isauth)){
		$mail->Body .= utf8_decode("<p>&nbsp;</p><p>&nbsp;</p><p>This User is registered in the Atlas, the username is: <b>$user</b> &nbsp;and the group is: <b>$group</b> &nbsp;</p>");
	}
	else{
		$mail->Body .= utf8_decode("<p>&nbsp;</p><p>&nbsp;</p><p>This user is not registered in the Atlas! &nbsp;</p>");
	}
	$sentmail = $mail->Send();
	// clean
	$mail->ClearAllRecipients();
	$mail->ClearAttachments();
	if ($sentmail)
		{
		$message['msg'] = 'Thank you for your request. We will contact you if we need more information or as soon as the report is ready.';
		$message['success'] = true;
		}
	  else
		{
		$message['error']['reason'] = 'Could not send message! Please try again later.';
		$message['error']['response']=$sentmail;
		}
	}

echo json_encode($message);
?>