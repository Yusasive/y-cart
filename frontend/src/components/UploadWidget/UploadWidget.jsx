import { useEffect, useRef } from "react";
import { Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadWidget = ({ onUploadSuccess, multiple }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();

  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dlzh0xwus",
        uploadPreset: "d6aaepag",
        multiple: multiple,
        cropping: false,
        sources: ["local", "url"],
        resourceType: "auto",
        clientAllowedFormats: ["png", "jpg", "jpeg", "webp"],
        maxFileSize: 5000000,
      },
      function (error, result) {
        if (!error && result && result.event === "success") {
          if (result.info.files) {
            // Extract public IDs and secure URLs for each uploaded file
            const fileDataArray = result.info.files;
            const fileUrls = fileDataArray.map((fileData) => ({
              public_id: fileData.public_id,
              url: fileData.secure_url,
            }));

            // Call the callback function to pass the uploaded URLs to the parent component
            onUploadSuccess(fileUrls);
            console.log(fileUrls);
          } else {
            // Handle a single file upload
            const url = result.info.secure_url;
            const public_id = result.info.public_id;
            console.log(url, public_id);

            // Call the callback function to pass the uploaded URL and public ID to the parent component
            onUploadSuccess([{ public_id, url }]);
          }
        }
      }
    );
  }, [onUploadSuccess]);

  return (
    <Button
      type="primary"
      style={{ backgroundColor: "#1677FF" }}
      icon={<UploadOutlined />}
      onClick={(e) => {
        e.preventDefault();
        widgetRef.current.open();
      }}
      size="large"
    >
      upload
    </Button>
    // <button className=""
    //   onClick={(e) => {
    //     e.preventDefault();
    //     widgetRef.current.open();
    //   }}
    // >
    //   Upload
    // </button>
  );
};

export default UploadWidget;
