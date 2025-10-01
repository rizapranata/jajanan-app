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
import { useGetProductsQuery } from "@/store/product/productApi";
import Pagination from "@/components/tables/Pagination";
import Badge from "@/components/ui/badge/Badge";
import { EditIcon, TrashIcon, PlusIcon } from "lucide-react";
import CustomConfirmModal from "@/components/modals/CustomConfirmModal";
import ComponentSearch from "@/components/common/ComponentSearch";

export default function ProductTable() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const limit = 10;
  const {
    data: products,
    isLoading,
    error,
  } = useGetProductsQuery({
    limit,
    skip: (page - 1) * limit,
    q: query,
    category: "",
    tags: [],
  });
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const totalPages = products ? Math.ceil(products?.count / limit) : 1;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;

  const handleEditProduct = (productId: string) => {};

  const openDeleteModal = (productId: string) => {
    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    setOpenConfirmModal(false);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
      <div className="flex flex-col md:justify-start mb-4 gap-5 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Products Management
        </h3>
        <ComponentSearch
          placeholder="Search product.."
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
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
            {products?.data.map((product) => (
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
                          {product.price}
                        </span>
                      </div>
                      {/* <div>
                        <p className=" text-gray-500 text-theme-sm dark:text-gray-500/90">
                          Tags
                        </p>
                        <Badge size="sm" color="success">
                          {product.tags.map((tag) => tag.name)}
                        </Badge>
                      </div> */}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.category.name}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  {product.price}
                </TableCell>
                <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                  <Badge size="sm" color="success">
                    {product.tags.map((tag) => tag.name)}
                  </Badge>
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
            ))}
          </TableBody>
        </Table>
        <div className="flex justify-end pt-4">
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
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
  );
}
