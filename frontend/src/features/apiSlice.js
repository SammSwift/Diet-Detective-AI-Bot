import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const openaiApi = createApi({
  reducerPath: "openaiAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    getModelResponse: builder.mutation({
      query: ({ input, restrictions, image }) => ({
        url: `/api/ai-bot`,
        method: "POST",
        body: { input, restrictions, image },
      }),
    }),

    uploadFoodImage: builder.mutation({
      query: (data) => ({
        url: "/api/upload",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetModelResponseMutation, useUploadFoodImageMutation } =
  openaiApi;
