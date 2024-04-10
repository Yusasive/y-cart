import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import LoadingButton from "../SubmitButton/SubmitButton";
import UploadWidget from "../UploadWidget/UploadWidget";

const CreateCategory = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [categoriesData, setCategoriesData] = useState([]);
  const [parentCategory, setParentCategory] = useState();
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = (urls) => {
    setImage(urls);
  };

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage("");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server}/category/get-all-categories`
        );
        setCategoriesData(response.data.categories);
        console.log("Categories Data:", response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  // const handleFileInputChange = (e) => {
  //   const reader = new FileReader();

  //   reader.onload = () => {
  //     if (reader.readyState === 2) {
  //       setImage(reader.result);
  //     }
  //   };

  //   reader.readAsDataURL(e.target.files[0]);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    axios
      .post(`${server}/category/create-category`, {
        name,
        parentCategory,
        image,
      })
      .then((res) => {
        setImage();
        setName("");
        setParentCategory();
        toast.success("category created successfully");
        setLoading(false);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="w-[90%] 800px:w-[50%] bg-white  shadow h-[80vh] rounded-[4px] p-3 overflow-y-scroll">
      <h5 className="text-[30px] font-Poppins text-center">Create Category</h5>
      {/* create product form */}
      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label className="pb-2">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            value={name}
            className="mt-2 appearance-none block w-full px-3 h-[35px] border border-gray-300 rounded-[3px] placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your product name..."
          />
        </div>
        <br />

        <br />
        <div>
          <label className="pb-3">
            parentCategory{" "}
            <span className="text-red-500">
              if it is a subcategory choose the parent
            </span>
          </label>
          <select
            className="w-full mt-2 border h-[40px] rounded-[5px]"
            value={parentCategory}
            onChange={(e) => setParentCategory(e.target.value)}
          >
            <option value="Choose a category">Choose a category</option>
            {Array.isArray(categoriesData) &&
              categoriesData.map((category) => (
                <option value={category._id} key={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>
        <br />

        <br />
        <div>
          <div className="w-full my-4 p-8 bg-gray-200 border-2 rounded-lg">
            <div className="mb-4 text-center">
              <label className="block text-lg font-semibold mb-2">
                Upload Image
              </label>
              <UploadWidget
                onUploadSuccess={handleUploadSuccess}
                multiple={false}
              />
            </div>

            <div className="flex flex-wrap justify-center">
              {Array.isArray(image) && image.length > 0 ? (
                image.map((image, index) => (
                  <div
                    key={index}
                    className="max-w-36 max-h-36 m-2 rounded-md overflow-hidden relative"
                  >
                    <img
                      src={image.url}
                      alt={`Uploaded Image ${index + 1}`}
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={(e) => handleRemoveImage(e, index)}
                      className="absolute top-1 right-1 bg-red-500 text-white px-2 py-1 text-xs rounded-md"
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p></p>
              )}
            </div>
          </div>
          <br />
          <div className="flex items-center justify-center">
            <LoadingButton loading={loading} onClick={handleSubmit} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
