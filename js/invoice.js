const downloadInvoice = (orderId) => {
    const order = storage.getOrderById(orderId);
    if (!order) {
        showToast('Order not found', 'error');
        return;
    }

    // Create a temporary element for the professional invoice
    const invoiceElement = document.createElement('div');
    invoiceElement.style.width = '800px';
    invoiceElement.style.padding = '40px';
    invoiceElement.style.background = '#fff';
    invoiceElement.style.fontFamily = "'Inter', sans-serif";
    invoiceElement.innerHTML = `
        <!-- Header -->
        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 40px;">
            <div>
                <h1 style="color: var(--color-primary); font-size: 32px; margin: 0; display: flex; align-items: center;">
                    <span style="font-size: 40px; margin-right: 10px;">🌿</span> GreenMart
                </h1>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Premium Online Shopping</p>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">Dhaka, Bangladesh</p>
                <p style="color: #666; margin: 5px 0 0 0; font-size: 14px;">support@greenmart.com</p>
            </div>
            <div style="text-align: right;">
                <h2 style="color: #333; margin: 0 0 10px 0; font-size: 24px;">INVOICE</h2>
                <p style="margin: 0; color: #666;"><strong>Invoice #:</strong> INV-${order.id}</p>
                <p style="margin: 5px 0 0 0; color: #666;"><strong>Date:</strong> ${new Date(order.createdAt).toLocaleDateString()}</p>
                <p style="margin: 5px 0 0 0; color: #666;"><strong>Order ID:</strong> ${order.id}</p>
            </div>
        </div>

        <!-- Bill To -->
        <div style="margin-bottom: 40px; padding: 20px; background: #f9fafb; border-radius: 8px;">
            <h3 style="margin: 0 0 10px 0; font-size: 16px; color: #333; text-transform: uppercase;">Bill To:</h3>
            <p style="margin: 0; font-weight: 600; font-size: 18px; color: #111;">${order.customer.firstName} ${order.customer.lastName}</p>
            <p style="margin: 5px 0 0 0; color: #555;">${order.customer.address}</p>
            <p style="margin: 5px 0 0 0; color: #555;">${order.customer.city}, ${order.customer.district} ${order.customer.postalCode || ''}</p>
            <p style="margin: 5px 0 0 0; color: #555;">${order.customer.phone}</p>
            <p style="margin: 5px 0 0 0; color: #555;">${order.customer.email}</p>
        </div>

        <!-- Items Table -->
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
            <thead>
                <tr style="background: var(--color-primary); color: white;">
                    <th style="padding: 12px; text-align: left; border-radius: 6px 0 0 6px;">Item</th>
                    <th style="padding: 12px; text-align: right;">Price</th>
                    <th style="padding: 12px; text-align: center;">Qty</th>
                    <th style="padding: 12px; text-align: right; border-radius: 0 6px 6px 0;">Total</th>
                </tr>
            </thead>
            <tbody>
                ${order.items.map((item, index) => `
                <tr style="border-bottom: 1px solid #eee; background: ${index % 2 === 0 ? '#fff' : '#f9fafb'};">
                    <td style="padding: 12px; color: #333;">${item.name}</td>
                    <td style="padding: 12px; text-align: right; color: #555;">${formatCurrency(item.price)}</td>
                    <td style="padding: 12px; text-align: center; color: #555;">${item.quantity}</td>
                    <td style="padding: 12px; text-align: right; font-weight: 600; color: #333;">${formatCurrency(item.price * item.quantity)}</td>
                </tr>
                `).join('')}
            </tbody>
        </table>

        <!-- Totals -->
        <div style="display: flex; justify-content: flex-end; margin-bottom: 50px;">
            <div style="width: 300px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: #555;">
                    <span>Subtotal:</span>
                    <span>${formatCurrency(order.subtotal)}</span>
                </div>
                ${order.discount > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--color-success);">
                    <span>Product Savings:</span>
                    <span>-${formatCurrency(order.discount)}</span>
                </div>
                ` : ''}
                ${order.couponDiscount > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px; color: var(--color-success);">
                    <span>Coupon Discount (${order.couponCode || 'Voucher'}):</span>
                    <span>-${formatCurrency(order.couponDiscount)}</span>
                </div>
                ` : ''}
                <div style="display: flex; justify-content: space-between; margin-bottom: 12px; color: #555;">
                    <span>Shipping:</span>
                    <span>${order.shipping === 0 ? 'FREE' : formatCurrency(order.shipping)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; padding-top: 12px; border-top: 2px solid #333; font-weight: 700; font-size: 18px; color: var(--color-primary);">
                    <span>Total:</span>
                    <span>${formatCurrency(order.total)}</span>
                </div>
            </div>
        </div>

        <!-- Signature -->
        <div style="display: flex; justify-content: space-between; margin-top: 80px; align-items: flex-end;">
            <div style="text-align: center;">
                <div style="border-top: 1px solid #ccc; width: 200px; padding-top: 10px; color: #666; font-size: 14px;">Customer Signature</div>
            </div>
            <div style="text-align: center;">
                <div style="font-family: 'Dancing Script', cursive; font-size: 24px; color: var(--color-primary); margin-bottom: 5px;">GreenMart</div>
                <div style="border-top: 1px solid #ccc; width: 200px; padding-top: 10px; color: #666; font-size: 14px;">Authorized Signature</div>
            </div>
        </div>

        <!-- Footer -->
        <div style="margin-top: 50px; text-align: center; color: #999; font-size: 12px; border-top: 1px solid #eee; padding-top: 20px;">
            <p>Thank you for shopping with GreenMart!</p>
            <p>For any queries, please contact us at support@greenmart.com or +880 1234-567890</p>
        </div>
    `;

    // Configuration for html2pdf
    const opt = {
        margin: 0.5,
        filename: `invoice-${order.id}.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Generate PDF
    html2pdf().set(opt).from(invoiceElement).save();
};
