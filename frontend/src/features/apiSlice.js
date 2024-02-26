import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL, UPLOAD_URL, AI_URL } from "../constants";

// Define a service using a base URL and expected endpoints
export const openaiApi = createApi({
  reducerPath: "openaiAPI",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
  endpoints: (builder) => ({
    getModelResponse: builder.mutation({
      query: ({ input, restrictions, image }) => ({
        url: AI_URL,
        method: "POST",
        body: { input, restrictions, image },
      }),
    }),

    uploadFoodImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetModelResponseMutation, useUploadFoodImageMutation } =
  openaiApi;
