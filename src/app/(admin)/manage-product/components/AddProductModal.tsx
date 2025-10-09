import FileInput from "@/components/form/input/FileInput";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import MultiSelect from "@/components/form/MultiSelect";
import Select from "@/components/form/Select";
import Button from "@/components/ui/button/Button";
import { Modal } from "@/components/ui/modal";
import {
  CategoryResponse,
  ProductRequest,
  ProductDetailResponse,
  TagResponse,
} from "@/types/product";
import { formatPercent, formatRupiahTyping } from "@/utils/globalFunction";
import { ChangeEvent, useEffect, useMemo, useState } from "react";

interface AddProductProps {
  isOpen: boolean;
  isEdit: boolean;
  tags: TagResponse;
  categories: CategoryResponse;
  product?: ProductDetailResponse;
  onClose: () => void;
  onSubmit: (data: ProductRequest) => void;
}

export default function AddProductModal({
  isOpen,
  isEdit,
  tags,
  categories,
  product,
  onClose,
  onSubmit,
}: AddProductProps) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [file, setFile] = useState<File | null>(null);
  const [discount, setDiscount] = useState<number>(0);
  const [category, setCategory] = useState<string>("");
  const [imageUpdate, setImageUpdate] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [displayValue, setDisplayValue] = useState<string>("");
  const [isDiscountValid, setIsDiscountValid] = useState<boolean>(false);

  useEffect(() => {
    if (product && isEdit) {
      const { price, name, tags, image_url, discount, category } = product.data;
      const tagsEdit = initTagsEdit(tags);

      setName(name);
      setPrice(price);
      setSelectedTags(tagsEdit);
      setImageUpdate(image_url);
      setCategory(category);
      setDiscount(discount);
    } else {
      resetForm();
    }
  }, [product, isEdit, isOpen, tags.data]);

  function initTagsEdit(tagIds: string[]): string[] {
    if (!Array.isArray(tags.data) || tags.data.length === 0) return [];
    const dataTags = tags.data.filter((data) => tagIds.includes(data._id));
    return dataTags.map((data) => data.name);
  }

  const isFormValid = useMemo(() => {
    return (
      price !== 0 &&
      name.trim() !== "" &&
      category.trim() !== "" &&
      selectedTags.length > 0 &&
      checkPersent(discount) !== true &&
      (isEdit ? true : file !== undefined)
    );
  }, [price, name, category, discount, selectedTags, isEdit]);

  if (!isOpen) return null;

  const onChangeFileHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFile(null);
    if (e.target.files && e.target.files.length > 0) {
      const imageFile: File = e.target.files[0];
      setFile(imageFile);
    }
  };

  const handleChangePrice = (e: ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const numericString = rawInput.replace(/\D/g, ""); // ambil angka saja
    const number = parseInt(numericString, 10) || 0;

    setPrice(number); // angka mentah (200000)
    setDisplayValue(formatRupiahTyping(rawInput)); // format rupiah untuk input
  };

  const handleChangeDiscount = (e: ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value;
    const number = parseInt(rawInput, 10) || 0;

    setDiscount(number);
    setIsDiscountValid(checkPersent(number));
  };

  function checkPersent(num: number): boolean {
    return num > 100 || num < 0;
  }

  function resetForm() {
    setPrice(0);
    setName("");
    setFile(null);
    setDiscount(0);
    setCategory("");
    setImageUpdate("");
    setSelectedTags([]);
    setDisplayValue("");
    setIsDiscountValid(false);
  }

  const tagsData = tags?.data.map((tag) => ({
    value: tag.name,
    text: tag.name,
    selected: false,
  }));

  const categoryData = categories.data.map((cat) => ({
    value: cat._id,
    label: cat.name,
  }));

  const handleSubmit = () => {
    onSubmit({
      name,
      price,
      category,
      tags: selectedTags,
      discount,
      image_url: file,
    });
    resetForm();
    onClose();
  };

  const handleSelectChange = (value: string) => {
    setCategory(value);
  };

  const handleSelectTags = (value: string[]) => {
    setSelectedTags(value);
  };

  const handleCancelButton = () => {
    resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {}}
      className="max-w-1/2 p-5 lg:p-10"
      showCloseButton={false}
    >
      <form className="">
        <h4 className="mb-6 text-lg font-medium text-gray-800 dark:text-white/90">
          {isEdit ? "Edit Product" : "Add Product"}
        </h4>

        <div className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2">
          <div className="col-span-1">
            <Label>Name</Label>
            <Input
              type="text"
              placeholder="popcorn"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-span-1">
            <Label>Price</Label>
            <Input
              type="text"
              placeholder="Rp. 2000"
              value={displayValue}
              onChange={handleChangePrice}
            />
          </div>

          <div className="col-span-1">
            <Label>
              Category<span className="text-error-500">*</span>
            </Label>
            <Select
              className="mt-1 block w-full rounded-md border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
              options={categoryData}
              initValue={category}
              defaultValue={category}
              onChange={handleSelectChange}
            />
          </div>

          <div className="col-span-1 ">
            <Label>Tags</Label>
            <MultiSelect
              label={""}
              options={tagsData ?? []}
              defaultSelected={selectedTags}
              onChange={handleSelectTags}
            />
          </div>

          <div className="col-span-1">
            <Label>Image</Label>
            <FileInput
              // value={imageUpdate}
              onChange={onChangeFileHandler}
            />
          </div>

          <div className="col-span-1 ">
            <Label>Discount %</Label>
            <Input
              type="text"
              placeholder="20%"
              error={isDiscountValid}
              value={discount.toString()}
              hint="Discount not greather than 100 and less than 0"
              onChange={handleChangeDiscount}
            />
          </div>

          {imageUpdate && (
            <div className="col-span-1">
              <p>Preview:</p>
              <img
                src={`${baseUrl}/uploads/${imageUpdate}`}
                alt="preview"
                className="w-40 h-40 object-cover rounded"
              />
            </div>
          )}

          {file && (
            <div className="col-span-1">
              <p>Preview:</p>
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="w-40 h-40 object-cover rounded"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-end w-full gap-3 mt-6">
          <Button size="sm" variant="outline" onClick={handleCancelButton}>
            Close
          </Button>
          <Button size="sm" disabled={!isFormValid} onClick={handleSubmit}>
            {isEdit ? "Update Product" : "Save Product"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
