import axios from "axios";
import { saveAs } from "file-saver"; // Import file-saver
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API_ENDPOINTS from "../../config/apiConfig";
import { authInstance } from "../../hooks/axiosInstances";
import { Back, Download } from "../icons/icon";

type Props = {};

type InvoiceData = {
  _id: string;
  partnerName: string;
  licensorId: string;
  invoiceNumber: string;
  licensorName: string;
  accNum: string;
  ifsc: string;
  iban: string;
  currency: string;
  musicId: string;
  ptRevenue: string;
  tax: string;
  ptAfterTax: string;
  commission: string;
  totalPayout: string;
  conversionRate: string;
  payout: string;
  status: string;
  commissionAmount: string;
  musicName: string;
  licensorAddress: string;
  MusicEmail: string;
  date: string;
  licensorEmail: string;
  tds: string;
  tdsTax: string;
  inrPayout : string;
};

const MusicViewInvoice = ({}: Props) => {
  const { id } = useParams<{ id: string }>();
  const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await axios.get(
            API_ENDPOINTS.VIEW_MUSIC_INVOICE(id),
            { headers: authInstance() }
          );
          setInvoiceData(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDownloadPdf = async () => {
    if (!invoiceData) return;

    try {
      const response = await axios.post(
        API_ENDPOINTS.DOWNLOAD_INVOICE_PDF,
        { invoiceNumber: invoiceData.invoiceNumber },
        { headers: authInstance(), responseType: "blob" }
      );

      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      saveAs(pdfBlob, `${invoiceData.invoiceNumber}.pdf`);
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  if (!invoiceData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      <Link to={"/home/invoice"}>
        <div className="flex gap-1 justify-center items-center border-2 px-1 py-2 rounded-lg text-sm font-medium w-[5%]  hover:bg-gray-200 cursor-pointer">
          <Back />
          Back
        </div>
      </Link>

      <div className="flex flex-col gap-6 bg-white w-[75%] p-8">
        <p className="text-lg font-bold">Preview</p>
        <div className="flex flex-col gap-6 w-[94%] border-2 p-8 mx-8">
          <p className="text-lg font-bold">{invoiceData.invoiceNumber}</p>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Licensor</p>
              <p className="font-bold text-sm">{invoiceData.licensorName}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Partner Name</p>
              <p className="font-bold text-sm">{invoiceData.partnerName}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Preferred currency</p>
              <p className="font-bold text-sm">{invoiceData.currency}</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Account Number</p>
              <p className="font-bold text-sm">{invoiceData.accNum}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">IFSC</p>
              <p className="font-bold text-sm">{invoiceData.ifsc}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">IBAN</p>
              <p className="font-bold text-sm">{invoiceData.iban}</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Music ID</p>
              <p className="font-bold text-sm">{invoiceData.musicId}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Partner Revenue</p>
              <p className="font-bold text-sm">{invoiceData.ptRevenue}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Commission({invoiceData.commission}%)</p>
              <p className="font-bold text-sm">
                {invoiceData.commissionAmount}
              </p>
            </div>
          </div>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Total Payout</p>
              <p className="font-bold text-sm">{invoiceData.totalPayout}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Conversion ({invoiceData.conversionRate})</p>
              <p className="font-bold text-sm">{invoiceData.inrPayout}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">TDS( {invoiceData.tds}% )</p>
              <p className="font-bold text-sm">{invoiceData.tdsTax}</p>
            </div>
          </div>
          <div className="flex border-b-2 pb-6">
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Payout</p>
              <p className="font-bold text-sm">{invoiceData.payout}</p>
            </div>
            <div className="flex flex-col w-[33%] gap-2">
              <p className="text-sm">Status</p>
              <p className="font-bold text-sm">{invoiceData.status}</p>
            </div>
          </div>
          <div className="flex border-b-2 justify-between pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-sm font-bold">Payment to</p>
              <div className="flex gap-2">
                <div className="flex-col">
                  <p className="text-sm font-bold">
                    Music Partner Name: {invoiceData.licensorName}
                  </p>
                  <p className="text-sm">
                    Licensor Name: {invoiceData.licensorName}
                  </p>
                  <p className="text-sm">
                    Licensor Address: {invoiceData.licensorAddress}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 border-b-2 pb-6">
            <div className="flex justify-between gap-2">
              <p className="text-sm">Partner Revenue</p>
              <p className="font-bold text-sm">${invoiceData.ptRevenue}</p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-sm">Commission ({invoiceData.commission}%)</p>
              <p className="font-bold text-sm">
                ${invoiceData.commissionAmount}
              </p>
            </div>
            <div className="flex justify-between gap-2">
              <p className="text-sm">Total Payout({invoiceData.currency})</p>
              <p className="font-bold text-sm">
                {invoiceData.currency == "USD" ? "$ " : "₹ "}
                {invoiceData.payout}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 mx-8">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center text-white gap-1 rounded-lg border border-black text-sm font-bold px-3 py-2 bg-black"
          >
            <Download /> Download Pdf
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicViewInvoice;
