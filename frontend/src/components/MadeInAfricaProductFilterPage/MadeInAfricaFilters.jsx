import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { PlusOutlined } from "@ant-design/icons";
import { Menu as AntdMenu } from "antd";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import styles from "../../styles/styles";
import ProductCard from "../Route/ProductCard/ProductCard";
import { server } from "../../server";
import axios from "axios";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MadeInAfricaFilterPage = () => {
  const [searchParams] = useSearchParams();
  const categoryData = searchParams.get("category");
  const { allProducts, isLoading } = useSelector((state) => state.products);
  const [nestedCategories, setNestedCategories] = useState([]);
  const [data, setData] = useState([]);
  console.log(data);
  const [categories, setCategories] = useState([]);

  //filter logic------------------------------------------------------------------------------------------------------
  const [filters, setFilters] = useState([]);
  const sortOptions = [
    { name: "Most Popular", href: "#", current: true },
    { name: "Best Rating", href: "#", current: false },
    { name: "Newest", href: "#", current: false },
    { name: "Price: Low to High", href: "#", current: false },
    { name: "Price: High to Low", href: "#", current: false },
  ];
  const sortCoutries = [
    { name: "Rwanda", href: "#", current: false },
    { name: "Guinea", href: "#", current: false },
    //   { name: 'Newest', href: '#', current: false },
    //   { name: 'Price: Low to High', href: '#', current: false },
    //   { name: 'Price: High to Low', href: '#', current: false },
  ];
  console.log(filters);

  useEffect(() => {
    // Fetch all products when the component mounts
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(`${server}/filters`);
        const Data = response.data;

        setData(Data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };

    fetchAllProducts();
  }, []);

  useEffect(() => {
    // Fetch products when filters change (skip for the initial fetch)
    if (Object.keys(filters).length > 0) {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${server}/filters`, {
            params: filters,
          });
          const Data = response.data;
          setData(Data);
        } catch (error) {
          console.error("Error fetching products", error);
        }
      };

      fetchProducts();
    }
  }, [filters]);

  useEffect(() => {
    // Extract and set filters from URL parameters
    const urlSearchParams = new URLSearchParams(window.location.search);
    const urlParams = Object.fromEntries(urlSearchParams.entries());
    setFilters((prevFilters) => ({ ...prevFilters, ...urlParams }));
  }, [window.location.search]);

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  const handleClearFilters = () => {
    // Clear all filters and fetch all products
    setFilters({});
  };
  //filter logic------------------------------------------------------------------------------------------------------

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
          onClick={(key) => {
            handleFilterChange("categories", category._id);
          }}
        >
          {category.name}
        </span>
      ),
      key: category._id,

      children: convertToNestedStructureRecursive(
        category.children,
        category._id
      ),
    }));
  };

  const convertToNestedStructureRecursive = (children) => {
    return children.map((child) => ({
      label: (
        <span
          onClick={(key) => {
            handleFilterChange("categories", child._id);
          }}
        >
          {child.name}
        </span>
      ),
      key: child._id,

      children: convertToNestedStructureRecursive(child.children, child._id),
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

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul
                      role="list"
                      className="px-2 py-3 font-medium text-gray-900"
                    >
                      <AntdMenu
                        mode="inline"
                        styles={{ paddingLeft: 0 }}
                        items={[
                          {
                            label: "Categories",
                            key: "Categories",
                            children: [
                              {
                                label: (
                                  <AntdMenu
                                    mode="inline"
                                    items={nestedCategories}
                                  />
                                ),
                                key: "Categories",
                                style: {
                                  height: "fit-content",
                                  paddingRight: 0,
                                  paddingLeft: 0,
                                },
                              },
                            ],
                          },
                        ]}
                      />
                    </ul>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className=" w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Filers
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left mr-10">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900 ml-5">
                    Sort by countries
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none ">
                    <div className="py-1">
                      {sortCoutries.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <a
                              href={option.href}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  <AntdMenu
                    mode="inline"
                    styles={{ paddingLeft: 0 }}
                    items={[
                      {
                        label: "By Categories",
                        key: "Categories",
                        children: [
                          {
                            label: (
                              <AntdMenu
                                mode="inline"
                                items={nestedCategories}
                              />
                            ),
                            key: "Categories",
                            style: {
                              height: "fit-content",
                              paddingRight: 0,
                              paddingLeft: 0,
                            },
                          },
                        ],
                        styles: { width: "10px" },
                      },
                    ]}
                  />
                  {/* {Array.isArray(categories) &&
                    categories.map((category) => (
                      <li key={category._id}>
                        <a href="#" className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))} */}
                </ul>
                <h3 className="sr-only">Categories</h3>
                <ul
                  role="list"
                  className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  <AntdMenu
                    mode="inline"
                    styles={{ paddingLeft: 0 }}
                    items={[
                      {
                        label: "By Brands",
                        key: "Categories",
                        children: [
                          {
                            label: (
                              <AntdMenu
                                mode="inline"
                                items={nestedCategories}
                              />
                            ),
                            key: "Categories",
                            style: {
                              height: "fit-content",
                              paddingRight: 0,
                              paddingLeft: 0,
                            },
                          },
                        ],
                        styles: { width: "10px" },
                      },
                    ]}
                  />
                  {/* {Array.isArray(categories) &&
                    categories.map((category) => (
                      <li key={category._id}>
                        <a href="#" className="block px-2 py-3">
                          {category.name}
                        </a>
                      </li>
                    ))} */}
                </ul>

                {/* {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="border-b border-gray-200 py-6"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500 ">
                            <span className="font-medium text-gray-900 pl-6">
                              categories
                            </span>
                            <span className="ml-5 flex items-center">
                              {open ? (
                                <MinusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PlusIcon
                                  className="h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600 pl-6"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))} */}
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <div className={`${styles.section}`}>
                  <div className="grid grid-cols-2 gap-6 mt-10 lg:mt-16 lg:gap-4 lg:grid-cols-4 whitespace-normal">
                    {data &&
                      data.map((i, index) => (
                        <ProductCard data={i} key={index} />
                      ))}
                  </div>
                  {data && data.length === 0 ? (
                    <h1 className="text-center w-full pb-[100px] text-[20px]">
                      No products Found!
                    </h1>
                  ) : null}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default MadeInAfricaFilterPage;
