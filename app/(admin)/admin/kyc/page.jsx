"use client"

import { useState, useEffect } from "react"
import { getKycSubmissions, approveKyc, rejectKyc } from "@/action/kyc"
import AdminLayout from "@/components/admin/admin-layout"

export default function AdminKYCPage() {
  const [submissions, setSubmissions] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("PENDING")
  const [selectedUser, setSelectedUser] = useState(null)
  const [adminNote, setAdminNote] = useState("")
  const [rejectionReason, setRejectionReason] = useState("")
  const [message, setMessage] = useState("")

  useEffect(() => {
    fetchSubmissions()
  }, [filter])

  const fetchSubmissions = async () => {
    setLoading(true)
    const result = await getKycSubmissions(filter === "ALL" ? null : filter)
    if (result.success) {
      setSubmissions(result.data)
    }
    setLoading(false)
  }

  const handleApprove = async () => {
    if (!selectedUser) return
    const result = await approveKyc(selectedUser.id, adminNote)
    if (result.success) {
      setMessage("✓ KYC Approved successfully")
      setSelectedUser(null)
      setAdminNote("")
      fetchSubmissions()
    }
  }

  const handleReject = async () => {
    if (!selectedUser) return
    const result = await rejectKyc(selectedUser.id, rejectionReason)
    if (result.success) {
      setMessage("✓ KYC Rejected")
      setSelectedUser(null)
      setRejectionReason("")
      fetchSubmissions()
    }
  }

  const getStatusBadge = (status) => {
    const badges = {
      PENDING: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      REJECTED: "bg-red-100 text-red-800",
    }
    return badges[status] || "bg-gray-100 text-gray-800"
  }

  return (

    <AdminLayout>
    <div className="p-6  min-h-screen">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">KYC Management</h1>
        <p className="text-gray-600">Review and manage user KYC submissions</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-6 flex-wrap">
        {["PENDING", "APPROVED", "REJECTED", "ALL"].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              filter === status
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Message */}
      {message && (
        <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">{message}</div>
      )}

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">Loading...</div>
        ) : submissions.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No KYC submissions found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">User</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Submitted</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {submissions.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{user.fullName}</p>
                        <p className="text-sm text-gray-500">@{user.username}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(user.kycStatus)}`}>
                        {user.kycStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Review Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-gray-100 border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Review KYC Submission</h2>
              <button onClick={() => setSelectedUser(null)} className="text-gray-500 hover:text-gray-700 text-2xl">
                ×
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-900 mb-3">User Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Name</p>
                    <p className="font-medium text-gray-900">{selectedUser.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{selectedUser.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Username</p>
                    <p className="font-medium text-gray-900">@{selectedUser.username}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p
                      className={`font-medium px-3 py-1 rounded text-sm inline-block ${getStatusBadge(selectedUser.kycStatus)}`}
                    >
                      {selectedUser.kycStatus}
                    </p>
                  </div>
                </div>
              </div>

              {/* Document */}
              {selectedUser.kycDocument && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Document</h3>
                  <div className="bg-gray-100 p-4 rounded-lg text-center">
                    <a href={selectedUser.kycDocument} className="text-gray-600">📄 {selectedUser.kycDocument}</a>
                  </div>
                </div>
              )}

              {/* Previous Note */}
              {selectedUser.kycNote && (
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-700">
                    <strong>Previous Note:</strong> {selectedUser.kycNote}
                  </p>
                </div>
              )}

              {/* Decision Section */}
              {selectedUser.kycStatus === "PENDING" ? (
                <div className="space-y-4 border-t pt-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Admin Note (optional)</label>
                    <textarea
                      value={adminNote}
                      onChange={(e) => setAdminNote(e.target.value)}
                      placeholder="Add any notes for the user..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                      rows="3"
                    />
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={handleApprove}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                      ✓ Approve
                    </button>
                    <button
                      onClick={() => {
                        // Show rejection input
                        const reason = prompt("Enter rejection reason:")
                        if (reason) {
                          setRejectionReason(reason)
                          handleReject()
                        }
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg transition"
                    >
                      ✕ Reject
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6 text-gray-600">This submission has already been reviewed.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>

    </AdminLayout>
  )
}
