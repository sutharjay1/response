"use client";

import DynamicForm from "@/features/projects/dynamic-form";
import React from "react";

// type Props = {
//   params: Promise<{
//     projectId: string;
//   }>;
// };

const IndividualProject = () => {
  // const { projectId } = React.use(params);
  // const { data: project, isLoading: loadingProjects } = useQuery({
  //   queryKey: ["project", projectId],
  //   queryFn: () => getProjectById(projectId as string),
  //   enabled: !!projectId,
  //   staleTime: 5 * 60 * 1000,
  //   cacheTime: 5 * 60 * 1000,
  // });

  return (
    // <div className="mx-auto max-w-4xl p-6">
    //   {loadingProjects ? (
    //     <div className="flex items-center justify-center">
    //       <div className="flex flex-col items-center gap-2">
    //         <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-gray-500"></div>
    //         <p className="text-sm text-gray-500">Loading project details...</p>
    //       </div>
    //     </div>
    //   ) : (
    //     <div className="rounded-lg bg-white p-6 shadow-lg">
    //       <h2 className="text-3xl font-bold text-gray-900">{project?.name}</h2>
    //       <p className="mt-2 text-sm text-gray-500">
    //         <strong>Project ID:</strong> {project?.id}
    //       </p>
    //       <div className="mt-4">
    //         <h3 className="text-xl font-semibold text-gray-800">Description</h3>
    //         <p className="mt-2 text-gray-700">
    //           {project?.description || "No description provided."}
    //         </p>
    //       </div>
    //       <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
    //         <div>
    //           <h4 className="text-lg font-medium text-gray-800">Created At</h4>
    //           <p className="text-gray-600">
    //             {project && new Date(project.createdAt).toLocaleDateString()}
    //           </p>
    //         </div>
    //         <div>
    //           <h4 className="text-lg font-medium text-gray-800">
    //             Last Updated
    //           </h4>
    //           <p className="text-gray-600">
    //             {project && new Date(project.updatedAt).toLocaleDateString()}
    //           </p>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <>
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col p-4">
          <h2 className="mb-4 text-2xl font-bold">Form Section</h2>
          <form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full rounded-md border border-gray-300 p-2 shadow-sm"
              />
            </div>
            <div>
              <button
                type="submit"
                className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
              >
                Submit
              </button>
            </div>
          </form>
        </div>

        <div className="flex flex-col rounded-xl bg-gray-100 p-4 shadow-lg">
          <h2 className="mb-4 text-2xl font-bold">Preview Section</h2>
          <div className="flex flex-1 items-center justify-center">
            <div className="w-full max-w-md rounded-md bg-white p-4 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold">Preview Content</h3>
              <p className="text-gray-700">
                This is a preview of the content you are working on.
              </p>
            </div>
          </div>
        </div>
      </div> */}
      {/* <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div> */}
      <DynamicForm />
    </>
  );
};

export default IndividualProject;
