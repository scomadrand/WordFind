<?php
	require_once 'dbconfig.php';
	$usuario = $_GET["usuario"];
	$puntos = $_GET["puntos"];

	$query =	"INSERT INTO `ranking` (`Nombre`, `Punt`) VALUES ('{$usuario}', '{$puntos}');";
	$result = mysqli_query($connection, $query) or die("Error in Selecting " . mysqli_error($connection));

	$query =	"SELECT * FROM `ranking` ORDER BY `ranking`.`Punt` DESC LIMIT 3";
	$result = mysqli_query($connection, $query) or die("Error in Selecting " . mysqli_error($connection));

	$emparray1 = array();
  while($row = mysqli_fetch_assoc($result)) {
  	$emparray1[] = $row;
	}

	echo json_encode($emparray1);
	

	mysqli_close($connection);
?>
