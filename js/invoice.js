function downloadInvoice(orderId) {
    const element = document.getElementById('order-details');
    // detailed configuration for better pdf output
    const opt = {
        margin:       0.5,
        filename:     `invoice-greenmart-${orderId}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true },
        jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    // Use html2pdf to generate and save the PDF
    html2pdf().set(opt).from(element).save();
}
