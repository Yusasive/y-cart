import React from "react";
import { Button } from "antd";

const LoadingButton = ({ loading, onClick }) => {
  return (
    <Button
      type="primary"
      style={{ backgroundColor: "#1677FF" }}
      loading={loading}
      onClick={onClick}
    >
      {loading ? "Submitting" : "Submit!"}
    </Button>
  );
};

export default LoadingButton;
