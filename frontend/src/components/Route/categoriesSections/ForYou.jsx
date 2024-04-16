import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "../../../styles/styles";
import { server } from "../../../server";
import axios from "axios";
import CategoryCard from "../CategoryCard/CategoryCard";

const ForYou = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server}/category/get-all-categories`
        );
        setData(response.data.categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  return (
    //  <div className="pb-5">
    //       <div className="w-full flex flex-col mx-auto py-auto bg-white">
    //         <div className={`${styles.heading}`}>
    //           <h1>For you</h1>
    //         </div>

    //         <div className="flex overflow-x-scroll pb-16 hide-scroll-bar ">
    //           {data && data.length !== 0 && (
    //             <div className="flex gap-5">
    //               {data.map((category, index) => (
    //                 <div
    //                   key={index}
    //                   className=" sm:w-40 md:w-60 lg:w-60 h-80  whitespace-normal"
    //                 >
    //                   <CategoryCard data={category} key={index} />
    //                 </div>
    //               ))}
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>

    <div>
      <div className="w-full mx-auto bg-white">
        <div className={`${styles.heading}`}>
          <h1> categories</h1>
        </div>
        <div className="grid grid-cols-2 gap-[20px] md:grid-cols-4 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-6 xl:gap-[30px] mb-12 border-0 mr-5">
          {data && data.length !== 0 && (
            <>
              {data.map((category) => (
                <CategoryCard data={category} key={category._id} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForYou;

// <div>
//   <div className={`${styles.section}`}>
//     <div className={`${styles.heading}`}>
//       <h1>Best Deals</h1>
//     </div>
//     <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12 border-0">
//        {
//         data && data.length !== 0 &&(
//           <>
//            {data && data.map((i, index) => <ProductCard data={i} key={index} />)}
//           </>
//         )
//        }
//     </div>
//   </div>
// </div>
