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

/* ================= GET ALL PUBLIC PRODUCTS ================= */
export const updateProductAPI = async () => {
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

/* ================= GET SINGLE PRODUCT ================= */
export const getSingleProductAPI = async (id) => {
  try {
    const response = await axiosInstance.get(`/api/product/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
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
