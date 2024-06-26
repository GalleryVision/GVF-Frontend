import { useState, useEffect } from "react";
import MonthYearSelector from "../../../UI/MonthYear";
import { Arrow, India, USA } from "../../icons/icon";
import axios from "axios";
import API_ENDPOINTS from "../../../config/apiConfig";
import { authInstance } from "../../../hooks/axiosInstances";

type Props = {};

interface Currency {
  date: string;
  INR: string;
}

const CurrencyComponent = ({}: Props) => {
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toLocaleString("default", { month: "long", year: "numeric" })
  );
  const [INRValue, setINRValue] = useState<string>("");
  const [data, setData] = useState<Currency>({
    date: "",
    INR: "",
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      date: selectedDate,
    }));
  }, [selectedDate]);

  const handleINRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setINRValue(value);
    setData((prevData) => ({
      ...prevData,
      INR: value,
    }));
  };

  const handleSubmit = async () => {
    if (!data.date || !data.INR) {
      alert("Please provide both the date and INR value.");
      return;
    }
  
    try {
      console.log("Sending payload:", data);
      const response = await axios.post(
        API_ENDPOINTS.CURRENCY_CONVERSION, // Correct endpoint
        data,
        { headers: authInstance() }
      );
      console.log("Response:", response.data);
      alert("Conversion rate added successfully!");
    } catch (error) {
      console.error("Error adding conversion rate:", error);
      alert("Failed to add conversion rate. Please try again.");
    }
  };

  const handleDateChange = (newDate: string) => {
    setSelectedDate(newDate);
  };

  return (
    <div className="pl-11">
      <div className="flex items-center justify-between my-2">
        <div>
          <p className="text-lg font-bold">Conversion rate</p>
          <p className="text-sm">Choose the month for the conversion</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col items-start gap-2">
          <label htmlFor="">Select Month: {selectedDate}</label>
          <MonthYearSelector
            date={selectedDate}
            onDateChange={handleDateChange}
          />
        </div>
        <div className="flex gap-3">
          <div className="flex gap-1 items-center">
            <USA />
            <span>USD (Dollars) - 1 Dollar</span>
            <Arrow />
          </div>
          <div className="flex gap-1 items-center border p-2">
            <India />
            <span>INR - Indian rupees</span>
            <input
              type="text"
              className="px-2 w-14 h-full border-2"
              value={INRValue}
              onChange={handleINRChange}
            />
            <button
              onClick={handleSubmit}
              className="font-bold bg-black text-white p-2 rounded-lg"
            >
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrencyComponent;
