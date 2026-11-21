import { Upload } from "lucide-react";

export default function AdminImageUpload({ imageFile, imageInput, onChange }) {
  return (
    <span className="
      flex min-h-14 w-full cursor-pointer items-center justify-center gap-2
      rounded-[10px] border-2 border-dashed border-[#4f7cf7] bg-[#f5f8ff]
      px-3 py-3 text-center text-[#3865d6] hover:bg-[#eaf0ff]
      focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-[#4f7cf7]
    ">
      <input
        className="sr-only"
        ref={imageInput}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={onChange}
      />
      <Upload size={17} className="shrink-0" aria-hidden="true" />
      <span className="min-w-0 break-all">
        {imageFile ? `Đổi ảnh: ${imageFile.name}` : "Tải ảnh lên (JPEG, PNG hoặc WebP; tối đa 5 MB.)"}
      </span>
    </span>
  );
}
