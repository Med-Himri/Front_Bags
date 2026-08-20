// Example: how to render size/color options on your product detail page,
// showing unavailable variants as crossed-out/greyed and unselectable.
//
// Drop this logic into wherever you currently render variant options on
// the public product page.

function VariantSelector({ variants, selectedVariant, onSelect }) {
  // Group by whatever makes sense for your UI — this example shows a flat
  // list of "Color - Size" chips; adjust if you display color and size
  // as two separate selectors instead.
  return (
    <div className="flex flex-wrap gap-2">
      {variants.map((variant) => {
        const isAvailable = variant.available !== false && variant.stock > 0;
        const label = [variant.color, variant.size].filter(Boolean).join(" / ");

        return (
          <button
            key={variant._id}
            type="button"
            disabled={!isAvailable}
            onClick={() => isAvailable && onSelect(variant)}
            className={`
              relative px-4 py-2 rounded-lg text-xs font-medium border transition-all
              ${
                isAvailable
                  ? selectedVariant?._id === variant._id
                    ? "border-[#C9A24B] bg-[#C9A24B]/10 text-[#1A1A1A] cursor-pointer"
                    : "border-[#C9A24B]/30 text-[#1A1A1A] hover:border-[#C9A24B] cursor-pointer"
                  : "border-gray-200 text-gray-400 cursor-not-allowed bg-gray-50"
              }
            `}
          >
            {label}
            {!isAvailable && (
              <>
                {/* Diagonal strikethrough line across the chip */}
                <span
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top right, transparent 47%, currentColor 49%, currentColor 51%, transparent 53%)",
                  }}
                />
                <span className="ml-1 text-[9px] uppercase tracking-wide">
                  {variant.available === false ? "Sold out" : "Out of stock"}
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default VariantSelector;