"use client";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Modal, Button, Spin } from "antd";
import { useSelector } from "react-redux";

const { Dragger } = Upload;

const UploadDocument: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewExtracted, setPreviewExtracted] = useState<boolean | null>(
    false
  );
  const [record, setrecord] = useState<any | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const access_token = useSelector((state: any) => state.auth.access_token);
  const refresh_token = useSelector((state: any) => state.auth.refresh_token);

  const props: UploadProps = {
    name: "file",
    multiple: false, // Single image upload
    showUploadList: false, // Hide default file list
    beforeUpload: (file) => {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        message.error("You can only upload image files!");
        return Upload.LIST_IGNORE;
      }
      const reader = new FileReader();
      reader.onload = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
      setFileToUpload(file);
      return false; // Prevent automatic upload, wait for "Extract" button
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleExtract = async () => {
    if (fileToUpload) {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", fileToUpload);

      try {
        const response = await fetch("http://localhost:5000/extract/", {
          method: "POST",
          body: formData,
          headers: {
            AccessToken: access_token,
            RefreshToken: refresh_token,
          },
        });
        if (response.ok) {
          message.success("Image uploaded successfully.");
          const extractedData = await response.json();
          console.log(extractedData.data);

          setrecord(extractedData.data);
          setPreviewExtracted(true);
        } else {
          message.error("Image upload failed.");
        }
      } catch (error) {
        message.error("An error occurred while uploading the image.");
      } finally {
        setLoading(false);
        // resetPreview();
      }
    }
  };
  const deleteRecord = async (id: any) => {
    try {
      console.log(id.$oid);
      const response = await fetch(
        "http://localhost:5000/extract/patient_data/" + id.$oid,
        {
          method: "DELETE",
          body: JSON.stringify({
            PatientDemographics: {
              MedicalRecordNumber:
                record?.PatientDemographics.MedicalRecordNumber,
            },
          }),
          headers: {
            AccessToken: access_token,
            RefreshToken: refresh_token,
          },
        }
      );
      if (response.ok) {
        message.success("Extracted data deleted successfully.");
        setPreviewExtracted(false);
        setPreviewImage(null);
        setFileToUpload(null);
      } else {
        message.error("Record deletion failed.");
      }
    } catch (error) {
      message.error("Record deletion failed.");
    }
  };

  const resetPreview = () => {
    setPreviewImage(null);
    setFileToUpload(null);
  };
  const resetExtractedPreview = () => {
    setPreviewExtracted(false);
  };

  return (
    <>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag an image to this area to upload
        </p>
        <p className="ant-upload-hint">
          Only image files are supported. Click "Extract" to upload or "Discard"
          to cancel.
        </p>
      </Dragger>

      {/* Modal preview for selected image */}
      {previewImage && (
        <Modal
          open={true}
          footer={null}
          onCancel={resetPreview}
          centered
          className="text-center"
        >
          <img
            src={previewImage}
            alt="Preview"
            className="w-full max-h-[600px] mb-4"
          />
          <div className="flex justify-center gap-4">
            <Button type="primary" onClick={handleExtract} loading={loading}>
              {loading ? "Extracting..." : "Extract"}
            </Button>
            <Button onClick={resetPreview} disabled={loading}>
              Discard
            </Button>
          </div>
        </Modal>
      )}
      {previewExtracted && (
        <Modal
          open={true}
          footer={null}
          onCancel={resetExtractedPreview}
          centered
          className="text-center"
        >
          <div className="bg-white p-6 lg:p-10 md:p-8 sm:p-4 rounded-lg shadow-md space-y-6 max-w-4xl mx-auto">
            <h2 className="text-2xl font-semibold text-center">
              Patient Medical Record
            </h2>

            {/* Patient Demographics Section */}
            <section className="border-b pb-4">
              <h3 className="font-semibold text-lg">Patient Demographics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p>
                  <span className="font-medium">Name:</span>{" "}
                  {record?.PatientDemographics.Name || "-"}
                </p>
                <p>
                  <span className="font-medium">Father's Name:</span>{" "}
                  {record?.PatientDemographics.FatherName || "-"}
                </p>
                <p>
                  <span className="font-medium">Grandfather's Name:</span>{" "}
                  {record?.PatientDemographics.GrandFatherName || "-"}
                </p>
                <p>
                  <span className="font-medium">Gender:</span>{" "}
                  {record?.PatientDemographics.Gender || "-"}
                </p>
                <p>
                  <span className="font-medium">Age:</span>{" "}
                  {record?.PatientDemographics.Age || "-"}
                </p>
                <p>
                  <span className="font-medium">Medical Record #:</span>{" "}
                  {record?.PatientDemographics.MedicalRecordNumber || "-"}
                </p>
                <p>
                  <span className="font-medium">Date of Registration:</span>{" "}
                  {record?.PatientDemographics.DateOfRegistration || "-"}
                </p>
                <p>
                  <span className="font-medium">Address:</span>{" "}
                  {record?.PatientDemographics.Address.Region || "-"},{" "}
                  {record?.PatientDemographics.Address.Wereda || "-"}, Kebele{" "}
                  {record?.PatientDemographics.Address.Kebele || "-"}, House No.{" "}
                  {record?.PatientDemographics.Address.HouseNumber || "-"}
                </p>
                <p>
                  <span className="font-medium">Phone:</span>{" "}
                  {record?.PatientDemographics.PhoneNumber || "-"}
                </p>
              </div>
            </section>

            {/* History Sheet Section */}
            <section>
              <h3 className="font-semibold text-lg">Medical History</h3>
              {record?.HistorySheet.map((history: any, index: any) => (
                <div
                  key={index}
                  className="border rounded-md p-4 my-4 bg-gray-50"
                >
                  <p>
                    <span className="font-medium">Date:</span>{" "}
                    {history.Date || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Age:</span>{" "}
                    {history.Age || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Sex:</span>{" "}
                    {history.Sex || "-"}
                  </p>
                  <p>
                    <span className="font-medium">Medical History:</span>{" "}
                    {history.MedicalHistory ||
                      "This Medical Record has no history"}
                  </p>
                </div>
              )) || <p>This Medical Record has no history</p>}
            </section>
          </div>
          <div className="flex justify-center mt-3 gap-4">
            <Button
              type="primary"
              onClick={resetExtractedPreview}
              loading={loading}
            >
              {loading ? "saving..." : "Save"}
            </Button>
            <Button
              onClick={() => deleteRecord(record?._id)}
              disabled={loading}
            >
              Discard
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
};

export default UploadDocument;
