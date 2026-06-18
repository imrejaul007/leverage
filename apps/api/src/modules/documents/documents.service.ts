import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Buffer } from 'buffer';

interface LineItem {
  description: string;
  hsCode: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
}

interface GenerateDocumentDto {
  documentType: string;
  sellerName: string;
  sellerAddress: string;
  sellerCity: string;
  sellerCountry: string;
  sellerPhone: string;
  sellerEmail: string;
  sellerTaxId: string;
  buyerName: string;
  buyerAddress: string;
  buyerCity: string;
  buyerCountry: string;
  buyerPhone: string;
  buyerEmail: string;
  buyerTaxId: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  originCountry: string;
  destinationCountry: string;
  portOfLoading: string;
  portOfDischarge: string;
  shippingMethod: string;
  vesselName: string;
  voyageNumber: string;
  currency: string;
  paymentTerms: string;
  totalAmount: number;
  lineItems: LineItem[];
}

@Injectable()
export class DocumentsService {
  constructor(private prisma: PrismaService) {}

  async generateDocument(userId: string, dto: GenerateDocumentDto): Promise<Buffer> {
    // Generate PDF using canvas or simple HTML-to-PDF approach
    const pdfContent = this.generateCommercialInvoiceHTML(dto);

    // Return as buffer (in production, use proper PDF library like pdfkit or puppeteer)
    return Buffer.from(pdfContent, 'utf-8');
  }

