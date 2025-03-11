import React, { useState } from "react";
import { X } from "lucide-react";
import { toast } from "react-toastify";
import API from "../../utils/API";
import { getOrderDetails } from "../../redux/actions/orderActions";
import { useDispatch } from "react-redux";

const UploadPrescriptions = ({ isOpen, setIsOpen, orderId, orderItemId }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    rightEye: {
      dv: {
        sphere: "",
        cylinder: "",
        axis: "",
        visualAcuity: "",
      },
      nv: {
        sphere: "",
        cylinder: "",
        axis: "",
        visualAcuity: "",
      },
      add: "",
    },
    leftEye: {
      dv: {
        sphere: "",
        cylinder: "",
        axis: "",
        visualAcuity: "",
      },
      nv: {
        sphere: "",
        cylinder: "",
        axis: "",
        visualAcuity: "",
      },
      add: "",
    },
    prescriptionImage: null,
    doctorName: "",
    clinicName: "",
    prescriptionDate: "",
    additionalNotes: "",
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);

  const validateForm = () => {
    const newErrors = {};

    // Validate Right Eye DV
    if (!formData.rightEye.dv.sphere)
      newErrors.rightEyeDvSphere = "Sphere value is required";
    if (!formData.rightEye.dv.cylinder)
      newErrors.rightEyeDvCylinder = "Cylinder value is required";
    if (!formData.rightEye.dv.axis)
      newErrors.rightEyeDvAxis = "Axis value is required";

    // Validate Left Eye DV
    if (!formData.leftEye.dv.sphere)
      newErrors.leftEyeDvSphere = "Sphere value is required";
    if (!formData.leftEye.dv.cylinder)
      newErrors.leftEyeDvCylinder = "Cylinder value is required";
    if (!formData.leftEye.dv.axis)
      newErrors.leftEyeDvAxis = "Axis value is required";

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
        dispatch(getOrderDetails(orderId));
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
    eyeSide = null,
    visionType = null,
    field = null,
    value
  ) => {
    if (eyeSide && visionType && field) {
      setFormData((prev) => ({
        ...prev,
        [eyeSide]: {
          ...prev[eyeSide],
          [visionType]: {
            ...prev[eyeSide][visionType],
            [field]: value,
          },
        },
      }));
      // Clear specific error
      if (
        errors[
          `${eyeSide}${visionType.toUpperCase()}${
            field.charAt(0).toUpperCase() + field.slice(1)
          }`
        ]
      ) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[
            `${eyeSide}${visionType.toUpperCase()}${
              field.charAt(0).toUpperCase() + field.slice(1)
            }`
          ];
          return newErrors;
        });
      }
    } else if (eyeSide && field === "add") {
      setFormData((prev) => ({
        ...prev,
        [eyeSide]: {
          ...prev[eyeSide],
          add: value,
        },
      }));
      // Clear specific error
      if (errors[`${eyeSide}Add`]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[`${eyeSide}Add`];
          return newErrors;
        });
      }
    } else {
      // For top-level fields like pupillaryDistance, doctorName, etc.
      setFormData((prev) => ({
        ...prev,
        [eyeSide]: value, // eyeSide is used as the field name in this case
      }));
      // Clear specific field error
      if (errors[eyeSide]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[eyeSide];
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
          <div className="bg-white rounded w-full max-w-4xl max-h-[90vh] overflow-y-auto">
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
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-emerald-600 border-b pb-2">
                    Left Eye
                  </h3>

                  {/* Distance Vision */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-700">
                      Distance Vision (DV)
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sphere
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={formData.leftEye.dv.sphere}
                        onChange={(e) =>
                          handleInputChange(
                            "leftEye",
                            "dv",
                            "sphere",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      {errors.leftEyeDvSphere && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.leftEyeDvSphere}
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
                        value={formData.leftEye.dv.cylinder}
                        onChange={(e) =>
                          handleInputChange(
                            "leftEye",
                            "dv",
                            "cylinder",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      {errors.leftEyeDvCylinder && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.leftEyeDvCylinder}
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
                        value={formData.leftEye.dv.axis}
                        onChange={(e) =>
                          handleInputChange(
                            "leftEye",
                            "dv",
                            "axis",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      {errors.leftEyeDvAxis && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.leftEyeDvAxis}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Visual Acuity (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6/6, 20/20"
                        value={formData.leftEye.dv.visualAcuity}
                        onChange={(e) =>
                          handleInputChange(
                            "leftEye",
                            "dv",
                            "visualAcuity",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                  </div>

                  {/* Near Vision */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-700">
                      Near Vision (NV)
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sphere (Optional)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={formData.leftEye.nv.sphere}
                        onChange={(e) =>
                          handleInputChange(
                            "leftEye",
                            "nv",
                            "sphere",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cylinder (Optional)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={formData.leftEye.nv.cylinder}
                        onChange={(e) =>
                          handleInputChange(
                            "leftEye",
                            "nv",
                            "cylinder",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Axis (Optional)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="180"
                        value={formData.leftEye.nv.axis}
                        onChange={(e) =>
                          handleInputChange(
                            "leftEye",
                            "nv",
                            "axis",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Visual Acuity (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6/6, 20/20"
                        value={formData.leftEye.nv.visualAcuity}
                        onChange={(e) =>
                          handleInputChange(
                            "leftEye",
                            "nv",
                            "visualAcuity",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                  </div>

                  {/* Add Power */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Add Power (Optional)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      placeholder="For bifocal/progressive"
                      value={formData.leftEye.add}
                      onChange={(e) =>
                        handleInputChange(
                          "leftEye",
                          null,
                          "add",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                </div>

                {/* Right Eye Section */}
                <div className="space-y-6">
                  <h3 className="text-lg font-medium text-emerald-600 border-b pb-2">
                    Right Eye
                  </h3>

                  {/* Distance Vision */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-700">
                      Distance Vision (DV)
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sphere
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={formData.rightEye.dv.sphere}
                        onChange={(e) =>
                          handleInputChange(
                            "rightEye",
                            "dv",
                            "sphere",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      {errors.rightEyeDvSphere && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.rightEyeDvSphere}
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
                        value={formData.rightEye.dv.cylinder}
                        onChange={(e) =>
                          handleInputChange(
                            "rightEye",
                            "dv",
                            "cylinder",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      {errors.rightEyeDvCylinder && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.rightEyeDvCylinder}
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
                        value={formData.rightEye.dv.axis}
                        onChange={(e) =>
                          handleInputChange(
                            "rightEye",
                            "dv",
                            "axis",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                      {errors.rightEyeDvAxis && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.rightEyeDvAxis}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Visual Acuity (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6/6, 20/20"
                        value={formData.rightEye.dv.visualAcuity}
                        onChange={(e) =>
                          handleInputChange(
                            "rightEye",
                            "dv",
                            "visualAcuity",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                  </div>

                  {/* Near Vision */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-700">
                      Near Vision (NV)
                    </h4>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Sphere (Optional)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={formData.rightEye.nv.sphere}
                        onChange={(e) =>
                          handleInputChange(
                            "rightEye",
                            "nv",
                            "sphere",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Cylinder (Optional)
                      </label>
                      <input
                        type="number"
                        step="0.25"
                        value={formData.rightEye.nv.cylinder}
                        onChange={(e) =>
                          handleInputChange(
                            "rightEye",
                            "nv",
                            "cylinder",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Axis (Optional)
                      </label>
                      <input
                        type="number"
                        min="0"
                        max="180"
                        value={formData.rightEye.nv.axis}
                        onChange={(e) =>
                          handleInputChange(
                            "rightEye",
                            "nv",
                            "axis",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">
                        Visual Acuity (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 6/6, 20/20"
                        value={formData.rightEye.nv.visualAcuity}
                        onChange={(e) =>
                          handleInputChange(
                            "rightEye",
                            "nv",
                            "visualAcuity",
                            e.target.value
                          )
                        }
                        className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                      />
                    </div>
                  </div>

                  {/* Add Power */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Add Power (Optional)
                    </label>
                    <input
                      type="number"
                      step="0.25"
                      placeholder="For bifocal/progressive"
                      value={formData.rightEye.add}
                      onChange={(e) =>
                        handleInputChange(
                          "rightEye",
                          null,
                          "add",
                          e.target.value
                        )
                      }
                      className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                    />
                  </div>
                </div>
              </div>

              {/* Additional Measurements */}
              <div className="mt-6 space-y-4">
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
                        handleInputChange(
                          "doctorName",
                          null,
                          null,
                          e.target.value
                        )
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
                        handleInputChange(
                          "clinicName",
                          null,
                          null,
                          e.target.value
                        )
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
                      handleInputChange(
                        "prescriptionDate",
                        null,
                        null,
                        e.target.value
                      )
                    }
                    className="mt-1 block w-full rounded-md border border-gray-300 focus:border-blue-500 focus:ring-blue-500 p-2"
                  />
                </div>

                {/* Additional Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Additional Notes (Optional)
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) =>
                      handleInputChange(
                        "additionalNotes",
                        null,
                        null,
                        e.target.value
                      )
                    }
                    rows={3}
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
