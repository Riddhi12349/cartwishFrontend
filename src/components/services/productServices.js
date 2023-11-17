import apiClient from "../utils/api-client";

export default function getSuggestionsAPT(search) {
  return apiClient.get(`/products/suggestions?search=${search}`);
}
