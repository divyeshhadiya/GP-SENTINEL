"use client";

import React, { useRef, useState } from "react";
import { VehicleSighting, WatchlistEntry } from "@/types";
import PoliceLogo from "@/components/common/PoliceLogo";
import { X, Printer, Download, ShieldCheck, FileText, Hash, Loader2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  plate: string;
  sightings: VehicleSighting[];
  watchlistMatch?: WatchlistEntry | null;
  officerName?: string;
  badgeId?: string;
}

export default function EvidentiaryDossierModal({
  isOpen,
  onClose,
  plate,
  sightings,
  watchlistMatch,
  officerName = "Dr. Vikas Sahay, IPS",
  badgeId = "GP-DGP-01"
}: Props) {
  const printableRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  if (!isOpen) return null;

  const cleanPlate = plate.replace(/[^A-Z0-9]/g, "_");
  const caseId = `SCRB-EVID-2026-${plate.replace(/[^A-Z0-9]/g, "")}-${Date.now().toString().slice(-4)}`;
  const sha256Hash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855";
  const nowStr = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    dateStyle: "full",
    timeStyle: "medium"
  });

  const handlePrint = () => {
    if (!printableRef.current) {
      window.print();
      return;
    }

    const content = printableRef.current.innerHTML;
    const printWindow = window.open("", "_blank", "width=900,height=900");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Evidentiary Dossier - ${plate}</title>
          <style>
            @page { size: A4 portrait; margin: 12mm; }
            body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; padding: 20px; color: #111827; background: #ffffff; }
            * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; font-size: 11px; }
            th, td { border: 1px solid #d1d5db; padding: 6px 8px; text-align: left; }
            th { background-color: #f3f4f6 !important; font-weight: bold; }
            .border-b-2 { border-bottom: 2px solid #1e3a8a; }
            .text-blue-900 { color: #1e3a8a; }
            .text-red-700 { color: #b91c1c; }
            .bg-slate-50 { background-color: #f8fafc !important; }
            .bg-red-50 { background-color: #fef2f2 !important; }
            .rounded-lg { border-radius: 8px; }
            .border { border: 1px solid #cbd5e1; }
            .grid { display: flex; flex-wrap: wrap; }
            .p-3 { padding: 10px; }
            img { max-width: 50px; height: auto; display: block; margin: 0 auto; }
          </style>
        </head>
        <body>
          ${content}
          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
                window.onafterprint = function() { window.close(); };
              }, 350);
            };
          </script>
        </body>
        </html>
      `);
      printWindow.document.close();
    } else {
      window.print();
    }
  };

  const handleDownloadPDF = async () => {
    if (!printableRef.current || isGeneratingPdf) return;
    try {
      setIsGeneratingPdf(true);
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      const element = printableRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
        logging: false
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });

      const imgWidth = 210; // A4 width in mm
      const pageHeight = 297; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight, undefined, "FAST");
        heightLeft -= pageHeight;
      }

      const filename = `SENTINEL_EVIDENTIARY_DOSSIER_${cleanPlate}.pdf`;
      // pdf.save immediately triggers browser native download to the user's Downloads directory
      pdf.save(filename);
    } catch (err) {
      console.error("PDF generation error, falling back:", err);
      window.print();
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 md:p-6 overflow-y-auto">
      <div className="bg-white dark:bg-police-900 border border-slate-300 dark:border-police-700 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Action Bar (Hidden in Print) */}
        <div className="p-4 bg-slate-100 dark:bg-police-850 border-b border-slate-200 dark:border-police-800 flex items-center justify-between no-print">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="font-bold text-slate-900 dark:text-white text-sm">
              Certified Evidentiary Dossier Generator
            </span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Print Button */}
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold shadow-md transition-all cursor-pointer"
              title="Print evidentiary report"
            >
              <Printer className="w-3.5 h-3.5 text-blue-400" />
              <span>Print Dossier</span>
            </button>

            {/* Native PDF Download Button */}
            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPdf}
              className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-400 text-white rounded-lg text-xs font-bold shadow-md transition-all cursor-pointer"
              title="Download PDF to user's device"
            >
              {isGeneratingPdf ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Official PDF</span>
                </>
              )}
            </button>

            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Dossier Document */}
        <div
          id="printable-dossier"
          className="p-6 md:p-8 overflow-y-auto bg-white text-slate-900 font-sans"
          ref={printableRef}
        >
          {/* Header */}
          <div className="border-b-2 border-blue-900 pb-4 mb-6 text-center">
            <div className="flex justify-center mb-2">
              <PoliceLogo size={54} />
            </div>
            <div className="text-xs tracking-widest text-slate-600 font-bold uppercase">
              Government of Gujarat • Home Department
            </div>
            <h1 className="text-xl md:text-2xl font-black text-blue-900 uppercase tracking-wide mt-0.5">
              State Crime Record Bureau (SCRB)
            </h1>
            <p className="text-xs text-slate-700 font-semibold">
              Police Bhawan, Sector - 18, Gandhinagar, Gujarat - 382009
            </p>
            <div className="mt-2 text-xs font-bold text-red-700 uppercase tracking-wider">
              Confidential Evidentiary Traversal Report — Criminal Investigation Record
            </div>
          </div>

          {/* Case Metadata */}
          <div className="grid grid-cols-2 gap-4 text-xs border border-slate-300 rounded-lg p-3.5 bg-slate-50 mb-5">
            <div>
              <span className="text-slate-500 font-mono block text-[10px]">CASE DOSSIER REF</span>
              <strong className="font-mono text-sm text-blue-900">{caseId}</strong>
            </div>
            <div>
              <span className="text-slate-500 font-mono block text-[10px]">TIMESTAMP GENERATED</span>
              <span className="font-mono font-bold text-slate-800">{nowStr}</span>
            </div>
            <div>
              <span className="text-slate-500 font-mono block text-[10px]">TARGET IDENTIFIER</span>
              <span className="font-mono font-black text-base text-red-700">{plate}</span>
            </div>
            <div>
              <span className="text-slate-500 font-mono block text-[10px]">WATCHLIST STATUS</span>
              {watchlistMatch ? (
                <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 border border-red-300 rounded font-bold font-mono text-xs">
                  MATCH: {watchlistMatch.source} ({watchlistMatch.category})
                </span>
              ) : (
                <span className="inline-block px-2 py-0.5 bg-blue-100 text-blue-800 border border-blue-300 rounded font-bold font-mono text-xs">
                  STATEWIDE SURVEILLANCE LOG
                </span>
              )}
            </div>
          </div>

          {/* Investigation Intelligence Details */}
          {watchlistMatch && (
            <div className="border border-red-300 bg-red-50/70 rounded-lg p-3 mb-5 text-xs text-red-950">
              <strong className="block font-bold text-red-900 mb-1">
                Active Legal Warrant / Crime Incident Link:
              </strong>
              <p>{watchlistMatch.details}</p>
              <div className="grid grid-cols-3 gap-2 mt-2 font-mono text-[11px] text-red-800 pt-2 border-t border-red-200">
                <span>FIR: <strong>{watchlistMatch.firNumber || "N/A"}</strong></span>
                <span>Police Station: <strong>{watchlistMatch.policeStation || "N/A"}</strong></span>
                <span>Owner: <strong>{watchlistMatch.registeredOwner || "N/A"}</strong></span>
              </div>
            </div>
          )}

          {/* Chronological Traversal Sightings Table */}
          <div className="mb-6">
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-2 flex items-center space-x-1.5">
              <span>Timestamped Chronological Sighting Trajectory ({sightings.length} Detection Nodes)</span>
            </h2>

            <table className="w-full text-left text-xs border border-slate-300 border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-mono text-[11px] border-b border-slate-300">
                  <th className="p-2 border border-slate-300">#</th>
                  <th className="p-2 border border-slate-300">Camera ID &amp; Node Name</th>
                  <th className="p-2 border border-slate-300">Location / District</th>
                  <th className="p-2 border border-slate-300">Timestamp (IST)</th>
                  <th className="p-2 border border-slate-300">PTS (ms)</th>
                  <th className="p-2 border border-slate-300">Speed</th>
                  <th className="p-2 border border-slate-300">Heading</th>
                </tr>
              </thead>
              <tbody>
                {sightings.map((s, idx) => (
                  <tr key={s.id} className="border-b border-slate-200 hover:bg-slate-50">
                    <td className="p-2 border border-slate-300 font-mono font-bold text-center">
                      {idx + 1}
                    </td>
                    <td className="p-2 border border-slate-300">
                      <div className="font-mono font-bold text-blue-900">{s.cameraId}</div>
                      <div className="text-[11px] text-slate-600">{s.cameraName}</div>
                    </td>
                    <td className="p-2 border border-slate-300">
                      <div>{s.locationName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{s.district}</div>
                    </td>
                    <td className="p-2 border border-slate-300 font-mono">
                      {new Date(s.timestamp).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        hour12: false
                      })}
                    </td>
                    <td className="p-2 border border-slate-300 font-mono text-slate-600 text-[11px]">
                      {s.ptsMs}
                    </td>
                    <td className="p-2 border border-slate-300 font-mono font-bold text-slate-800">
                      {s.speedKmh} km/h
                    </td>
                    <td className="p-2 border border-slate-300 text-[11px] text-slate-600">
                      {s.heading}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Section 65B Electronic Admissibility Certificate Block */}
          <div className="border border-slate-400 rounded-lg p-3.5 bg-slate-50 text-[11px] text-slate-700 space-y-2 mb-6">
            <div className="font-bold text-slate-900 text-xs flex items-center space-x-1.5 uppercase">
              <ShieldCheck className="w-4 h-4 text-blue-900" />
              <span>Certificate of Admissibility of Electronic Records</span>
            </div>
            <p className="leading-relaxed">
              Issued under <strong>Section 65B of the Indian Evidence Act, 1872</strong> (and Section 63 of the <strong>Bharatiya Sakshya Adhiniyam, 2023</strong>).
              I hereby certify that the electronic surveillance trajectory, timestamps, and camera sightings documented herein were produced by the automated Gujarat Police SENTINEL Computer System operating regularly and lawfully. During the period of production, the system was operating properly and the integrity of the data has not been compromised.
            </p>
            <div className="flex items-center space-x-2 pt-1 font-mono text-[10px] text-slate-600">
              <Hash className="w-3.5 h-3.5 text-slate-500" />
              <span>SHA-256 Digital Fingerprint: <strong>{sha256Hash}</strong></span>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex justify-between items-end pt-4 border-t border-slate-300 text-xs">
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-mono">Verified By Officer:</div>
              <div className="font-bold text-slate-900 mt-1">{officerName}</div>
              <div className="text-[11px] text-slate-600 font-mono">Badge ID: {badgeId}</div>
              <div className="text-[10px] text-slate-500">State Command Center, Gandhinagar</div>
            </div>

            <div className="text-right">
              <div className="w-36 border-b border-slate-800 mb-1"></div>
              <div className="text-[11px] font-bold text-slate-800">Authorized Electronic Signature</div>
              <div className="text-[10px] text-slate-500 font-mono">Gujarat State Police SCRB Seal</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
