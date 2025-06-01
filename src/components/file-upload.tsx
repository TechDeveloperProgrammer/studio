"use client";

import React, { useState, useCallback, type ChangeEvent } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, FileUp } from 'lucide-react';

interface FileUploadProps {
  onFileChange: (dataUri: string | string[]) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
  id?: string;
}

export function FileUpload({
  onFileChange,
  label = "Upload File(s)",
  accept = "audio/*,video/*,image/*,.txt,.json",
  multiple = false,
  id = "file-upload",
}: FileUploadProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleFileChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const selectedFiles = Array.from(event.target.files);
        setFiles(multiple ? prev => [...prev, ...selectedFiles] : selectedFiles);

        const dataUris: string[] = [];
        const newPreviews: string[] = [];

        for (const file of selectedFiles) {
          const reader = new FileReader();
          const promise = new Promise<string>((resolve, reject) => {
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
          });
          reader.readAsDataURL(file);
          try {
            const dataUri = await promise;
            dataUris.push(dataUri);
            if (file.type.startsWith("image/")) {
              newPreviews.push(dataUri);
            } else {
              newPreviews.push(file.name); // Show filename for non-image files
            }
          } catch (error) {
            console.error("Error reading file:", error);
            // Optionally notify user of error
          }
        }
        
        setPreviews(multiple ? prev => [...prev, ...newPreviews] : newPreviews);
        if (multiple) {
          onFileChange(dataUris); // Or accumulate if parent component handles accumulation
        } else {
          onFileChange(dataUris[0] || "");
        }
      }
    },
    [multiple, onFileChange]
  );

  const removeFile = (index: number) => {
    setFiles(currentFiles => currentFiles.filter((_, i) => i !== index));
    setPreviews(currentPreviews => currentPreviews.filter((_, i) => i !== index));
    // TODO: Notify parent about removal if necessary, especially for multiple files
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
      </Label>
      <div className="flex items-center gap-3">
        <Input
          id={id}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          className="hidden"
        />
        <Button type="button" variant="outline" onClick={() => document.getElementById(id)?.click()}>
          <FileUp className="mr-2 h-4 w-4" />
          Choose File{multiple ? "s" : ""}
        </Button>
      </div>
      {previews.length > 0 && (
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {previews.map((preview, index) => (
            <div key={index} className="relative group border rounded-md p-2 text-xs break-all">
              {files[index]?.type.startsWith("image/") ? (
                <img src={preview} alt={`Preview ${index + 1}`} className="h-20 w-20 object-cover rounded" />
              ) : (
                <div className="h-20 w-20 flex items-center justify-center bg-muted rounded">
                  <span className="truncate">{preview}</span>
                </div>
              )}
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeFile(index)}
              >
                <X className="h-3 w-3" />
                <span className="sr-only">Remove file</span>
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
