import { useState } from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/Dialog";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { ChevronDown, Upload, X } from "lucide-react";
import { databases, storage } from "../lib/appwrite";
import { ID } from "appwrite";

const BUCKET_ID = "67a6143a000885a20b12";

const CustomSelect = ({ value, onChange, options }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-4 py-3 bg-black/20 border border-[#c4e456]/20 text-white rounded-md focus:border-[#c4e456]/40 focus:ring-[#c4e456]/10 transition-all duration-200 hover:bg-black/30"
      >
        <span className="text-sm">
          {value
            ? options.find((opt) => opt.toLowerCase() === value)?.toLowerCase()
            : "Select a genre"}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-[#131315] border border-[#c4e456]/20 rounded-md shadow-lg overflow-hidden transition-all duration-200">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className="w-full px-4 py-3 text-left text-sm text-white hover:bg-[#c4e456]/10 focus:outline-none transition-colors duration-150"
              onClick={() => {
                onChange(option.toLowerCase());
                setIsOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const PodcastDialog = ({ onClose }) => {
  const [title, setName] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [user] = useState(JSON.parse(localStorage.getItem("userSession")));

  const genres = ["Horror", "Science Fiction", "Adventure", "Technology"];

  const thumbnails = {
    horror:
      "https://cloud.appwrite.io/v1/storage/buckets/67a6143a000885a20b12/files/67a7a08f003b04e83247/view?project=6794f3920032a8c1fc91&mode=admin",
    "science fiction":
      "https://cloud.appwrite.io/v1/storage/buckets/67a6143a000885a20b12/files/67a79fce00362ea4d6e4/view?project=6794f3920032a8c1fc91&mode=admin",
    adventure:
      "https://cloud.appwrite.io/v1/storage/buckets/67a6143a000885a20b12/files/67a7a153002c107f0285/view?project=6794f3920032a8c1fc91&mode=admin",
    technology:
      "https://cloud.appwrite.io/v1/storage/buckets/67a6143a000885a20b12/files/67a7a28c0028c4a9ea26/view?project=6794f3920032a8c1fc91&mode=admin",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("User is not logged in.");
      return;
    }
    const createrId = user.$id;
    const createrName = user.name;
    let thumbnailURL = "";
    try {
      if (uploadedImage) {
        const fileResponse = await storage.createFile(
          BUCKET_ID,
          ID.unique(),
          uploadedImage
        );
        thumbnailURL = storage.getFilePreview(BUCKET_ID, fileResponse.$id);
      } else if (genre) {
        thumbnailURL = thumbnails[genre.toLowerCase()] || "";
      }

      await databases.createDocument(
        import.meta.env.VITE_APPWRITE_DATABASE_ID,
        import.meta.env.VITE_APPWRITE_COLLECTION_ID_PODCASTS,
        ID.unique(),
        {
          createrId,
          createrName,
          title,
          description,
          genre,
          thumbnail: thumbnailURL,
        }
      );
      alert("Podcast created successfully!");
      setName("");
      setDescription("");
      setGenre("");
      setUploadedImage(null);
      setImagePreview("");
      if (onClose) onClose();
    } catch (error) {
      console.error("Error adding podcast:", error);
      alert("Failed to create podcast");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      setUploadedImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <DialogContent className="p-8 bg-[#131315] border border-[#c4e456]/20 rounded-lg shadow-md my-5 max-w-4xl mx-auto">
      <DialogHeader className="mb-8">
        <DialogTitle className="text-3xl font-bold text-[#c4e456] mb-2">
          Create New Podcast
        </DialogTitle>
        <DialogDescription className="text-base text-white/70">
          Fill in the details below to create your new podcast series.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Main Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-sm font-medium text-white">
                Podcast Name
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter podcast name"
                className="px-4 py-3 bg-black/20 border border-[#c4e456]/20 text-white placeholder:text-white/40 focus:border-[#c4e456]/40 focus:ring-[#c4e456]/10 transition-all duration-200"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-medium text-white"
              >
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter podcast description"
                className="min-h-32 px-4 py-3 bg-black/20 border border-[#c4e456]/20 text-white placeholder:text-white/40 focus:border-[#c4e456]/40 focus:ring-[#c4e456]/10 transition-all duration-200"
              />
            </div>
          </div>

          {/* Right Column - Thumbnail and Genre */}
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="genre" className="text-sm font-medium text-white">
                Genre
              </Label>
              <CustomSelect
                value={genre}
                onChange={setGenre}
                options={genres}
              />
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-white">
                Thumbnail Image
              </Label>
              <div
                className={`relative h-48 border-2 border-dashed rounded-lg overflow-hidden transition-all duration-200 ${
                  isDragging
                    ? "border-[#c4e456] bg-[#c4e456]/5"
                    : "border-[#c4e456]/20"
                }`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
              >
                {imagePreview || (genre && thumbnails[genre.toLowerCase()]) ? (
                  <div className="relative h-full group">
                    <img
                      src={imagePreview || thumbnails[genre.toLowerCase()]}
                      alt="Thumbnail"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                      <button
                        type="button"
                        onClick={() => {
                          setImagePreview("");
                          setUploadedImage(null);
                        }}
                        className="p-2 bg-red-500/80 rounded-full hover:bg-red-500 transition-colors duration-200"
                      >
                        <X className="w-5 h-5 text-white" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white/50 space-y-4">
                    <Upload className="w-8 h-8" />
                    <div className="text-center">
                      <p className="font-medium">
                        Drag and drop your thumbnail
                      </p>
                      <p className="text-sm">or click to browse</p>
                    </div>
                    <Input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setUploadedImage(file);
                        setImagePreview(URL.createObjectURL(file));
                      }}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-[#c4e456]/20">
          <Button
            type="submit"
            className="px-8 py-3 bg-[#c4e456] text-[#131315] hover:bg-[#c4e456]/80 transition-colors duration-300 rounded-md font-medium"
          >
            Create Podcast
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default PodcastDialog;
