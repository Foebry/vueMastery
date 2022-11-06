let app = new Vue(
  {
    el: "#app",
    data: {
      premium: true,
    },
  },

  Vue.component("product", {
    props: {
      message: {
        type: String,
        required: true,
      },
      premium: {
        type: Boolean,
        required: true,
      },
    },
    template: `<div><h1>{{title}}</h1>
  <p v-if="inventory > 10">In stock</p>
  <p v-else-if="inventory <= 10 && inventory > 0">Almost sold out</p>
  <p :class="{outOfStock: inStock}">Out of stock</p>
  <p v-show="inStock">In Stock</p>
  <span v-if="onSale">onSale!</span>
  <p>Shipping: {{shipping}}</p>
  <ul>
    <li v-for="detail in details">{{detail}}</li>
  </ul>
  <div
    v-for="variant in variants"
    :key="variant.variantId"
    class="color-box"
    :style="{backgroundColor: variant.variantColor, width: '20px', height: '20px'}"
    @mouseover="updateProduct(variant.variantColor)"
  >
    <!-- <p @mouseover="updateProduct(variant.variantColor)">
      {{variant.variantColor}}
    </p> -->
  </div>
  <h2>Sizes</h2>
  <ul>
    <li v-for="size in sizes" :id="size">{{size}}</li>
  </ul>
  <div style="display: flex; gap: 10px">
    <button
      v-on:click="addToCart"
      :disabled="!inStock"
      :class="{disabledButton: !inStock}"
    >
      Add to cart
    </button>
    <button @click="removeFromCart">Remove from cart</button>
  </div>
  <div class="cart">
    <p>Cart ({{cart}})</p>
  </div>
  <h1>{{message}}</h1></div>`,
    data() {
      return {
        product: "Boots",
        brand: "Vue Mastery",
        variant: "",
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
        cart: 0,
        outOfStockClass: "out-of-stock",
      };
    },
    methods: {
      addToCart: function () {
        this.cart += 1;
      },
      removeFromCart: function () {
        this.cart -= 1;
      },
      updateProduct: function (variant) {
        this.variant = variant;
      },
    },
    computed: {
      title() {
        return this.variant + " " + this.brand + " " + this.product;
      },
      shipping() {
        return this.premium ? "Free" : "4.95";
      },
    },
  })
);
