"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import Image from "next/image";
import { useState } from "react";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
  useGetTagsQuery,
  useLazyGetDetailByIdQuery,
  useUpdateProductMutation,
} from "@/store/product/productApi";
import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import { EditIcon, TrashIcon, PlusIcon } from "lucide-react";
import CustomConfirmModal from "@/components/modals/CustomConfirmModal";
import ComponentSearch from "@/components/common/ComponentSearch";
import Select from "@/components/form/Select";
import MultiSelect from "@/components/form/MultiSelect";
import Button from "@/components/ui/button/Button";
import AddProductModal from "./AddProductModal";
import { ProductRequest } from "@/types/product";
import CustomModalAlert from "@/components/modals/CustomModalAlert";
import { formatRupiah } from "@/utils/globalFunction";

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState<string>("");
  const [isEdit, setIsEdit] = useState(false);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [category, setCategory] = useState<string>("");
  const [selectedTag, setSelectedTags] = useState<string[]>();
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deletProductId, setDeleteProductId] = useState<string>("");

  const [createProduct] = useCreateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [trigerGetProduct, { data: productById }] = useLazyGetDetailByIdQuery();

  const { data: categories } = useGetCategoriesQuery();
  const { data: tags } = useGetTagsQuery();

  const limit = 10;
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    limit,
    skip: (page - 1) * limit,
    q: query,
    category: category,
    tags: selectedTag,
  });
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const totalPages = products ? Math.ceil(products?.count / limit) : 1;

  const categoryData = categories?.data.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const tagsData = tags?.data.map((tag) => ({
    value: tag.name,
    text: tag.name,
    selected: false,
  }));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const handleEditProduct = async (productId: string) => {
    trigerGetProduct(productId);
    setOpenModal(true);
    setIsEdit(true);
  };

  const openDeleteModal = (productId: string) => {
    setDeleteProductId(productId);
    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleteProduct(deletProductId);
    setOpenConfirmModal(false);
  };

  const handleSelectChange = (value: string) => {
    setCategory(value);
  };

  const handleMultipleSelect = (value: string[]) => {
    setSelectedTags(value);
  };

  const handleOpenModalAddProduct = () => {
    setOpenModal(true);
    setIsEdit(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleAddProduct = async (dataProdact: ProductRequest) => {
    try {
      const payload = new FormData();
      const productId = productById?.data._id;
      const { name, price, category, image_url, discount, tags } = dataProdact;

      if (image_url instanceof File) {
        payload.append("image", image_url);
      }

      tags.forEach((tag) => {
        payload.append("tags", tag);
      });

      payload.append("name", name);
      payload.append("price", price.toString());
      payload.append("category", category);
      payload.append("discount", discount.toString());

      if (isEdit) {
        if (!productId) {
          setErrorMessage("Product ID is missing for update.");
          return;
        }
        const { data, status, message } = await updateProduct({
          id: productId,
          body: payload,
        }).unwrap();
        if (status !== "success") return;

        setSuccessMessage(message);
        setIsSuccess(true);
      } else {
        const { data, status, message } = await createProduct(payload).unwrap();
        if (status !== "success") return;

        setSuccessMessage(message);
        setIsSuccess(true);
      }
    } catch (error) {
      const { data } = error as any;
      setErrorMessage(data?.message || "Failed to add product");
      setOpenModal(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Product Management
        </h3>
        <div>
          <Button
            size="sm"
            type="button"
            variant="outline"
            startIcon={<PlusIcon className="h-4 w-4" />}
            onClick={handleOpenModalAddProduct}
          >
            Add Product
          </Button>
        </div>
      </div>
      <div className="flex md:grid-cols-4 md:gap-3 lg:gap-3 py-1 md:justify-start sm:flex-row sm:items-center">
        <div>
          <ComponentSearch
            placeholder="Search product.."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="hidden md:flex">
          <Select
            className="dark:bg-dark-900 h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-3 pr-14 text-sm text-gray-800 shadow-theme-xs placeholder:text-gray-400 focus:border-brand-300 focus:outline-hidden focus:ring-3 focus:ring-brand-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 xl:w-[430px]"
            options={categoryData ?? []}
            initValue={category}
            placeholder="Select category"
            onChange={handleSelectChange}
          />
        </div>
        <div className="hidden md:flex">
          <MultiSelect
            label={""}
            options={tagsData ?? []}
            onChange={handleMultipleSelect}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="max-w-full overflow-x-auto">
          <Table>
            {/* Table Header */}
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Products
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Discount
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Price
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Tags
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body */}
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {products?.data && products.data.length > 0 ? (
                products.data.map((product) => (
                  <TableRow key={product._id} className="">
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-[50px] w-[50px] overflow-hidden rounded-md">
                          <Image
                            width={50}
                            height={50}
                            src={`${baseUrl}/uploads/${product.image_url}`}
                            className="h-[50px] w-[50px]"
                            alt={product.name}
                          />
                        </div>
                        <div className="flex justify-between gap-5">
                          <div>
                            <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                              {product.name}
                            </p>
                            <span className="text-gray-500 text-theme-xs dark:text-gray-400">
                              {formatRupiah(product.price)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.discount}%
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {product.category.name}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatRupiah(product.price)}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex flex-wrap max-w-32 gap-3">
                        {product.tags.map((tag) => (
                          <Badge key={tag._id} size="sm" color="success">
                            {tag.name}
                          </Badge>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex items-center gap-3">
                        <button className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                          <EditIcon
                            className="inline h-4 w-4 stroke-[2.5]"
                            onClick={() => handleEditProduct(product._id)}
                          />
                        </button>
                        <button
                          className="text-error-500 hover:text-error-600 dark:text-error-400"
                          onClick={() => openDeleteModal(product._id)}
                        >
                          <TrashIcon className="inline h-4 w-4 stroke-[2.5]" />
                        </button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>
                    <div className="flex mx-auto">
                      <h3 className="text-sm font-normal text-gray-800 dark:text-gray-400">
                        Product empty..
                      </h3>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <div className="flex justify-end pt-4">
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(newPage) => setPage(newPage)}
            />
          </div>
          <AddProductModal
            isOpen={openModal}
            isEdit={isEdit}
            tags={tags ?? { status: "", data: [] }}
            categories={categories ?? { status: "", data: [] }}
            product={productById}
            onClose={handleCancel}
            onSubmit={(data) => handleAddProduct(data)}
          />
          <CustomModalAlert
            type="success"
            isOpen={isSuccess}
            title="Successful"
            description={successMessage || "User added successfully."}
            onClose={() => setIsSuccess(false)}
          />
          <CustomModalAlert
            type="warning"
            isOpen={!!errorMessage}
            title="Oops..!"
            description={errorMessage || "An error occurred during sign up."}
            onClose={() => {
              setErrorMessage(null);
              setOpenModal(false);
            }}
          />
          <CustomConfirmModal
            isOpen={openConfirmModal}
            onClose={() => setOpenConfirmModal(false)}
            confirmText="Delete"
            cancelText="Cancel"
            title="Are you sure?"
            message="Do you really want to delete this product?"
            onConfirm={handleConfirmDelete}
            onCancel={() => setOpenConfirmModal(false)}
          />
        </div>
      </div>
    </div>
  );
}
