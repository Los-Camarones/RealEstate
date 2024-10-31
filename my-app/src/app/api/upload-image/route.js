import { uploadImageAndUpdateURL } from "@/actions/ImageManagementActions";
import formidable from "formidable";
import fs from "fs/promises"; // Use fs/promises for better async handling

// Disable automatic body parsing by Next.js for this route
export const config = {
  api: {
    bodyParser: false,
  },
};

// Utility function to parse form data with formidable
const parseForm = (req) => {
  const form = new formidable.IncomingForm();
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

// Define the POST handler
export async function POST(req, res) {
  try {
    const { fields, files } = await parseForm(req);
    const { section, page } = fields;
    const file = files.file;

    if (!file) {
      res.status(400).json({ success: false, error: "No file provided" });
      return;
    }

    // Define file path in the storage bucket
    const filePath = `${page}/${section}/${file.originalFilename}`;

    // Read file content
    const fileContent = await fs.readFile(file.filepath);

    // Call uploadImageAndUpdateURL with the file content
    const response = await uploadImageAndUpdateURL(filePath, section, page, fileContent);

    if (response.success) {
      res.status(200).json({ success: true });
    } else {
      res.status(500).json({ success: false, error: response.error });
    }
  } catch (error) {
    console.error("Unexpected error during file upload:", error);
    res.status(500).json({ success: false, error: "An unexpected error occurred during upload." });
  }
}
