import { GetPostsParams } from "@/app/(main)/page";

export function postQueryBuilder(paramsInput: GetPostsParams) {
  const params = new URLSearchParams();

  if (paramsInput.search?.trim()) {
    params.set("search", paramsInput.search);
  }

  if (paramsInput.sortBy) {
    params.set("sortBy", paramsInput.sortBy);
  }

  if (paramsInput.order) {
    params.set("order", paramsInput.order);
  }

  if (paramsInput.category) {
    params.set("category", paramsInput.category);
  }

  return params.toString();
}
