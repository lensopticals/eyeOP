import React from "react";
import { X } from "lucide-react";

const ViewPrescriptionModal = ({ isOpen, onClose, prescription }) => {
  if (!isOpen) return null;

  // Helper function to format values with appropriate handling for nulls/undefined
  const formatValue = (value, suffix = "") => {
    if (value === null || value === undefined) return "-";
    return `${value}${suffix}`;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            Prescription Details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Prescription Form */}
          <div className="mb-8 overflow-x-auto">
            <table className="w-full border-collapse border-separate border-spacing-0">
              <thead>
                <tr>
                  <th className="border p-2"></th>
                  <th
                    className="text-center font-semibold text-lg text-gray-800 p-2"
                    colSpan="4"
                  >
                    RIGHT EYE
                  </th>
                  {/* Spacer column */}
                  <th className="w-6"></th>
                  <th
                    className="text-center font-semibold text-lg text-gray-800 p-2"
                    colSpan="4"
                  >
                    LEFT EYE
                  </th>
                </tr>
                <tr>
                  <th className="border p-2"></th>
                  <th className="border p-2 bg-gray-50 text-gray-700">SPH</th>
                  <th className="border p-2 bg-gray-50 text-gray-700">CYL</th>
                  <th className="border p-2 bg-gray-50 text-gray-700">AXIS</th>
                  <th className="border p-2 bg-gray-50 text-gray-700">V/A</th>
                  {/* Spacer column */}
                  <th className="w-6"></th>
                  <th className="border p-2 bg-gray-50 text-gray-700">SPH</th>
                  <th className="border p-2 bg-gray-50 text-gray-700">CYL</th>
                  <th className="border p-2 bg-gray-50 text-gray-700">AXIS</th>
                  <th className="border p-2 bg-gray-50 text-gray-700">V/A</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2 bg-gray-50 font-medium text-gray-700">
                    DV
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.rightEye?.dv?.sphere)}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.rightEye?.dv?.cylinder)}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.rightEye?.dv?.axis, "°")}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.rightEye?.dv?.visualAcuity)}
                  </td>
                  {/* Spacer column */}
                  <td className="w-6"></td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.leftEye?.dv?.sphere)}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.leftEye?.dv?.cylinder)}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.leftEye?.dv?.axis, "°")}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.leftEye?.dv?.visualAcuity)}
                  </td>
                </tr>
                <tr>
                  <td className="border p-2 bg-gray-50 font-medium text-gray-700">
                    NV
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.rightEye?.nv?.sphere)}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.rightEye?.nv?.cylinder)}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.rightEye?.nv?.axis, "°")}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.rightEye?.nv?.visualAcuity)}
                  </td>
                  {/* Spacer column */}
                  <td className="w-6"></td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.leftEye?.nv?.sphere)}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.leftEye?.nv?.cylinder)}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.leftEye?.nv?.axis, "°")}
                  </td>
                  <td className="border p-2 text-center font-medium">
                    {formatValue(prescription?.leftEye?.nv?.visualAcuity)}
                  </td>
                </tr>
                {/* Add row - only display if either eye has an add value */}
                {(prescription?.rightEye?.add !== undefined ||
                  prescription?.leftEye?.add !== undefined) && (
                  <tr>
                    <td className="border p-2 bg-gray-50 font-medium text-gray-700">
                      ADD
                    </td>
                    <td
                      className="border p-2 text-center font-medium"
                      colSpan="4"
                    >
                      {formatValue(prescription?.rightEye?.add)}
                    </td>
                    {/* Spacer column */}
                    <td className="w-6"></td>
                    <td
                      className="border p-2 text-center font-medium"
                      colSpan="4"
                    >
                      {formatValue(prescription?.leftEye?.add)}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            {/* Doctor & Clinic Information */}
            {(prescription?.doctorName ||
              prescription?.clinicName ||
              prescription?.prescriptionDate) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Provider Information
                </h3>
                <div className="space-y-2">
                  {prescription?.doctorName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Optometrist:</span>
                      <span className="font-medium">
                        {prescription.doctorName}
                      </span>
                    </div>
                  )}
                  {prescription?.clinicName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Clinic:</span>
                      <span className="font-medium">
                        {prescription.clinicName}
                      </span>
                    </div>
                  )}
                  {prescription?.prescriptionDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Date:</span>
                      <span className="font-medium">
                        {new Date(
                          prescription.prescriptionDate
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {prescription?.submittedAt && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Submitted:</span>
                      <span className="font-medium">
                        {new Date(
                          prescription.submittedAt
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Additional Notes Section */}
            {prescription?.additionalNotes && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Additional Notes
                </h3>
                <div className="text-gray-600">
                  {prescription.additionalNotes}
                </div>
              </div>
            )}

            {/* Prescription Image */}
            {prescription?.prescriptionImage && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Original Prescription
                </h3>
                <div className="flex justify-center">
                  <img
                    src={prescription.prescriptionImage}
                    alt="Prescription"
                    className="max-w-full h-auto rounded-lg shadow-lg"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t p-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPrescriptionModal;
