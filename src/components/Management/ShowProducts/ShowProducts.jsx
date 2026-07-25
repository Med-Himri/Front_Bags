"use client";

import {
  acceptProductAPI,
  getProductsAPI,
  rejectProductAPI,
} from "@/services/user.service";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";
import EditProductCMS from "./EditProductCMS";
import {
  Edit3,
  CheckCircle2,
  Trash2,
  Loader2,
  PackageCheck,
  AlertCircle,
} from "lucide-react";

const ShowProductRequests = () => {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingProductId, setEditingProductId] = useState(null);
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const getAllProductRequests = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getProductsAPI();
      setProductData(response.data || []);
    } catch (err) {
      console.error("Error fetching atelier items:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getAllProductRequests();
  }, [getAllProductRequests]);

  const handleAccept = async (id) => {
    setActionLoadingId(id);
    try {
      await acceptProductAPI(id);
      await getAllProductRequests();
    } catch (err) {
      console.error("Error accepting product:", err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id) => {
    setActionLoadingId(id);
    try {
      await rejectProductAPI(id);
      toast.success("Product deleted successfully.");
      await getAllProductRequests();
    } catch (err) {
      console.error("Error deleting product:", err);
      toast.error("Failed to delete product.");
    } finally {
      setActionLoadingId(null);
    }
  };


  const handleEditClick = (id) => {
    setEditingProductId(id);
  };

  if (editingProductId) {
    return (
      <EditProductCMS
        productId={editingProductId}
        onBack={() => {
          setEditingProductId(null);
          getAllProductRequests();
        }}
      />
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 text-[#111111] antialiased">
      {/* Header Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#D4AF37]/20">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#D4AF37]">
            Atelier Inventory & Approval
          </span>
          <h2 className="text-2xl font-serif font-light text-[#111111]">
            Catalog Requests
          </h2>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-[#D4AF37]/20 shadow-xs">
          <PackageCheck size={16} className="text-[#D4AF37]" />
          <span className="text-xs font-bold text-[#111111]">
            {productData.length} {productData.length === 1 ? "Item" : "Items"} Total
          </span>
        </div>
      </div>

      {/* Content State */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-24 space-y-3">
          <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
          <p className="text-xs font-bold uppercase tracking-widest text-[#626060]">
            Fetching Atelier Artifacts...
          </p>
        </div>
      ) : productData.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-dashed border-[#D4AF37]/30 text-center p-6">
          <AlertCircle size={36} className="text-[#D4AF37] mb-3" />
          <h3 className="text-lg font-serif text-[#111111] mb-1">No Artifacts Found</h3>
          <p className="text-xs text-[#626060] max-w-sm">
            There are currently no products submitted or awaiting review in the atelier queue.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {productData.map((product) => {
            const isProcessing = actionLoadingId === product._id;

            return (
              <div
                key={product._id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between p-4 bg-white rounded-2xl border border-[#D4AF37]/20 hover:border-[#D4AF37]/50 shadow-xs hover:shadow-md transition-all duration-300 gap-4 group"
              >
                {/* Product Thumbnail and Details */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-[#F9F6F0] border border-[#D4AF37]/30 shrink-0">
                    <Image
                      fill
                      src={product.mainImage?.url || "/placeholder.jpg"}
                      alt={product.title || "Zack Luxury Craft"}
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="64px"
                    />
                  </div>

                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-serif font-medium text-[#111111] truncate">
                        {product.title}
                      </h3>
                      {product.accepted ? (
                        <span className="bg-[#111111] text-[#D4AF37] text-[9px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded-full border border-[#D4AF37]/30">
                          Published
                        </span>
                      ) : (
                        <span className="bg-[#F9F6F0] text-[#626060] text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                          Pending Approval
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#626060]">
                      {product.category && (
                        <span className="uppercase text-[10px] tracking-wider font-semibold text-[#D4AF37]">
                          {product.category}
                        </span>
                      )}
                      {(product.price || product.discountPrice) && (
                        <span className="font-serif font-semibold text-[#111111]">
                          ${product.discountPrice || product.price}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions Bar */}
                <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-[#D4AF37]/10">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEditClick(product._id)}
                    disabled={isProcessing}
                    className="flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#F9F6F0] text-[#111111] text-xs font-bold uppercase tracking-wider rounded-xl border border-[#D4AF37]/30 hover:bg-[#111111] hover:text-[#F9F6F0] hover:border-[#111111] transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    <Edit3 size={13} className="text-[#D4AF37]" />
                    <span>Edit</span>
                  </button>

                  {/* Accept / Publish Button */}
                  <button
                    onClick={() => handleAccept(product._id)}
                    disabled={product.accepted || isProcessing}
                    className={`flex-1 md:flex-initial inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 border cursor-pointer ${product.accepted
                        ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                        : "bg-[#111111] text-[#F9F6F0] border-[#111111] hover:bg-[#D4AF37] hover:text-[#111111] hover:border-[#D4AF37] shadow-xs"
                      }`}
                  >
                    {isProcessing ? (
                      <Loader2 size={13} className="animate-spin text-[#D4AF37]" />
                    ) : (
                      <CheckCircle2
                        size={13}
                        className={product.accepted ? "text-gray-400" : "text-[#D4AF37]"}
                      />
                    )}
                    <span>{product.accepted ? "Approved" : "Approve"}</span>
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(product._id)}
                    disabled={isProcessing}
                    className="p-2 text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 rounded-xl border border-rose-200 transition-all duration-300 disabled:opacity-50 cursor-pointer"
                    aria-label="Delete product"
                    title="Delete product"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ShowProductRequests;