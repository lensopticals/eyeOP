import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import API from "../../utils/API";

const UploadPrescriptions = ({ isOpen, setIsOpen, orderId, orderItemId }) => {
  const [formData, setFormData] = useState({
    rightEye: { sphere: "", cylinder: "", axis: "" },
    leftEye: { sphere: "", cylinder: "", axis: "" },
    pupillaryDistance: "",
    prescriptionImage: null,
    doctorName: "",
    clinicName: "",
    prescriptionDate: "",
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Validate Right Eye
    if (!formData.rightEye.sphere)
      newErrors.rightEyeSphere = "Sphere value is required";
    if (!formData.rightEye.cylinder)
      newErrors.rightEyeCylinder = "Cylinder value is required";
    if (!formData.rightEye.axis)
      newErrors.rightEyeAxis = "Axis value is required";

    // Validate Left Eye
    if (!formData.leftEye.sphere)
      newErrors.leftEyeSphere = "Sphere value is required";
    if (!formData.leftEye.cylinder)
      newErrors.leftEyeCylinder = "Cylinder value is required";
    if (!formData.leftEye.axis)
      newErrors.leftEyeAxis = "Axis value is required";

    // Validate PD
    if (!formData.pupillaryDistance)
      newErrors.pupillaryDistance = "Pupillary distance is required";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", formData);
      try {
        const { data } = await API.post(
          `/orders/${orderId}/items/${orderItemId}/prescription`,
          formData
        );
        toast.success(data.message);
      } catch (error) {
        console.log("Error submitting form:", error);
        toast.error("Failed to submit prescription. Please try again.");
      }
      setIsOpen(false);
    } else {
      setErrors(newErrors);
    }
  };

  const handleInputChange = (
    field,
    value,
    eyeSide = null,
    measurement = null
  ) => {
    if (eyeSide) {
      setFormData((prev) => ({
        ...prev,
        [eyeSide]: {
          ...prev[eyeSide],
          [measurement]: value,
        },
      }));
      // Clear specific eye measurement error
      if (
        errors[
          `${eyeSide}${
            measurement.charAt(0).toUpperCase() + measurement.slice(1)
          }`
        ]
      ) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[
            `${eyeSide}${
              measurement.charAt(0).toUpperCase() + measurement.slice(1)
            }`
          ];
          return newErrors;
        });
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
      // Clear specific field error
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, prescriptionImage: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          {/* Modal Content */}
          <div className="bg-white rounded w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-semibold text-gray-800">
                Upload Prescription
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Eye Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-emerald-600">
                    Left Eye
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sphere
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={formData.leftEye.sphere}
                      onChange={(e) =>
                        handleInputChange(
                          "leftEye",
                          e.target.value,
                          "leftEye",
                          "sphere"
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                    {errors.leftEyeSphere && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.leftEyeSphere}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cylinder
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={formData.leftEye.cylinder}
                      onChange={(e) =>
                        handleInputChange(
                          "leftEye",
                          e.target.value,
                          "leftEye",
                          "cylinder"
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                    {errors.leftEyeCylinder && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.leftEyeCylinder}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Axis
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={formData.leftEye.axis}
                      onChange={(e) =>
                        handleInputChange(
                          "leftEye",
                          e.target.value,
                          "leftEye",
                          "axis"
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                    {errors.leftEyeAxis && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.leftEyeAxis}
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Eye Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-emerald-600">
                    Right Eye
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sphere
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={formData.rightEye.sphere}
                      onChange={(e) =>
                        handleInputChange(
                          "rightEye",
                          e.target.value,
                          "rightEye",
                          "sphere"
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                    {errors.rightEyeSphere && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.rightEyeSphere}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Cylinder
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      value={formData.rightEye.cylinder}
                      onChange={(e) =>
                        handleInputChange(
                          "rightEye",
                          e.target.value,
                          "rightEye",
                          "cylinder"
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                    {errors.rightEyeCylinder && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.rightEyeCylinder}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Axis
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="180"
                      value={formData.rightEye.axis}
                      onChange={(e) =>
                        handleInputChange(
                          "rightEye",
                          e.target.value,
                          "rightEye",
                          "axis"
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                    {errors.rightEyeAxis && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.rightEyeAxis}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Measurements */}
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Pupillary Distance (mm)
                  </label>
                  <input
                    type="number"
                    value={formData.pupillaryDistance}
                    onChange={(e) =>
                      handleInputChange("pupillaryDistance", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2 outline-none"
                  />
                  {errors.pupillaryDistance && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.pupillaryDistance}
                    </p>
                  )}
                </div>

                {/* Optional Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Doctor's Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.doctorName}
                      onChange={(e) =>
                        handleInputChange("doctorName", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Clinic Name (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.clinicName}
                      onChange={(e) =>
                        handleInputChange("clinicName", e.target.value)
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                </div>

                {/* Prescription Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Prescription Date (Optional)
                  </label>
                  <input
                    type="date"
                    value={formData.prescriptionDate}
                    onChange={(e) =>
                      handleInputChange("prescriptionDate", e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Upload Prescription Image (Optional)
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {imagePreview ? (
                        <div className="relative">
                          <img
                            src={imagePreview}
                            alt="Preview"
                            className="mx-auto h-32 w-auto"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview(null);
                              setFormData((prev) => ({
                                ...prev,
                                prescriptionImage: null,
                              }));
                            }}
                            className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500">
                              <span>Upload a file</span>
                              <input
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleImageChange}
                              />
                            </label>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Actions */}
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 border border-slate-500 rounded-md text-slate-800 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700"
                >
                  Submit Prescription
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPrescriptions;
