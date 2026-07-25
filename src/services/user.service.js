import axiosInstance from "../utils/axiosInstance";

export const StaffregisterAPI = async (fullName, phone, email, password) => {
  if (typeof window === "undefined") return;
  try {
    const response = await axiosInstance.post("/api/user/register", {
      fullName,
      phone,
      email,
      password,
    });
    return response;
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
};

export const userLoginAPI = async (email, password) => {
  try {
    const response = await axiosInstance.post("/api/user/login", {
      email: email,
      password: password,
    });
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

/* ================= GET ALL PUBLIC PRODUCTS ================= */
export const getAllProductsAPI = async () => {
  try {
    const response = await axiosInstance.get("/api/product/getallproducts");
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/* ================= GET PRODUCTS (ADMIN / USER) ================= */
export const getProductsAPI = async () => {
  const accessToken = localStorage.getItem("accessToken");

  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.get("/api/product/getproducts", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

/* ================= GET SINGLE PRODUCT (PUBLIC — by slug, accepted only) ================= */
export const getSingleProductAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/product/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
};

/* ================= GET PRODUCT BY ID (ADMIN — ignores accepted status) ================= */
// Used by the edit-product CMS screen, which needs to load a product
// regardless of whether it's been approved yet.
export const getProductByIdAPI = async (id) => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.get(`/api/product/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error fetching product by id:", error);
    throw error;
  }
};

/* ================= CREATE PRODUCT ================= */
export const createProductAPI = async (data) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  const {
    title,
    slug,
    price,
    discountPrice,
    category,
    tags,
    shortDescription,
    metaTitle,
    metaDescription,
    description,
    mainImage,
    gallery,
  } = data;

  try {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("slug", slug);
    formData.append("price", price);
    formData.append("discountPrice", discountPrice);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("shortDescription", shortDescription);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("description", description);
    formData.append("mainImage", mainImage);

    gallery.forEach((img) => {
      formData.append("gallery", img);
    });

    const response = await axiosInstance.post(
      "/api/product/addproduct",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

/* ================= UPDATE PRODUCT ================= */
// Was previously a broken stub that just re-fetched all products and never
// sent anything. This actually sends the edited fields (+ optional new
// images) to the backend, following the same id-in-body + FormData pattern
// as createProductAPI/acceptProductAPI/rejectProductAPI above.
export const updateProductAPI = async (id, data) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  const {
    title,
    slug,
    price,
    discountPrice,
    category,
    tags,
    shortDescription,
    metaTitle,
    metaDescription,
    description,
    variants,
    mainImage, // File | null — only sent if the user picked a new one
    newGallery, // File[] — newly added gallery images, if any
  } = data;

  try {
    const formData = new FormData();

    formData.append("id", id);
    formData.append("title", title || "");
    formData.append("slug", slug || "");
    formData.append("price", price || "");
    formData.append("discountPrice", discountPrice || "");
    formData.append("category", category || "");
    formData.append(
      "tags",
      Array.isArray(tags) ? tags.join(",") : tags || ""
    );
    formData.append("shortDescription", shortDescription || "");
    formData.append("metaTitle", metaTitle || "");
    formData.append("metaDescription", metaDescription || "");
    formData.append("description", description || "");

    if (variants) {
      formData.append(
        "variants",
        typeof variants === "string" ? variants : JSON.stringify(variants)
      );
    }

    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    if (newGallery && newGallery.length > 0) {
      newGallery.forEach((img) => formData.append("gallery", img));
    }

    const response = await axiosInstance.post(
      "/api/product/updateproduct",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

/* ================= REJECT PRODUCT ================= */
export const rejectProductAPI = async (id) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.post(
      "/api/product/delete",
      { id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error rejecting product:", error);
    throw error;
  }
};

/* ================= ACCEPT PRODUCT ================= */
export const acceptProductAPI = async (id) => {
  if (typeof window === "undefined") return;

  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  try {
    const response = await axiosInstance.post(
      "/api/product/acceptproduct",
      { id },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error accepting product:", error);
    throw error;
  }
};