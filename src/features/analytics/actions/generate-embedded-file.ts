"use server";
import { db } from "@/db";
import fs from "fs/promises";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const generateEmbeddedFile = async (projectId: string) => {
  try {
    const result = await db.result.findMany({
      where: {
        projectId,
      },
      select: {
        id: true,
        value: true,
        isFavorite: true,
      },
    });

    const script = `
    (function() {
      // Tailwind CSS CDN
      const tailwindScript = document.createElement('script');
      tailwindScript.src = 'https://cdn.tailwindcss.com';
      document.head.appendChild(tailwindScript);
    
      // Results data
      const results = ${JSON.stringify(result)};
    
      // Render function
      function renderResults(data) {
        // Create main container
        const container = document.createElement('div');
        container.className = 'max-w-6xl mx-auto px-4 py-8';
    
        // Create wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'bg-gray-50 rounded-xl shadow-lg p-6';
    
        // Title section
        const titleSection = document.createElement('div');
        titleSection.className = 'mb-8 text-center';
        titleSection.innerHTML = \`
          <h1 class="text-3xl font-bold text-indigo-700 mb-4">Project Results</h1>
          <p class="text-gray-600">Showing \${data.length} results</p>
        \`;
        wrapper.appendChild(titleSection);
    
        // Results grid
        const resultsGrid = document.createElement('div');
        resultsGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    
        // Filter and limit favorite data
        const favoriteData = data.filter(item => item.isFavorite).slice(0, 20);
    
        if (favoriteData.length === 0) {
          const noResultsMessage = document.createElement('div');
          noResultsMessage.className = 'col-span-full text-center py-12';
          noResultsMessage.innerHTML = \`
            <div class="bg-yellow-100 text-yellow-800 p-6 rounded-lg inline-block">
              <svg class="w-12 h-12 mx-auto mb-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
              </svg>
              <p class="text-xl font-semibold">No favorite results found</p>
            </div>
          \`;
          wrapper.appendChild(noResultsMessage);
        } else {
          favoriteData.forEach((item) => {
            const resultCard = document.createElement('div');
            resultCard.className = \`
              bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 
              transform hover:-translate-y-2 border border-gray-100
            \`;
            
            resultCard.innerHTML = \`
              <div class="p-6">
                <div class="flex justify-between items-start mb-4">
                  <div class="flex-grow pr-4">
                    <h3 class="text-xl font-semibold text-indigo-700 mb-2">\${item.value || 'Unnamed Result'}</h3>
                    <div class="text-sm text-gray-500">
                      Task ID: <span class="font-mono bg-gray-100 px-2 py-1 rounded">\${item.id}</span>
                    </div>
                  </div>
                  <span class="
                    px-3 py-1 rounded-full text-xs font-bold 
                    \${item.isFavorite ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                  ">
                    \${item.isFavorite ? 'Completed' : 'Pending'}
                  </span>
                </div>
              </div>
            \`;
            
            resultsGrid.appendChild(resultCard);
          });
          
          wrapper.appendChild(resultsGrid);
        }
    
        // Footer section
        const footerSection = document.createElement('div');
        footerSection.className = 'text-center text-gray-500 mt-8 text-sm';
        footerSection.innerHTML = \`
          <p>Total Results: \${data.length}</p>
          <p>Generated on \${new Date().toLocaleString()}</p>
        \`;
        wrapper.appendChild(footerSection);
    
        // Append everything to the body
        container.appendChild(wrapper);
        document.body.innerHTML = '';
        document.body.appendChild(container);
      }
    
      // Ensure Tailwind is loaded before rendering
      tailwindScript.onload = () => {
        renderResults(results);
      };
    })();
    `;

    const filename = `results-${projectId}.js`;
    const filePath = `./public/${filename}`;
    await fs.writeFile(filePath, script);

    const tempFilePath = `/tmp/${filename}`;
    await fs.writeFile(tempFilePath, script);

    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        tempFilePath,
        {
          resource_type: "raw",
          folder: "response",
          public_id: `response_${projectId}`,
          overwrite: true,
          use_filename: true,
          unique_filename: false,
        },
        async (error, result) => {
          if (error) reject(error);
          else resolve(result);

          if (result) {
            await db.project.update({
              where: {
                id: projectId,
              },
              data: {
                scriptFile: result.secure_url,
              },
            });
          }
        },
      );
    });

    await fs.unlink(tempFilePath);
    await fs.rm(filePath);

    console.log("Cloudinary upload response:", cloudinaryResponse);

    return cloudinaryResponse;
  } catch (error) {
    console.error("Error generating embedded file:", error);
    throw new Error(`Failed to generate embedded file: ${error}`);
  }
};
