let app = new Vue({
  el: "#app",
  data: {
    product: "Boots",
    inStock: false,
    inventory: 8,
    onSale: true,
    details: ["80% cotton", "20% polyester", "Gender-neutral"],
    variants: [
      {
        variantId: 2234,
        variantColor: "green",
      },
      {
        variantId: 2235,
        variantColor: "blue",
      },
    ],
    sizes: ["XXL", "XL", "L", "M", "S", "XS", "XXS"],
  },
});
