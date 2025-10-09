"use client";

import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import ComponentSearch from "@/components/common/ComponentSearch";
import Button from "@/components/ui/button/Button";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
} from "@/store/category/categoryApi";
import { EditIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import CustomConfirmModal from "@/components/modals/CustomConfirmModal";
import AddCategoryModal from "./AddCategoryModal";
import { CategoryRequest } from "@/types/category";
import CustomModalAlert from "@/components/modals/CustomModalAlert";

export default function CategoryTable() {
  const { data: categories, isLoading, error } = useGetCategoriesQuery();
  const [query, setQuery] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [deleteCatId, setDeleteCatId] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const [deleCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();

  const handleEditCategory = (id: string) => {
    console.log("Category id:", id);
  };

  const openDeleteModal = (id: string) => {
    console.log("Category id:", id);
    setDeleteCatId(id);
    setOpenConfirmModal(true);
  };

  const handleConfirmDelete = () => {
    deleCategory(deleteCatId);
    setOpenConfirmModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  const handleAddCategory = async (category: CategoryRequest) => {
    try {
      const { name } = category;
      const { data, status } = await createCategory(category).unwrap();
      setSuccessMessage(status);
      setIsSuccess(true);
    } catch (error) {
      const { data } = error as any;
      setErrorMessage(data?.message || "Failed to add product");
      setOpenModal(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading Categories</div>;

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Category Management
        </h3>
        <div>
          <Button
            size="sm"
            type="button"
            variant="outline"
            startIcon={<PlusIcon className="h-4 w-4" />}
            onClick={() => {
              setOpenModal(true);
              setIsEdit(false);
            }}
          >
            Add Category
          </Button>
        </div>
      </div>
      <div className="flex md:grid-cols-4 md:gap-3 lg:gap-3 py-2 md:justify-start sm:flex-row sm:items-center">
        <div>
          <ComponentSearch
            placeholder="Search Category.."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 dark:border-gray-800 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-end text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-gray-800">
              {categories?.data && categories.data.length > 0 ? (
                categories.data.map((category) => (
                  <TableRow key={category._id} className="">
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      {category.name}
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                      <div className="flex items-center gap-3 justify-end">
                        <button className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
                          <EditIcon
                            className="inline h-4 w-4 stroke-[2.5]"
                            onClick={() => handleEditCategory(category._id)}
                          />
                        </button>
                        <button
                          className="text-error-500 hover:text-error-600 dark:text-error-400"
                          onClick={() => openDeleteModal(category._id)}
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
                        Category empty..
                      </h3>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <AddCategoryModal
        isOpen={openModal}
        isEdit={isEdit}
        onClose={handleCancel}
        category={categories ?? { status: "", data: [] }}
        handleSubmit={(data) => handleAddCategory(data)}
      />
      <CustomModalAlert
        type="success"
        isOpen={isSuccess}
        title="Successful"
        description={successMessage || "User added successfully."}
        onClose={() => setIsSuccess(false)}
      />
      <CustomConfirmModal
        isOpen={openConfirmModal}
        onClose={() => setOpenConfirmModal(false)}
        confirmText="Delete"
        cancelText="Cancel"
        title="Are you sure?"
        message="Do you really want to delete this Category?"
        onConfirm={handleConfirmDelete}
        onCancel={() => setOpenConfirmModal(false)}
      />
    </div>
  );
}
