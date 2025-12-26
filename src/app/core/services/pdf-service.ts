import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  public async makePdfById(elementId: string, fileName: string): Promise<void> {
    const data: HTMLElement | null = document.getElementById(elementId);

    if (!data) {
      console.error('There is no resume yet!');
      return;
    }

    try {
      const canvas = await html2canvas(data, { scale: 2, useCORS: true });
      const contentDatPath = canvas.toDataURL('imge/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      const position = 0;

      pdf.addImage(contentDatPath, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('pdf did not created', error);
    }
  }
}
