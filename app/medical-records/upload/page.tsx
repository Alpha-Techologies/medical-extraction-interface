"use client";
import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload, Modal, Button, Spin } from "antd";
import { useSelector } from "react-redux";

const { Dragger } = Upload;

const UploadDocument: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
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
        } else {
          message.error("Image upload failed.");
        }
      } catch (error) {
        message.error("An error occurred while uploading the image.");
      } finally {
        setLoading(false);
        resetPreview();
      }
    }
  };

  const resetPreview = () => {
    setPreviewImage(null);
    setFileToUpload(null);
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
    </>
  );
};

export default UploadDocument;
