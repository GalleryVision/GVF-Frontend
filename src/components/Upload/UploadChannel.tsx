// file path: src/components/Upload/UploadChannel.tsx

import React, { useRef, useState } from "react";
import axios from "axios";
import API_ENDPOINTS from "../../config/apiConfig";
import { MauthInstance } from "../../hooks/axiosInstances";
import toast, { Toaster } from "react-hot-toast";

type Props = {
  onSave: () => void;
};

const UploadChannel: React.FC<Props> = ({ onSave }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [uploadTimeout, setUploadTimeout] = useState<NodeJS.Timeout | null>(
    null
  );

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (
      !fileInputRef.current ||
      !fileInputRef.current.files ||
      fileInputRef.current.files.length === 0
    ) {
      console.error("No file selected.");
      toast.error("No file selected.");
      return;
    }

    const file = fileInputRef.current.files[0];
    const formData = new FormData();
    formData.append("file", file);

    const timeoutDuration = 20 * 60 * 1000; // 20 minutes in milliseconds
    const intervalDuration = 100; // Progress update interval in milliseconds

    let elapsedTime = 0; // Track elapsed time for manual progress updates

    const updateProgress = () => {
      elapsedTime += intervalDuration;
      const currentProgress = Math.min(
        100,
        Math.round((elapsedTime / timeoutDuration) * 100)
      );
      setProgress(currentProgress);
    };

    try {
      setUploading(true);
      setShowModal(true);

      const timeout = setTimeout(() => {
        console.error("Upload timed out.");
        toast.error("Upload timed out.");
        setUploading(false);
        setShowModal(false);
      }, timeoutDuration);

      setUploadTimeout(timeout);

      const interval = setInterval(() => {
        updateProgress();
      }, intervalDuration);

      const response = await axios.post(API_ENDPOINTS.UPLOADCHANNEL, formData, {
        headers: MauthInstance(),
      });

      clearTimeout(timeout);
      clearInterval(interval);
      onSave();
      console.log(response.data.msg);
      toast.success(response.data.msg);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred");
      } else {
        console.error("An unexpected error occurred");
      }
    } finally {
      setUploading(false);
      setShowModal(false);
      setProgress(0);
      if (uploadTimeout) {
        clearTimeout(uploadTimeout);
        setUploadTimeout(null);
      }
    }
  };

  return (
    <div>
      <Toaster />
      <div className="flex flex-col items-center my-8 rounded-2xl px-7 py-4 bg-white border-2 shadow-md">
        <h2 className="text-sm font-bold mb-4">Upload Channel CSV File</h2>
        <div
          onClick={handleBrowseClick}
          className="relative bg-red-100 rounded-lg w-full border-2 border-dashed border-gray-300 flex flex-col items-center cursor-pointer"
        >
          <div className="flex flex-col items-center pt-4">
            <div className="text-red-500 rounded-full flex justify-center items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="red"
                className="w-[70px] h-[60px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                />
              </svg>
            </div>
            <div className="flex">
              <p className="text-black font-medium text-sm mb-">
                Select your File here,
              </p>
              <a className="text-red-600 font-medium text-sm hover:underline pl-1">
                Browse
              </a>
            </div>
          </div>
          <p className="text-gray-500 text-xs pb-4 mt-4">
            Supported formats: CSV files
          </p>
          <input
            type="file"
            accept=".csv"
            ref={fileInputRef}
            className="hidden"
          />
        </div>
        <button
          className="bg-black text-white w-[304px] py-2 px-8 rounded-md mt-4"
          onClick={handleSubmit}
          disabled={uploading}
        >
          {uploading ? `Uploading... (${progress}%)` : "Upload file"}
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-4 flex flex-col items-center">
            <p className="mb-4 font-medium">Uploading Channel... {progress}%</p>
            <div className="w-full h-4 bg-gray-200 rounded-full">
              <div
                className="bg-red-500 h-4 rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadChannel;
