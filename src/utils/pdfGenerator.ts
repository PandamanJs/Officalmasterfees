import jsPDF from 'jspdf';

interface CheckoutService {
  id: string;
  description: string;
  amount: number;
  invoiceNo: string;
  studentName: string;
}

interface ReceiptData {
  schoolName: string;
  totalAmount: number;
  refNumber: string;
  dateTime: string;
  scheduleId: string;
  services?: CheckoutService[];
}

export function generateReceiptPDF(data: ReceiptData) {
  const { schoolName, totalAmount, refNumber, dateTime, scheduleId, services = [] } = data;
  
  // Create a new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Calculate service fee (2%)
  const serviceFee = totalAmount * 0.02;
  const totalWithFee = totalAmount + serviceFee;

  // White background (default)
  let yPos = 25;
  const leftMargin = 20;
  const rightMargin = pageWidth - 20;
  const contentWidth = rightMargin - leftMargin;

  // Add Master-Fees Icon (simplified checkmark in diamond)
  doc.setFillColor(0, 0, 0);
  const iconCenterX = pageWidth / 2;
  const iconCenterY = yPos;
  const iconSize = 8;
  
  // Draw diamond shape
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.8);
  doc.setFillColor(0, 0, 0);
  
  // Diamond points
  const diamondPath = [
    [iconCenterX, iconCenterY - iconSize / 2],
    [iconCenterX + iconSize / 2, iconCenterY],
    [iconCenterX, iconCenterY + iconSize / 2],
    [iconCenterX - iconSize / 2, iconCenterY]
  ];
  
  doc.setFillColor(0, 0, 0);
  doc.triangle(
    diamondPath[0][0], diamondPath[0][1],
    diamondPath[1][0], diamondPath[1][1],
    diamondPath[2][0], diamondPath[2][1],
    'FD'
  );
  doc.triangle(
    diamondPath[0][0], diamondPath[0][1],
    diamondPath[2][0], diamondPath[2][1],
    diamondPath[3][0], diamondPath[3][1],
    'FD'
  );
  
  yPos += 12;

  // Master-Fees heading
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('Master-Fees', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  // School name
  doc.setFontSize(16);
  doc.setFont('helvetica', 'normal');
  doc.text(schoolName, pageWidth / 2, yPos, { align: 'center' });
  yPos += 12;

  // Payment Receipt heading
  doc.setFontSize(18);
  doc.setFont('helvetica', 'normal');
  doc.text('Payment Receipt', pageWidth / 2, yPos, { align: 'center' });
  yPos += 8;

  // Success message
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Your payment has been successfully done.', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  // Horizontal line separator
  doc.setDrawColor(0, 54, 48);
  doc.setLineWidth(0.5);
  doc.line(leftMargin, yPos, rightMargin, yPos);
  yPos += 10;

  // Payment Details - Two column layout
  doc.setFontSize(11);
  doc.setTextColor(0, 0, 0);
  const labelX = leftMargin;
  const valueX = rightMargin;

  // Ref Number
  doc.setFont('helvetica', 'normal');
  doc.text('Ref Number', labelX, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(refNumber, valueX, yPos, { align: 'right' });
  yPos += 8;

  // Payment Time
  doc.setFont('helvetica', 'normal');
  doc.text('Payment Time', labelX, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(dateTime, valueX, yPos, { align: 'right' });
  yPos += 8;

  // Payment Method
  doc.setFont('helvetica', 'normal');
  doc.text('Payment Method', labelX, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text('Mobile Money', valueX, yPos, { align: 'right' });
  yPos += 8;

  // Sender Name
  doc.setFont('helvetica', 'normal');
  doc.text('Sender Name', labelX, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text('Parent', valueX, yPos, { align: 'right' });
  yPos += 10;

  // Schedule ID (left aligned only)
  doc.setFont('helvetica', 'normal');
  doc.text('Schedule ID', labelX, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(scheduleId, valueX, yPos, { align: 'right' });
  yPos += 8;

  // Service Fee (left aligned only)
  doc.setFont('helvetica', 'normal');
  doc.text('Service Fee', labelX, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(`ZMW ${serviceFee.toFixed(2)}`, valueX, yPos, { align: 'right' });
  yPos += 15;

  // Services Breakdown heading
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Services Breakdown', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  // Table Header - Black background with white text
  const tableHeaderY = yPos;
  doc.setFillColor(0, 0, 0);
  doc.roundedRect(leftMargin, yPos - 6, contentWidth, 10, 2, 2, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text('Description', leftMargin + 3, yPos);
  doc.text('Student', leftMargin + 65, yPos);
  doc.text('Amount', rightMargin - 3, yPos, { align: 'right' });
  yPos += 12;

  // Services List - Black text on white background
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  services.forEach((service) => {
    // Description
    const descText = service.description.length > 25 
      ? service.description.substring(0, 25) + '...' 
      : service.description;
    doc.text(descText, leftMargin + 3, yPos);
    
    // Student - Invoice
    const studentText = `${service.studentName} - ${service.invoiceNo}`;
    const truncatedStudent = studentText.length > 40
      ? studentText.substring(0, 40) + '...'
      : studentText;
    doc.text(truncatedStudent, leftMargin + 65, yPos);
    
    // Amount
    doc.setFont('helvetica', 'bold');
    doc.text(`K${service.amount.toFixed(2)}`, rightMargin - 3, yPos, { align: 'right' });
    doc.setFont('helvetica', 'normal');
    
    yPos += 7;
  });

  yPos += 8;

  // Dotted line separator
  doc.setLineDash([2, 2]);
  doc.setDrawColor(0, 54, 48);
  doc.setLineWidth(0.5);
  doc.line(leftMargin, yPos, rightMargin, yPos);
  doc.setLineDash([]);
  yPos += 10;

  // Total Payment
  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.text('Total Payment', leftMargin, yPos);
  
  doc.setFont('helvetica', 'bold');
  doc.text(`ZMW ${totalWithFee.toFixed(2)}`, rightMargin, yPos, { align: 'right' });
  yPos += 15;

  // Thank you message
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Thank you for your payment!', pageWidth / 2, yPos, { align: 'center' });
  yPos += 7;

  // Disclaimer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('This is a computer-generated receipt and does not require a signature', 
    pageWidth / 2, yPos, { align: 'center', maxWidth: contentWidth });

  // Save the PDF
  const fileName = `Receipt_${refNumber}_${Date.now()}.pdf`;
  doc.save(fileName);
}
