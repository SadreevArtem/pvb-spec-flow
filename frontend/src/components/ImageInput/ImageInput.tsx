import { AlertColor, Box, Input, InputProps } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import React, {
  ChangeEvent,
  forwardRef,
  useEffect,
  useState,
  useId,
} from "react";
import { Text } from "../Text";
import { AppIcon } from "../AppIcon";
import Image from "next/image";
import { FilesModel } from "../../../shared/types";

type Props = {
  onChange: (file?: File | null) => void;
  addAlert: (severity: AlertColor, message: string) => void;
  onDelete?: () => void;
  onUpdate: (image: Partial<FilesModel>) => void;
  value?: Partial<FilesModel> | null;
  withPreview?: boolean;
  disabled?: boolean;
  url?: string;
} & Omit<InputProps, "onChange">;

export const ImageInput = forwardRef<HTMLDivElement, Props>(
  (
    {
      onChange,
      disabled = false,
      withPreview = true,
      url = "",
      onDelete,
      value,
      addAlert,
      ...other
    },
    ref
  ) => {
    const [selectedImage, setSelectedImage] = useState<File | null>();

    const [imageUrl, setImageUrl] = useState(url);

    const id = useId();

    useEffect(() => {
      if (selectedImage) {
        setImageUrl(URL.createObjectURL(selectedImage));
        return;
      }
      setImageUrl("");
    }, [selectedImage]);

    const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
      const allowedExtensions =
        /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.webp|\.svg)$/i;

      const filePath = e.target.value;

      if (!allowedExtensions.exec(filePath)) {
        addAlert("error", "Invalid file type");
        return;
      }

      onChange?.(e.target.files?.[0]);
      setSelectedImage(e.target.files?.[0]);
    };

    const handleDeleteImage = () => {
      onDelete?.();
      setSelectedImage(null);
    };

    const isImagePreview = url || (withPreview && imageUrl && selectedImage);

    if (disabled) {
      const hasImage = !!(imageUrl || url);
      return (
        <div className="w-full flex justify-center my-3 h-[200px]">
          {!hasImage && <div className={"text-gray-400"}>Отсутствует</div>}
          {hasImage && (
            <Image
              src={imageUrl || url}
              alt={value?.filename || ""}
              width={100}
              height={100}
              className="object-contain w-full h-full"
            />
          )}
        </div>
      );
    }
    return (
      <Box ref={ref} className="w-[40%] mt-4 p-2">
        {!isImagePreview && (
          <Box className=" hover:bg-gray-200 text-center border border-dashed p-2 relative cursor-pointer">
            <Input
              inputProps={{
                accept: "image/*",
                className:
                  "block absolute top-0 left-0 right-0 bottom-0 w-full !h-full opacity-1 z-2 p-0",
              }}
              className="!absolute w-full !h-[164px] opacity-0 top-0 left-0 right-0 bottom-0"
              type="file"
              id={id}
              onChange={handleImage}
              {...other}
            />
            <label
              htmlFor={id}
              className="w-full flex flex-col items-center cursor-pointer p-9"
            >
              {/* <Icon className='w-[71px] h-[71px]' component={<AppIcon type="close"/>} /> */}
              <AppIcon type="close" />
              <Text className="pt-5 lg:w-[220px] text-center font-medium text-base">
                Upload or drop image
              </Text>
            </label>
          </Box>
        )}
        {isImagePreview && (
          <Box className="relative lg:w-[360px] text-red-700 p-6">
            <CancelIcon
              onClick={handleDeleteImage}
              onKeyPress={handleDeleteImage}
              tabIndex={0}
              className="absolute right-0 top-0 cursor-pointer"
            />
            <Image
              width={200}
              height={200}
              src={imageUrl || url}
              alt={value?.filename || ""}
              className="object-cover w-full h-full"
            />
          </Box>
        )}
      </Box>
    );
  }
);

ImageInput.displayName = "ImageInput";
