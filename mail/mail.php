<?php
/**
 * This example shows sending a message using PHP's mail() function.
 */
//require 'phpmailer/PHPMailerAutoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception; 
use PHPMailer\PHPMailer\SMTP; 

require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

//Create a new PHPMailer instance
$mail = new PHPMailer(true);

if( isset($_POST['name']) && isset($_POST['email']) ) {
	try{
		
		//Important - UPDATE YOUR RECEIVER EMAIL ID, NAME AND SUBJECT
		
		// Please enter your email ID 	
		$to_email = 'hello@creativekarmas.com';
		// Please enter your name		
		$to_name = "Creative Karma";
		// Please enter your Subject
		$subject = "Contact Us";
		
		$sender_name = $_POST['name'];
		$from_mail = $_POST['email'];	
		$mail->SetFrom( $from_mail , $sender_name );
		$mail->AddReplyTo( $from_mail , $sender_name );
		$mail->AddAddress( $to_email , $to_name );
		$mail->Subject = isset($_POST['subject']) ? $_POST['subject'] : $subject;		
		
		$received_content  = "Hi Karma, </br></br>You got a new lead from your website! The Details are as follows, </br></br>";
		
		$received_content .= "NAME : ". $sender_name ."</br>";
		$received_content .= "EMAIL : ". $from_mail ."</br>";
		
		if( isset($_POST['phone']) ) {
			$received_content .= "PHONE : ".$_POST['phone']."</br>";
		}
		
		if( isset($_POST['position']) ) {
			$received_content .= "PREFERRED JOB POSITION : ".$_POST['position']."</br>";
		}
		
		if( isset($_POST['experience']) ) {
			$received_content .= "YEARS OF EXPERIENCE : ".$_POST['experience']."</br>";
		}
		
		if( isset($_POST['services']) ) {
			$received_content .= "SERVICES : ".$_POST['services']."</br>";
		}
		
		if( isset($_POST['budget']) ) {
			$received_content .= "YOUR BUDGET : ".$_POST['budget']."</br>";
		}

		if( isset($_POST['project']) ) {
			$received_content .= "PROJECT DETAILS : ".$_POST['project']."</br>";
		}		
		
		if( isset($_POST['message']) ) {
			$received_content .= "WHAT ARE YOU LOOKING FOR : ".$_POST['message']."</br>";
		}

		if( isset($_FILES['resume']) ) {
			$file_tmp  = $_FILES['resume']['tmp_name'];
			$file_name = $_FILES['resume']['name'];
			
			$mail->AddAttachment($file_tmp, $file_name);
		}	
		
		$received_content  .= "</br></br>Thanks";
		
		//echo "<pre>"; print_r($received_content); exit;
		
		$mail->MsgHTML( $received_content );		
		
		if( $mail->Send() ){	
			$result = array( 'success' => true, 'message' => 'Mail send successfully!!!' );
		}else{
			$result = array( 'success' => false, 'message' => 'Mail not send. Please try again.' );
		}
	}	
	catch (phpmailerException $e) {	  
		$result = array( 'success' => false, 'message' => $e->errorMessage() );
	} catch (Exception $e) {	  
		$result = array( 'success' => false, 'message' => $e->getMessage() );
	}
	echo json_encode($result);
	exit;
}