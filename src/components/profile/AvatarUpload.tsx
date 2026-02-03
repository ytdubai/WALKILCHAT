import { useCallback } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';

interface AvatarUploadProps {
  currentImage?: string;
  onChange: (file: string) => void;
}

export function AvatarUpload({ currentImage, onChange }: AvatarUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            onChange(e.target.result as string);
          }
        };
        reader.readAsDataURL(file);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp'],
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="relative w-32 h-32 mx-auto cursor-pointer group"
    >
      <input {...getInputProps()} />
      <div
        className={`w-full h-full rounded-full overflow-hidden border-4 ${
          isDragActive ? 'border-purple-500' : 'border-gray-700'
        }`}
      >
        {currentImage ? (
          <Image
            src={currentImage}
            alt="Avatar"
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-700 flex items-center justify-center text-gray-400 text-4xl">
            👤
          </div>
        )}
      </div>
      <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-white text-sm font-medium">Change Photo</span>
      </div>
    </div>
  );
}