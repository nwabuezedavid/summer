"use client"

import { useState, useEffect } from "react"
import { uploadKycDocument, getKycStatus } from "@/action/kyc"
import { getSession } from "@/lib/session";

import { useUser } from "@/context/usecontext";
import { uploadKycToCloudinary } from "@/action/uploadKycToCloudinary";

export default function KYCPage() {
  const [userx, setUserx] = useState(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [kycStatus, setKycStatus] = useState(null)
  const [file, setFile] = useState(null)
  const data = useUser()
  useEffect(   () => {
         setUserx(data.user)
    console.log(userx);
      
  }, [])
if (userx?.kycDocument != null && userx?.kycDocument != "APPROVED"){
    return (
        <div className="p-5 justify-center  self-center text-center border border-gray-200 rounded-lg shadow-md">
    <h3 className="text-lg font-bold">
      KYC Status: 
      <span className="text-orange-500">🔍 Under Review</span>
    </h3>
  </div>
    )
}
  if (userx?.kycDocument == "APPROVED"){
    return (
        <div className="p-5 justify-center  self-center text-center border border-gray-200 rounded-lg shadow-md">
    <h3 className="text-lg font-bold">
      KYC Status: 
      <span className="text-orange-500">KYC APPROVED </span>
    </h3>
  </div>
    )
  }
  const fetchKycStatus = async (userId) => {
    const result = await getKycStatus(userId)
    if (result.success) {
      setKycStatus(result.data)
    }
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!file) {
    setMessage("Please select a file");
    return;
  }

  if (file.size > 10 * 1024 * 1024) {
    setMessage("File must be under 10MB");
    return;
  }

  setLoading(true);
  setMessage("");

  try {
    const user = await getSession();

    // ✅ SERVER ACTION CALL
    const upload = await uploadKycToCloudinary(file, user.id);

    if (!upload.success) {
      throw new Error("Cloudinary upload failed");
    }

    // Save URL to DB
    const result = await uploadKycDocument(user.id, upload.url);

    if (result.success) {
      setMessage("✓ KYC document uploaded successfully! Awaiting review.");
      setFile(null);
      fetchKycStatus(user.id);
    } else {
      setMessage("Failed to save KYC document");
    }
  } catch (err) {
    setMessage(err.message || "Upload failed");
  }

  setLoading(false);
};


 
  

  const getStatusColor = (status) => {
    const colors = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    }
    return colors[status] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">KYC Verification</h1>
          <p className="text-gray-600">Complete your identity verification to unlock full platform access</p>
        </div>

        {/* Status Card */}
        {kycStatus && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Current Status</h2>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(kycStatus.kycStatus)}`}>
                {kycStatus.kycStatus}
              </span>
            </div>
            {kycStatus.kycNote && (
              <div className="bg-gray-50 rounded p-4 mb-4">
                <p className="text-sm text-gray-700">
                  <strong>Note:</strong> {kycStatus.kycNote}
                </p>
              </div>
            )}
            {kycStatus.kycReviewedAt && (
              <p className="text-sm text-gray-600">
                Reviewed on: {new Date(kycStatus.kycReviewedAt).toLocaleDateString()}
              </p>
            )}
          </div>
        )}

        {/* Upload Form */}
        {!kycStatus || kycStatus.kycStatus === "REJECTED" ? (
          <div className=" rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Upload KYC Document</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Document Type</label>
                <select className="w-full  px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option className="text-black">Passport</option>
                  <option className="text-black">National ID</option>
                  <option className="text-black">Driving License</option>
                  <option className="text-black">Other Document</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="hidden"
                    id="file-input"
                  />
                  <label htmlFor="file-input" className="cursor-pointer">
                    <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                    <p className="text-sm text-gray-500">PNG, JPG, or PDF (max 10MB)</p>
                  </label>
                  {file && <p className="mt-4 text-green-600 text-sm">✓ {file.name}</p>}
                </div>
              </div>

              {message && (
                <div
                  className={`p-4 rounded-lg ${message.includes("✓") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}
                >
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:bg-gray-400"
              >
                {loading ? "Uploading..." : "Submit KYC Document"}
              </button>
            </form>
          </div>
        ) : kycStatus.kycStatus === "APPROVED" ? (
          <div className="bg-green-50 rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">Verification Complete</h2>
            <p className="text-green-700">
              Your KYC has been approved. You now have full access to all platform features.
            </p>
          </div>
        ) : (
          <div className="bg-yellow-50 rounded-lg shadow-md p-8 text-center">
            <div className="text-6xl mb-4">⏳</div>
            <h2 className="text-2xl font-bold text-yellow-800 mb-2">Under Review</h2>
            <p className="text-yellow-700">
              Your KYC document is currently being reviewed. This usually takes 24-48 hours.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