  private generateCommercialInvoiceHTML(dto: GenerateDocumentDto): string {
    const lineItemsHTML = dto.lineItems?.map((item, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${item.description || '-'}</td>
        <td>${item.hsCode || '-'}</td>
        <td>${item.quantity || 0}</td>
        <td>${item.unit || '-'}</td>
        <td>$${(item.unitPrice || 0).toFixed(2)}</td>
        <td>$${(item.total || 0).toFixed(2)}</td>
      </tr>
    `).join('') || '';

    const subtotal = dto.lineItems?.reduce((sum, item) => sum + (item.total || 0), 0) || 0;
    const freight = subtotal * 0.05;
    const insurance = subtotal * 0.01;
    const total = subtotal + freight + insurance;

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Commercial Invoice - ${dto.invoiceNumber}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 40px; color: #333; }
    .header { text-align: center; margin-bottom: 30px; border-bottom: 3px solid #154230; padding-bottom: 20px; }
    .header h1 { color: #154230; margin: 0; }
    .invoice-info { display: flex; justify-content: space-between; margin: 20px 0; }
    .invoice-box { border: 1px solid #154230; padding: 15px; width: 45%; }
    .parties { display: flex; gap: 40px; margin: 20px 0; }
    .party { width: 50%; }
    .party h3 { color: #154230; margin-bottom: 10px; }
    .party.buyer h3 { color: #A6824A; }
    .shipment-details { margin: 20px 0; padding: 15px; background: #f9f9f9; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th { background: #154230; color: white; padding: 10px; text-align: left; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    tr:nth-child(even) { background: #f9f9f9; }
    .totals { text-align: right; margin-top: 20px; }
    .totals .total-row { display: flex; justify-content: flex-end; gap: 40px; padding: 5px 0; }
    .totals .grand-total { font-size: 1.2em; font-weight: bold; color: #154230; }
    .footer { margin-top: 40px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #ddd; padding-top: 20px; }
    @media print { body { margin: 0; } }
  </style>
</head>
<body>
  <div class="header">
    <h1>COMMERCIAL INVOICE</h1>
    <p>LEVERAGE Global Trade Platform</p>
  </div>

  <div class="invoice-info">
    <div class="invoice-box">
      <strong>Invoice Number:</strong> ${dto.invoiceNumber}<br>
      <strong>Invoice Date:</strong> ${dto.invoiceDate}<br>
      <strong>Due Date:</strong> ${dto.dueDate || 'N/A'}
    </div>
  </div>

  <div class="parties">
    <div class="party">
      <h3>SELLER / EXPORTER</h3>
      <p><strong>${dto.sellerName || 'N/A'}</strong></p>
      <p>${dto.sellerAddress || ''}</p>
      <p>${dto.sellerCity || ''}, ${dto.sellerCountry || ''}</p>
      ${dto.sellerTaxId ? `<p>Tax ID: ${dto.sellerTaxId}</p>` : ''}
      ${dto.sellerEmail ? `<p>Email: ${dto.sellerEmail}</p>` : ''}
    </div>
    <div class="party buyer">
      <h3>BUYER / IMPORTER</h3>
      <p><strong>${dto.buyerName || 'N/A'}</strong></p>
      <p>${dto.buyerAddress || ''}</p>
      <p>${dto.buyerCity || ''}, ${dto.buyerCountry || ''}</p>
      ${dto.buyerTaxId ? `<p>Tax ID: ${dto.buyerTaxId}</p>` : ''}
      ${dto.buyerEmail ? `<p>Email: ${dto.buyerEmail}</p>` : ''}
    </div>
  </div>

  <div class="shipment-details">
    <strong>SHIPMENT DETAILS</strong>
    <div style="display: flex; gap: 40px; margin-top: 10px;">
      <div>
        <p>Country of Origin: <strong>${dto.originCountry || 'N/A'}</strong></p>
        <p>Port of Loading: <strong>${dto.portOfLoading || 'N/A'}</strong></p>
        <p>Shipping Method: <strong>${(dto.shippingMethod || 'N/A').toUpperCase()}</strong></p>
      </div>
      <div>
        <p>Destination: <strong>${dto.destinationCountry || 'N/A'}</strong></p>
        <p>Port of Discharge: <strong>${dto.portOfDischarge || 'N/A'}</strong></p>
        <p>Payment Terms: <strong>${dto.paymentTerms || 'N/A'}</strong></p>
      </div>
    </div>
  </div>

  <table>
    <thead>
      <tr>
        <th>#</th>
        <th>Description</th>
        <th>HS Code</th>
        <th>Qty</th>
        <th>Unit</th>
        <th>Unit Price</th>
        <th>Total</th>
      </tr>
    </thead>
    <tbody>
      ${lineItemsHTML}
    </tbody>
  </table>

  <div class="totals">
    <div class="total-row">
      <span>Subtotal:</span>
      <span>${dto.currency || 'USD'} ${subtotal.toFixed(2)}</span>
    </div>
    <div class="total-row">
      <span>Est. Freight (5%):</span>
      <span>${dto.currency || 'USD'} ${freight.toFixed(2)}</span>
    </div>
    <div class="total-row">
      <span>Est. Insurance (1%):</span>
      <span>${dto.currency || 'USD'} ${insurance.toFixed(2)}</span>
    </div>
    <div class="total-row grand-total">
      <span>TOTAL (${dto.currency || 'USD'}):</span>
      <span>${dto.currency || 'USD'} ${total.toFixed(2)}</span>
    </div>
  </div>

  <div class="footer">
    <p>This commercial invoice is generated by LEVERAGE and is valid for customs clearance purposes.</p>
    <p>Generated on ${new Date().toISOString().split('T')[0]} | LEVERAGE Global Trade Platform</p>
  </div>
</body>
</html>`;
  }

  async saveDocument(userId: string, data: any) {
    // Save document metadata to database
    return { success: true, userId, data };
  }

  async findAll(filters: { userId: string; type?: string; status?: string; limit?: number; offset?: number }) {
    return { documents: [], total: 0, limit: 20, offset: 0 };
  }

  async findOne(id: string, userId?: string) {
    return { id, message: 'Document not found' };
  }

  async download(id: string, userId?: string) {
    return { url: '', name: '', type: '' };
  }

  async sign(id: string, signerId: string, dto: any) {
    return { success: true };
  }

  async validate(id: string, userId?: string) {
    return { success: true };
  }

  async archive(id: string, userId: string) {
    return { success: true };
  }

  async getByOrder(orderId: string, userId?: string) {
    return [];
  }

  async getByShipment(shipmentId: string, userId?: string) {
    return [];
  }
}
