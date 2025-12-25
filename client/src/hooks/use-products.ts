import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useProducts(params?: { categoryId?: number; featured?: boolean; search?: string }) {
  return useQuery({
    queryKey: [api.products.list.path, params],
    queryFn: async () => {
      // Build query string manually since input is optional
      const queryParams = new URLSearchParams();
      if (params?.categoryId) queryParams.append('categoryId', String(params.categoryId));
      if (params?.featured) queryParams.append('featured', String(params.featured));
      if (params?.search) queryParams.append('search', params.search);

      const url = `${api.products.list.path}?${queryParams.toString()}`;
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      return api.products.get.responses[200].parse(await res.json());
    },
  });
}

export function useCategories() {
  return useQuery({
    queryKey: [api.categories.list.path],
    queryFn: async () => {
      const res = await fetch(api.categories.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch categories");
      return api.categories.list.responses[200].parse(await res.json());
    },
  });
}
