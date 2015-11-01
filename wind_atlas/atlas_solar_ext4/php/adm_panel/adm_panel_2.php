<?php
error_reporting(E_ERROR); // to change here the error reporting E_ALL for all E_ERROR just for errors!
ini_set("display_errors", "Off");

session_name("atlases");
session_start();

if (isset($_SESSION['username'])){
$user_check=$_SESSION['username'];
$login_session=$_SESSION['username'];
$login_sessionid=$_SESSION['gid'];
$login_sessiongroup=$_SESSION['permissions'];
$permissions=$login_sessiongroup;
$user_id=$login_sessionid;
}

?>
<!DOCTYPE html>
<html>
<head>

	<title>Administration panel</title>

	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1"/>

	<link rel="stylesheet" href="grey/combo.css">
	<link type="text/css" rel="stylesheet" href="grey/grey_panel.css"/>

	<style type="text/css">
		html,body,#main {
			overflow: hidden;
			width: 100%; height:100%;
		}

		#main {
			
			position: absolute;
			top: 0; left: 0;
		}
		
		
	</style>

	<style>

        .pure-button-primary {
            background: rgb(56, 146, 211); /* blue */
	    position:relative;
	    left: 100px;
        }
        .pure-button-secondary {
            background: rgb(56, 146, 211); /* blue */
        }
        .pure-button-green {
            background: rgb(230, 74, 33); /* oranje */
        }

  	  </style>



	<script>
	//var utilizador=;
	var tuser;
	var tusers;
	function getUsers(gid)
		{
			var xmlhttp;
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5# this webpage does not suport IE6 and below, Microsoft says so! Google says so! I say so!
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function()
			  {
			  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
				tusers=JSON.parse(xmlhttp.responseText);
				
				}
			  }
			xmlhttp.open("POST","ajax_server.php",false);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("act=users&gid="+gid);
		}
		
	function getUser(gid)
		{

			var xmlhttp;
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5# this webpage does not suport IE6 and below, Microsoft says so! Google says so! I say so!
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function()
			  {
			  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
				tuser=JSON.parse(xmlhttp.responseText);
				}
			  }
			xmlhttp.open("POST","ajax_server.php",false);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("act=user&gid="+gid);

		}
	
	function botao1() //button 1
	{
	document.getElementById('botao1').setAttribute('class', 'pure-button pure-button-disabled'); 
	<?php 
	 if ($permissions=='1')
	 {
		 echo "document.getElementById('botao2').setAttribute('class', 'pure-button');document.getElementById('botao3').setAttribute('class', 'pure-button');";
  	}
	 ?>

	cria_block_formulario();
	}

	function botao2() //button 2
	{
	document.getElementById('botao2').setAttribute('class', 'pure-button pure-button-disabled'); 
	document.getElementById('botao1').setAttribute('class', 'pure-button');
	document.getElementById('botao3').setAttribute('class', 'pure-button');
	cria_tabela();
	}

	function botao3() //button 3
	{
	document.getElementById('botao3').setAttribute('class', 'pure-button pure-button-disabled'); 
	document.getElementById('botao1').setAttribute('class', 'pure-button');
	document.getElementById('botao2').setAttribute('class', 'pure-button');
	cria_clean_formulario();
	}

	function cria_block_formulario() {
	getUser(<?php echo $user_id; ?>);
	document.getElementById('centro').innerHTML = '<form id="edit_table" class="pure-form pure-form-stacked"><fieldset><label for="name">Name</label><input class="pure-input-1-2" id="name" type="text" disabled placeholder='+tuser[0].name+'><label for="address">Address</label><input class="pure-input-1-2" id="address" type="text" disabled placeholder='+tuser[0].address+'><label for="email">Email</label><input class="pure-input-1-2" id="email" type="email" disabled placeholder='+tuser[0].email+'><label for="phone">Phone</label><input id="phone" type="text" disabled placeholder='+tuser[0].phone+'><div class="pure-g"><div class="pure-u-1-3"><label for="username">Username</label><input id="username" type="text" disabled placeholder='+tuser[0].username+'></div><div class="pure-u-1-3"><label for="permissions">Permissions</label><input id="permissions" type="text" disabled placeholder='+tuser[0].permissions+'></div></div><label for="password">Password</label><input id="password" type="password" disabled placeholder="******"><br></fieldset></form><button type="button" id="botao_edit" class="pure-button pure-button-primary" onclick="cria_edit_formulario()">Click to edit</button>';
	
	}

	function cria_edit_formulario() {
	getUser(<?php echo $user_id; ?>);
	document.getElementById('centro').innerHTML = '<form id="edit_table" class="pure-form pure-form-stacked"><fieldset><label for="name">Name</label><input class="pure-input-1-2" id="name" type="text" placeholder='+tuser[0].name+'><label for="address">Address</label><input class="pure-input-1-2" id="address" type="text" placeholder='+tuser[0].address+'><label for="email">Email</label><input class="pure-input-1-2" id="email" type="email" placeholder='+tuser[0].email+'><label for="phone">Phone</label><input id="phone" type="text" placeholder='+tuser[0].phone+'><div class="pure-g"><div class="pure-u-1-3"><label for="username">Username</label><input id="username" type="text" placeholder='+tuser[0].username+'></div><div class="pure-u-1-3"><label for="permissions">Permissions</label><input id="permissions" type="text" disabled placeholder='+tuser[0].permissions+'></div></div><div class="pure-g"><div class="pure-u-1-3"><label for="oldpassword">Current Password *</label><input id="oldpassword" type="password" placeholder="" required></div><div class="pure-u-1-3"><label for="password">New Password</label><input id="password" type="password" placeholder=""></div><div class="pure-u-1-3"><label for="password2">Confirm New Password</label><input id="password2" type="password" placeholder=""></div></div> <br><button type="button" class="pure-button pure-button-green" onclick="botao1()">Cancel</button><button type="button" class="pure-button pure-button-primary" onclick="submit_editUser()">Save</button></fieldset></form>';
	}
	
	function cria_config_edit_formulario(id) {

	document.getElementById('centro').innerHTML = '<form id="edit_table" class="pure-form pure-form-stacked"><fieldset><label for="name">Name</label><input class="pure-input-1-2" id="name" type="text" placeholder='+tusers[id].name+'><label for="address">Address</label><input class="pure-input-1-2" id="address" type="text" placeholder='+tusers[id].address+'><label for="email">Email</label><input class="pure-input-1-2" id="email" type="email" placeholder='+tusers[id].email+'><label for="phone">Phone</label><input id="phone" type="text" placeholder='+tusers[id].phone+'><div class="pure-g"><div class="pure-u-1-3"><label for="username">Username</label><input id="username" type="text" placeholder='+tusers[id].username+'></div><div class="pure-u-1-3"><label for="permissionsact">Permissions</label><input id="permissionsact" type="text" disabled placeholder='+tusers[id].permissions+'></div><div class="pure-u-1-3"><label for="permissions">New Permissions</label><select id="permissions"><option value="">None</option><option value="1">Administrator</option><option value="2">User</option></select></div></div><div class="pure-g"><div class="pure-u-1-3"><label for="password">New Password</label><input id="password" type="password" placeholder=""></div><div class="pure-u-1-3"><label for="password2">Confirm New Password</label><input id="password2" type="password" placeholder=""></div></div> <br><button type="button" class="pure-button pure-button-green" onclick="botao1()">Cancel</button><button type="button" class="pure-button pure-button-primary" onclick="submit_confEditUser('+id+')">Save</button></fieldset></form>';
	
	//'<form id="edit_table" class="pure-form pure-form-stacked"><fieldset><legend>Editar utilizador <b><i>'+tusers[id].name+'</b></i></legend><label for="name">name</label><input class="pure-input-1-2" id="name" type="text" placeholder='+tusers[id].name+'><label for="address">address</label><input class="pure-input-1-2" id="address" type="text" placeholder='+tusers[id].address+'><label for="email">Email</label><input class="pure-input-1-2" id="email" type="email" placeholder='+tusers[id].email+'><label for="phone">phone</label><input id="phone" type="text" placeholder='+tusers[id].phone+'><label for="username">Username</label><input id="username" type="text" placeholder='+tusers[id].username+'><label for="password">Password</label><input id="password" type="password" placeholder="******"><br><button type="button" class="pure-button pure-button-green" onclick="cria_tabela()">Cancelar</button><button type="button" class="pure-button pure-button-primary" onclick="">Guardar altera��es</button></fieldset></form>';
	}

	function cria_clean_formulario() {

	document.getElementById('centro').innerHTML = '<form id="edit_table" class="pure-form pure-form-stacked"><fieldset><label for="name">Name *</label><input class="pure-input-1-2" id="name" type="text" placeholder="" required><label for="address">Address</label><input class="pure-input-1-2" id="address" type="text" placeholder=""></div><label for="email">Email *</label><input class="pure-input-1-2" id="email" type="email" placeholder="" required><label for="phone">Phone *</label><input id="phone" type="text" placeholder="" required><div class="pure-g"><div class="pure-u-1-3"><label for="username">Username *</label><input id="username" type="text" placeholder="" required></div><div class="pure-u-1-3"><label for="permissions">Permissions</label><select id="permissions"><option value="1">Administrator</option><option value="2">User</option></select></div></div> <div class="pure-g"><div class="pure-u-1-3"><label for="password">Password *</label><input id="password" type="password" placeholder="" required></div><div class="pure-u-1-3"><label for="password2">Confirm Password *</label><input id="password2" type="password" placeholder="" required></div></div> <br><button type="button" class="pure-button pure-button-green" onclick="botao3()">Reset</button><button type="button" class="pure-button pure-button-primary" onclick="submit_insertUser()">Save New User</button></fieldset></form>';
	}

	function cria_tabela()
	{
	getUsers(<?php echo $user_id; ?>);
	//limpar o conteudo da div centro
	document.getElementById('centro').innerHTML = "";
	  // get the reference for the body
	  var body = document.getElementById("centro");
	  // creates a <table> element and a <tbody> element
	  var tbl     = document.createElement("table");
	  // cria o cabecalho
	  tbl.className = "pure-table pure-table-horizontal";
	  var tblHead = document.createElement("thead");
	  var rowHead = document.createElement("tr");
	  var cabecalho=["Name","Permissions","Username","Address","", ""];
	  for (var i = 0; i < cabecalho.length; i++) {
		  var cellHead = document.createElement("th");
		  var cellHeadText = document.createTextNode(cabecalho[i]);
	      cellHead.appendChild(cellHeadText);
	      rowHead.appendChild(cellHead);
	  }
	 tblHead.appendChild(rowHead);
	  var tblBody = document.createElement("tbody");
	  // creating all cells
	  for (var j = 0; j < tusers.length; j++) {
	    // creates a table row
	    var row = document.createElement("tr");
	    var cell1 = document.createElement("td");
	    var cell1Text = document.createTextNode(tusers[j].name);
 	    cell1.appendChild(cell1Text);
	    row.appendChild(cell1);
	    var cell2 = document.createElement("td");
	    var cell2Text = document.createTextNode(tusers[j].permissions);
	    cell2.appendChild(cell2Text);
	    row.appendChild(cell2);
	    var cell3 = document.createElement("td");
	    var cell3Text = document.createTextNode(tusers[j].username);
 	    cell3.appendChild(cell3Text);
	    row.appendChild(cell3);
	    var cell4 = document.createElement("td");
	    var cell4Text = document.createTextNode(tusers[j].address);
	    cell4.appendChild(cell4Text);
	    row.appendChild(cell4);
	    var cell5 = document.createElement("td");
	    var cell5Element = document.createElement("button");
		cell5Element.setAttribute("class", "pure-button pure-button-green");
		cell5Element.setAttribute("onclick", "cria_config_edit_formulario("+j+")");
	    var cell5ElementText = document.createTextNode('Edit');
	    cell5Element.appendChild(cell5ElementText);
	    cell5.appendChild(cell5Element);
	    row.appendChild(cell5);
	    var cell6 = document.createElement("td");
	    var cell6Element = document.createElement("button");
		cell6Element.setAttribute("class", "pure-button pure-button-secondary");
		cell6Element.setAttribute("onclick", "submit_boxDelete("+tusers[j].gid+")");
	    var cell6ElementText = document.createTextNode('Delete');
	    cell6Element.appendChild(cell6ElementText);
	    cell6.appendChild(cell6Element);
	    row.appendChild(cell6);
	     // add the row to the end of the table body
	    tblBody.appendChild(row);
	  }
	  // put the <tbody> in the <table>
	  tbl.appendChild(tblHead);
	  tbl.appendChild(tblBody);
	  // appends <table> into <body>
	  body.appendChild(tbl);
	  // sets the border attribute of tbl to 2;
	  tbl.setAttribute("border", "1");
	}
	
		
	function submit_boxDelete(gid)
		{
		var x;
		var r=confirm("Are you sure you want to delete this registry?");
		if (r==true)
		  {
			var xmlhttp;
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function()
			  {
			  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
				document.getElementById("centro").innerHTML=xmlhttp.responseText;
				}
			  }
			xmlhttp.open("POST","users_admin.php",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("action=del&gid="+gid+"&user="+<?php echo $user_id; ?>);
		  }
		else
		  {
		  x="You pressed Cancel!";
		}
		}
		
		
		function submit_insertUser()
		{
		var x;
		var r=confirm("Are you sure you want to insert this registry?");
		if (r==true)
		  {
			var name=document.getElementById("name").value;
			if (name==null || name=="")
			  {
			  alert("Insert name!");
			  return false;
			  }
			var address=document.getElementById("address").value;

			var email=document.getElementById("email").value;
			if (email==null || email=="")
			  {
			  alert("Insert email!");
			  return false;
			  }
			var phone=document.getElementById("phone").value;
			if (phone==null || phone=="")
			  {
			  alert("Insert phone!");
			  return false;
			  }
			var username=document.getElementById("username").value;
			if (username==null || username=="")
			  {
			  alert("Insert username!");
			  return false;
			  }
			var permissions=document.getElementById("permissions").value;
			var pass=document.getElementById("password").value;
			var pass2=document.getElementById("password2").value;

			if (pass!=pass2)
			  {
			  alert("Passwords do not match!");
			  return false;
			  }
			
			var xmlhttp;
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function()
			  {
			  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
				document.getElementById("centro").innerHTML=xmlhttp.responseText;
				}
			  }
			xmlhttp.open("POST","users_admin.php",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("action=ins&name="+name+"&address="+address+"&email="+email+"&phone="+phone+"&user="+username+"&pass="+pass+"&permissions="+permissions);
		  }
		else
		  {
		  x="You pressed Cancel!";
		}
		}
		
		function submit_editUser()
		{
		var x;
		var r=confirm("Are you sure you want to change this registry?");
		if (r==true)
		  {
			var name=document.getElementById("name").value;
			if (name==null || name=="")
			  {
			name=tuser[0].name
			  }
			var address=document.getElementById("address").value;
			if (address==null || address=="")
			  {
			address=tuser[0].address
			  }
			var email=document.getElementById("email").value;
			if (email==null || email=="")
			  {
			email=tuser[0].email
			  }
			var phone=document.getElementById("phone").value;
			if (phone==null || phone=="")
			  {
			phone=tuser[0].phone
			  }
			var username=document.getElementById("username").value;
			if (username==null || username=="")
			  {
			username=tuser[0].username
			  }
			var permissions=document.getElementById("permissions").value;
			if (permissions==null || permissions=="")
			  {
			permissions=tuser[0].permissions
			  }
			var oldPass=document.getElementById("oldpassword").value;
			if (oldPass==null || oldPass=="")
			  {
			  alert("You need to insert your password to save the alterations!");
			  return false;
			  }
			var pass=document.getElementById("password").value;
			var pass2=document.getElementById("password2").value;

			if (pass!=pass2)
			  {
			  alert("Confirm the new password!");
			  return false;
			  }
			
			var xmlhttp;
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function()
			  {
			  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
				document.getElementById("centro").innerHTML=xmlhttp.responseText;
				}
			  }
			xmlhttp.open("POST","users_admin.php",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("action=edit&name="+name+"&address="+address+"&email="+email+"&phone="+phone+"&user="+username+"&pass="+pass+"&gid="+<?php echo $user_id; ?>+"&oldpass="+oldPass+"&permissions="+permissions);
		  }
		else
		  {
		  x="You pressed Cancel!";
		}
		}
		
		function submit_confEditUser(id)
		{
		var x;
		var r=confirm("Are you sure you want to change this registry?");
		if (r==true)
		  {
			var name=document.getElementById("name").value;
			if (name==null || name=="")
			  {
			name=tusers[id].name
			  }
			var address=document.getElementById("address").value;
			if (address==null || address=="")
			  {
			address=tusers[id].address
			  }
			var email=document.getElementById("email").value;
			if (email==null || email=="")
			  {
			email=tusers[id].email
			  }
			var phone=document.getElementById("phone").value;
			if (phone==null || phone=="")
			  {
			phone=tusers[id].phone
			  }
			var username=document.getElementById("username").value;
			if (username==null || username=="")
			  {
			username=tusers[id].username
			  }
			var permissions=document.getElementById("permissions").value;
			if (permissions==null || permissions=="")
			  {
			permissions=tusers[id].permissions
			  }
			var pass=document.getElementById("password").value;
			var pass2=document.getElementById("password2").value;

			if (pass!=pass2)
			  {
			  alert("Confirm the new password!");
			  return false;
			  }
			
			var xmlhttp;
			if (window.XMLHttpRequest)
			  {// code for IE7+, Firefox, Chrome, Opera, Safari
			  xmlhttp=new XMLHttpRequest();
			  }
			else
			  {// code for IE6, IE5
			  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
			  }
			xmlhttp.onreadystatechange=function()
			  {
			  if (xmlhttp.readyState==4 && xmlhttp.status==200)
				{
				document.getElementById("centro").innerHTML=xmlhttp.responseText;
				}
			  }
			xmlhttp.open("POST","users_admin.php",true);
			xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.send("action=confedit&name="+name+"&address="+address+"&email="+email+"&phone="+phone+"&user="+username+"&pass="+pass+"&gid="+tusers[id].gid+"&permissions="+permissions);
		  }
		else
		  {
		  x="You pressed Cancel!";
		}
		}
		  
	</script>



</head>
<body>

<div id="hidden_form_container" style="display:none;"></div>
 	<div id="header"> 
		<div id="headerText">
		</div> 
 	</div> 

	<div id="middle">
	<div id="painel">
		
		
		<button id="botao1" class="pure-button pure-button-disabled" onclick="botao1()">Edit</button>
	<?php 
	 if (isset($permissions) && $permissions=='1')
	 {
		 echo '		<button id="botao2" class="pure-button" onclick="botao2()">Configure users</button>
		<button id="botao3" class="pure-button" onclick="botao3()">Add users</button>';
  	}
	 ?>

	</div>

	<div id="centro">
		<script>

			botao1();
		</script>
		<?php 
		if(!isset($login_session)){
			echo "<h2>Your Session has expired, please close this window, click on logout button and then on login again.!</h2>";
		}
		?>
		
	</div>


	</div>
 	<div id="footer">  

 	</div> 



</body>
</html>
