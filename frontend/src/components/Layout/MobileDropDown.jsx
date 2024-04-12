//  import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import styles from "../../styles/styles";
// import { server } from "../../server";
// import { TreeSelect } from 'antd';
// import axios from "axios";

// const DropDown = ({ categoriesData, setDropDown }) => {
//   const navigate = useNavigate();
//   const submitHandle = (i) => {
//     navigate(`/products?category=${i.title}`);
//     setDropDown(false);
//     window.location.reload();
//   };
//   return (
//     <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">

//       {categoriesData &&
//         categoriesData.map((i, index) => (
//           <div
//             key={index}
//             className={`${styles.noramlFlex}`}
//             onClick={() => submitHandle(i)}
//           >
//             <img
//               src={i.image_Url}
//               style={{
//                 width: "25px",
//                 height: "25px",
//                 objectFit: "contain",
//                 marginLeft: "10px",
//                 userSelect: "none",
//               }}
//               alt=""
//             />
//             <h3 className="m-3 cursor-pointer select-none">{i.title}</h3>
//           </div>
//         ))}
//     </div>
//   );
// };

// export default DropDown;

// <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
//       {categoriesData &&
//         categoriesData.map((category, index) => (
//           <div
//             key={index}
//             className={`${styles.noramlFlex}`}
//             onClick={() => submitHandle(category)}
//             onMouseOver={() => handleMouseOver(category)}
//             onMouseOut={handleMouseOut}
//           >
//             <img
//               src={category.image_Url}
//               style={{
//                 width: '25px',
//                 height: '25px',
//                 objectFit: 'contain',
//                 marginLeft: '10px',
//                 userSelect: 'none',
//               }}
//               alt=""
//             />
//             <h3 className="m-3 cursor-pointer select-none">{category.title}</h3>

//             {selectedCategory === category && category.subcategories && (
//               <div className="ml-[270px] absolute top-0">
//                 {/* Render subcategories here */}
//                 {category.subcategories.map((subCategory, subIndex) => (
//                   <div key={subIndex}>{/* Render subcategory content */}</div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//     </div>

import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/styles";
import { server } from "../../server";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const MobileDropDown = () => {
  const navigate = useNavigate();
  const [nestedCategories, setNestedCategories] = useState([]);

  async function fetchDataFromBackend() {
    const backendEndpoint = `${server}/category/get-all-categories`;

    try {
      const response = await axios.get(backendEndpoint);
      const data = response.data;

      if (response.status >= 200 && response.status < 300) {
        return data;
      } else {
        throw new Error("Failed to fetch data from the backend");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      return [];
    }
  }

  const convertToNestedStructure = (categoriesArray) => {
    const categories = categoriesArray.categories;

    const categoryMap = {};
    categories.forEach((category) => {
      category.children = [];
      categoryMap[category._id] = category;
    });

    const nestedCategories = [];
    categories.forEach((category) => {
      if (category.parentCategory !== undefined) {
        categoryMap[category.parentCategory].children.push(category);
      } else {
        nestedCategories.push(category);
      }
    });

    return nestedCategories.map((category) => ({
      label: (
        <span
          onClick={() => {
            navigate(`/products?categories=${category._id}`);
          }}
        >
          {category.name}
        </span>
      ),
      key: category._id,
      children: convertToNestedStructureRecursive(category.children),
    }));
  };

  const convertToNestedStructureRecursive = (children) => {
    return children.map((child) => ({
      label: (
        <span
          onClick={() => {
            navigate(`/products?categories=${child._id}`);
          }}
        >
          {child.name}
        </span>
      ),
      key: child._id,
      children: convertToNestedStructureRecursive(child.children),
    }));
  };

  useEffect(() => {
    async function convertAndPrintNestedStructure() {
      try {
        const categoriesArray = await fetchDataFromBackend();
        const nestedCategories = convertToNestedStructure(categoriesArray);
        setNestedCategories(nestedCategories);
      } catch (error) {
        console.error("Error:", error.message);
      }
    }

    convertAndPrintNestedStructure();
  }, []);

  return (
    <div className="pb-4 w-[270px] bg-[#fff] absolute z-30 rounded-b-md shadow-sm">
      <div>
        <Menu
          mode="inline"
          onClick={() => {
            console.log("items clicked please");
          }}
          items={nestedCategories}
        />
      </div>
    </div>
  );
};

export default MobileDropDown;
