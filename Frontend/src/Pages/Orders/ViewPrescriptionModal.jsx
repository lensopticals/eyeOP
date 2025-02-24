import React from "react";
import { X } from "lucide-react";

const ViewPrescriptionModal = ({ isOpen, onClose, prescription }) => {
  if (!isOpen) return null;

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
          {/* Prescription Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            {/* Left Eye */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-emerald-600 mb-4">
                Left Eye
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sphere:</span>
                  <span className="font-medium">
                    {prescription?.leftEye?.sphere}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cylinder:</span>
                  <span className="font-medium">
                    {prescription?.leftEye?.cylinder}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Axis:</span>
                  <span className="font-medium">
                    {prescription?.leftEye?.axis}°
                  </span>
                </div>
              </div>
            </div>

            {/* Right Eye */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-emerald-600 mb-4">
                Right Eye
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Sphere:</span>
                  <span className="font-medium">
                    {prescription?.rightEye?.sphere}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cylinder:</span>
                  <span className="font-medium">
                    {prescription?.rightEye?.cylinder}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Axis:</span>
                  <span className="font-medium">
                    {prescription?.rightEye?.axis}°
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-6">
            {/* Pupillary Distance */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Additional Measurements
              </h3>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Pupillary Distance:</span>
                <span className="font-medium">
                  {prescription?.pupillaryDistance} mm
                </span>
              </div>
            </div>

            {/* Doctor & Clinic Information */}
            {(prescription?.doctorName || prescription?.clinicName) && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Provider Information
                </h3>
                <div className="space-y-2">
                  {prescription?.doctorName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Doctor:</span>
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
                </div>
              </div>
            )}

            {/* Prescription Image */}
            {prescription?.prescriptionImage && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  Prescription Image
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
