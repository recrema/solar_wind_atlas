<?php
require_once('../../lib/fpdf17/fpdf.php');
require_once('../../lib/FPDI-1.5.1/fpdi.php');
# Open the PDF Template
$pdf = new FPDI();
$pagecount=$pdf->setSourceFile('../tmp/silah.pdf');

for ($loop = 1; $loop <= $pagecount; $loop++) {
	$tplidx = $pdf->importPage($loop);

	$templateSize = array(((float)8.5)*72,((float)11)*72); // all the x y width and height are in inches

	$pdf->SetAutoPageBreak(false);

	$pdf->addPage('P', $templateSize);
	$pdf->useTemplate($tplidx, 0, 0, $templateSize[0], $templateSize[1]);
	/* ****************************************
	 * 			PAGINA 1
	* ****************************************/
	if ($loop == 1){
		$pdf->SetTextColor(0,0,0);
		$pdf->SetXY(1*72,1*72);
		$pdf->SetFont('Arial', 'B', 20);
		$pdf->Cell(1,10,'Title');
	}
}

$pdf->Output('../tmp/teste.pdf');

?>