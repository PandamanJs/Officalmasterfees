/**
 * PDF Receipt Generator Utility
 * 
 * Generates professional payment receipts in PDF format using jsPDF
 * Features:
 * - Master-Fees branding with logo
 * - Service breakdown table
 * - 2% service fee calculation
 * - Responsive layout with proper spacing
 * - Black and white professional design
 */

import jsPDF from 'jspdf';

/**
 * Interface for checkout service items
 */
interface CheckoutService {
  id: string;
  description: string;
  amount: number;
  invoiceNo: string;
  studentName: string;
}

/**
 * Interface for receipt data
 * Contains all information needed to generate a receipt
 */
interface ReceiptData {
  schoolName: string;    // Name of the school
  totalAmount: number;   // Total payment amount (before service fee)
  refNumber: string;     // Payment reference number
  dateTime: string;      // Payment date and time
  scheduleId: string;    // Schedule/transaction ID
  services?: CheckoutService[];  // List of services paid for
}

/**
 * Generate a PDF receipt from payment data
 * 
 * @param data - Receipt data containing payment details and services
 * @returns void - Saves PDF file directly to user's device
 */
export function generateReceiptPDF(data: ReceiptData) {
  const { schoolName, totalAmount, refNumber, dateTime, scheduleId, services = [] } = data;
  
  // Create a new PDF document in portrait A4 format
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Calculate service fee (2% of total)
  const serviceFee = totalAmount * 0.02;
  const totalWithFee = totalAmount + serviceFee;

  // Page layout configuration
  let yPos = 25;  // Current Y position for content
  const leftMargin = 20;
  const rightMargin = pageWidth - 20;
  const contentWidth = rightMargin - leftMargin;

  // === HEADER SECTION ===
  
  // Add Master-Fees Icon (checkmark in diamond shape)
  doc.setFillColor(0, 0, 0);
  const iconCenterX = pageWidth / 2;
  const iconCenterY = yPos;
  const iconSize = 8;
  
  // Draw diamond shape using two triangles
  doc.setDrawColor(255, 255, 255);
  doc.setLineWidth(0.8);
  doc.setFillColor(0, 0, 0);
  
  // Define diamond corner points
  const diamondPath = [
    [iconCenterX, iconCenterY - iconSize / 2],  // Top
    [iconCenterX + iconSize / 2, iconCenterY],  // Right
    [iconCenterX, iconCenterY + iconSize / 2],  // Bottom
    [iconCenterX - iconSize / 2, iconCenterY]   // Left
  ];
  
  // Fill diamond with black using two triangles
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

  // Master-Fees heading - Large bold text
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(32);
  doc.setFont('helvetica', 'bold');
  doc.text('Master-Fees', pageWidth / 2, yPos, { align: 'center' });
  yPos += 10;

  // School name - Medium text
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

  // === PAYMENT DETAILS SECTION ===
  // Two column layout: Labels on left, values on right
  
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

  // Schedule ID
  doc.setFont('helvetica', 'normal');
  doc.text('Schedule ID', labelX, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(scheduleId, valueX, yPos, { align: 'right' });
  yPos += 8;

  // Service Fee (2% of total)
  doc.setFont('helvetica', 'normal');
  doc.text('Service Fee', labelX, yPos);
  doc.setFont('helvetica', 'bold');
  doc.text(`ZMW ${serviceFee.toFixed(2)}`, valueX, yPos, { align: 'right' });
  yPos += 15;

  // === SERVICES BREAKDOWN SECTION ===
  
  // Services heading
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

  // Services List - Display each service in the table
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  services.forEach((service) => {
    // Truncate description if too long
    const descText = service.description.length > 25 
      ? service.description.substring(0, 25) + '...' 
      : service.description;
    doc.text(descText, leftMargin + 3, yPos);
    
    // Student name with invoice number
    const studentText = `${service.studentName} - ${service.invoiceNo}`;
    const truncatedStudent = studentText.length > 40
      ? studentText.substring(0, 40) + '...'
      : studentText;
    doc.text(truncatedStudent, leftMargin + 65, yPos);
    
    // Amount in bold
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
  doc.setLineDash([]);  // Reset to solid line
  yPos += 10;

  // === TOTAL SECTION ===
  
  // Total Payment - Large and bold
  doc.setFontSize(13);
  doc.setFont('helvetica', 'normal');
  doc.text('Total Payment', leftMargin, yPos);
  
  doc.setFont('helvetica', 'bold');
  doc.text(`ZMW ${totalWithFee.toFixed(2)}`, rightMargin, yPos, { align: 'right' });
  yPos += 15;

  // === FOOTER SECTION ===
  
  // Thank you message
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Thank you for your payment!', pageWidth / 2, yPos, { align: 'center' });
  yPos += 7;

  // Legal disclaimer
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(80, 80, 80);
  doc.text('This is a computer-generated receipt and does not require a signature', 
    pageWidth / 2, yPos, { align: 'center', maxWidth: contentWidth });

  // Save the PDF with timestamp in filename
  const fileName = `Receipt_${refNumber}_${Date.now()}.pdf`;
  doc.save(fileName);
}