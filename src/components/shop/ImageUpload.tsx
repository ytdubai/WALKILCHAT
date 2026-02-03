import { useCallback, useState } from 'react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({
  images,
  onChange,
  maxImages = 5,
}: ImageUploadProps) {
  const [error, setError] = useState('');

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      setError('');
      
      if (images.length + acceptedFiles.length > maxImages) {
        setError(`Maximum ${maxImages} images allowed`);
        return;
      }

      // Convert files to data URLs
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target?.result) {
            onChange([...images, e.target.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    },
    [images, maxImages, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const newImages = Array.from(images);
    const [reorderedItem] = newImages.splice(result.source.index, 1);
    newImages.splice(result.destination.index, 0, reorderedItem);

    onChange(newImages);
  };

  const removeImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    onChange(newImages);
  };

  return (
    <div className="space-y-4">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="images" direction="horizontal">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="flex gap-4 overflow-x-auto pb-4"
            >
              {images.map((image, index) => (
                <Draggable
                  key={image}
                  draggableId={image}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="relative w-24 h-24 flex-shrink-0"
                    >
                      <Image
                        src={image}
                        alt={`Product image ${index + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center hover:bg-red-600"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {images.length < maxImages && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-purple-500 bg-purple-500/10'
              : 'border-gray-700 hover:border-purple-500'
          }`}
        >
          <input {...getInputProps()} />
          <div className="text-4xl mb-4">📸</div>
          <p className="text-white font-medium mb-1">
            {isDragActive ? 'Drop images here' : 'Add Product Images'}
          </p>
          <p className="text-gray-400 text-sm">
            Drag & drop or click to select. Maximum {maxImages} images.
          </p>
        </div>
      )}

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
}