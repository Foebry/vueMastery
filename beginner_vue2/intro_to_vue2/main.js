let app = new Vue(
  {
    el: "#app",
    data: {
      premium: true,
      cart: [],
    },
    methods: {
      addToCart: function (id) {
        this.cart.push(id);
      },
      removeFromCart: function (id) {
        const toRemove = this.cart.find((el) => el === id);
        const index = this.cart.indexOf(toRemove);
        const newCart = this.cart.filter((_, idx) => idx !== index);
        this.cart = newCart;
      },
    },
  },

  Vue.component(
    "product",
    {
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
  
  <h1>{{message}}</h1>
  <product-review @review-submitted="addReview"></product-review>
  <h2>Reviews</h2>
  <p v-if="reviews.length == 0">There are no reviews yet</p>
  <div v-else>
      <ul>
        <li v-for="review in reviews">
          <p>{{review.name}}</p>
          <p>{{review.review}}</p>
          <p>rating: {{review.rating}}</p>
          <p>recommending: {{review.recommend}}</p>
        </li>
      </ul>
  </div>
  </div>
  `,
      data() {
        return {
          product: "Boots",
          brand: "Vue Mastery",
          variant: "",
          inStock: true,
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
          outOfStockClass: "out-of-stock",
          reviews: [],
        };
      },
      methods: {
        addToCart: function () {
          this.$emit("add-to-cart", this.variants[0].variantId);
        },
        removeFromCart: function () {
          this.$emit("remove-from-cart", this.variants[0].variantId);
        },
        updateProduct: function (variant) {
          this.variant = variant;
        },
        addReview: function (productReview) {
          this.reviews.push(productReview);
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
    },
    Vue.component("product-review", {
      template: `
      <form class="review-form" @submit.prevent="onSubmit">
      <p>
        <label for="name">Name:</label>
        <div>
        <input id="name" v-model="name">
        <span v-if="errors.name">{{errors.name}}</span>
        </div>
        
      </p>
      <p>
        <label for="review">Review:</label>
        <div>
        <textarea id="review" v-model="review"></textarea>
        <span v-if="errors.review">{{errors.review}}</span>
        </div>
        
      </p>
      <p>
        <label for="rating">Rating:</label>
        <div>
        <select id="rating" v-model.number="rating">
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
        </select>
        <span v-if="errors.rating">{{errors.rating}}</span>
        </div>
        
      </p>
      <p>
        <p>Would you recommend this product?</p>
        <div>
        <label for="yes">yes</label>
        <input type="radio" v-model="recommend" value="yes" id="yes">
        <label for="maybe">maybe</label>
        <input type="radio" v-model="recommend" value="maybe" id="maybe">
        <label for="no">no</label>
        <input type="radio" v-model="recommend" value="no" id="no">
        </div>
        <span v-if="errors.recommend">{{errors.recommend}}</span>
      </p>
      <p>
        <input type="submit" value="Submit">
      </p>
      </form>`,
      data() {
        return {
          name: null,
          review: null,
          rating: null,
          recommend: null,
          errors: { name: null, review: null, rating: null, recommend: null },
        };
      },
      methods: {
        onSubmit() {
          this.errors.name = !this.name ? "Name is required" : null;
          this.errors.review = !this.review ? "Review is required" : null;
          this.errors.rating = !this.rating ? "Rating is required" : null;
          this.errors.recommend = !this.recommend
            ? "Recommend is required"
            : null;

          if (
            this.errors.name !== null ||
            this.errors.review !== null ||
            this.errors.rating !== null ||
            this.errors.recommend !== null
          )
            return;

          const productReview = {
            name: this.name,
            review: this.review,
            rating: this.rating,
            recommend: this.recommend,
          };
          this.name = null;
          this.review = null;
          this.rating = null;
          this.recommend = null;

          this.$emit("review-submitted", productReview);
        },
      },
    })
  )
);
