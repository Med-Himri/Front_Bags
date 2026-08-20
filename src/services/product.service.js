// import axiosInstance from "../utils/axiosInstance";

// export const createBlogAPI = async (data) => {
//   if (typeof window === "undefined") return;
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) {
//     throw new Error("User is not logged in");
//   }

//   const {
//     postTitle,
//     slug,
//     category,
//     tags,
//     metaTitle,
//     metaDescription,
//     featuredImageAlt,
//     content,
//     featuredImage,
//     galleryItems,
//   } = data;

//   try {
//     const formData = new FormData();
//     formData.append("postTitle", postTitle);
//     formData.append("slug", slug);
//     formData.append("category", category);
//     formData.append("tags", tags);
//     formData.append("metaTitle", metaTitle);
//     formData.append("metaDescription", metaDescription);
//     formData.append("featuredImageAlt", featuredImageAlt);
//     formData.append("content", content);
//     formData.append("featuredImage", featuredImage);

//     if (galleryItems && galleryItems.length > 0) {
//       const galleryMeta = [];

//       galleryItems.forEach((item) => {
//         formData.append("galleryImages", item.file);

//         galleryMeta.push({
//           alt: item.alt,
//           index: item.index ? parseInt(item.index, 10) : null,
//         });
//       });
//       formData.append("galleryMeta", JSON.stringify(galleryMeta));
//     }

//     const response = await axiosInstance.post("/api/blog/AddBlog", formData, {
//       headers: {
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     return response;
//   } catch (error) {
//     console.error("Error during blog creation:", error);
//     throw error;
//   }
// };

// export const createAIProductAPI = async (data) => {
//   if (typeof window === "undefined") return;
//   const accessToken = localStorage.getItem("accessToken");
//   if (!accessToken) {
//     throw new Error("User is not logged in");
//   }

//   // Hna bedelna l-variables bash imchiw m3a l-form dyal l-product
//   const {
//     productName,
//     price,
//     discountPrice,
//     mainImage,
//     galleryItems,
//   } = data;

//   try {
//     const formData = new FormData();
//     formData.append("productName", productName);
//     formData.append("price", price);
    
//     // Nsifto discountPrice ghir ila kan m3mer
//     if (discountPrice) {
//       formData.append("discountPrice", discountPrice);
//     }
    
//     // T2ked bli dima kayna image 7it drnaha required f l-front
//     if (mainImage) {
//       formData.append("mainImage", mainImage);
//     }

//     if (galleryItems && galleryItems.length > 0) {
//       const galleryMeta = [];

//       galleryItems.forEach((item) => {
//         formData.append("galleryImages", item.file);

//         galleryMeta.push({
//           alt: item.alt || "",
//           index: item.index ? parseInt(item.index, 10) : null,
//         });
//       });
//       formData.append("galleryMeta", JSON.stringify(galleryMeta));
//     }

//     // ⚠️ Endpoint jdid dyal AI Product (T2ked bli howa hada li 3ndk f l-backend)
//     const response = await axiosInstance.post("/api/product/createaiproduct", formData, {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization: `Bearer ${accessToken}`,
//       },
//     });

//     return response;
//   } catch (error) {
//     console.error("Error during AI product creation:", error);
//     throw error;
//   }
// };
import axiosInstance from "../utils/axiosInstance";

export const createBlogAPI = async (data) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  const {
    postTitle,
    slug,
    category,
    tags,
    metaTitle,
    metaDescription,
    featuredImageAlt,
    content,
    featuredImage,
    galleryItems,
  } = data;

  try {
    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("slug", slug);
    formData.append("category", category);
    formData.append("tags", tags);
    formData.append("metaTitle", metaTitle);
    formData.append("metaDescription", metaDescription);
    formData.append("featuredImageAlt", featuredImageAlt);
    formData.append("content", content);
    formData.append("featuredImage", featuredImage);

    if (galleryItems && galleryItems.length > 0) {
      const galleryMeta = [];

      galleryItems.forEach((item) => {
        formData.append("galleryImages", item.file);

        galleryMeta.push({
          alt: item.alt,
          index: item.index ? parseInt(item.index, 10) : null,
        });
      });
      formData.append("galleryMeta", JSON.stringify(galleryMeta));
    }

    const response = await axiosInstance.post("/api/blog/AddBlog", formData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error during blog creation:", error);
    throw error;
  }
};

export const createAIProductAPI = async (data) => {
  if (typeof window === "undefined") return;
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    throw new Error("User is not logged in");
  }

  const {
    productName,
    price,
    discountPrice,
    mainImage,
    galleryItems,
    variants, // [{ color, size, stock }] — entered manually in the form, not AI-generated
  } = data;

  try {
    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", price);

    if (discountPrice) {
      formData.append("discountPrice", discountPrice);
    }

    if (mainImage) {
      formData.append("mainImage", mainImage);
    }

    if (variants && variants.length > 0) {
      formData.append("variants", JSON.stringify(variants));
    }

    if (galleryItems && galleryItems.length > 0) {
      const galleryMeta = [];

      galleryItems.forEach((item) => {
        formData.append("galleryImages", item.file);

        galleryMeta.push({
          alt: item.alt || "",
          index: item.index ? parseInt(item.index, 10) : null,
        });
      });
      formData.append("galleryMeta", JSON.stringify(galleryMeta));
    }

    const response = await axiosInstance.post("/api/product/createaiproduct", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    console.error("Error during AI product creation:", error);
    throw error;
  }
};