/**
 * @author crom
 * @since 2021-10-30
 * @description common function for actions
 */
cartItems = [];

const CommonFunc = (() => {
  /**Main Page(S) */
  let cart = localStorage.getItem('cart');
  // cart.push();

  /**Add Item To Cart (S)*/
  $('.pi-pic > ul[class="add-to-cart"]').on('click', function () {
    //+1 to cart
    let totalProd = Number($('#prod-number').text());
    $('#prod-number').text(totalProd + 1);
    $('.alert-success').finish().fadeIn('fast').delay(1300).fadeOut('slow');

    let productId = $(this).parents('.product-item').attr('pro-id');
    addToCart(productId);
  });

  const addToCart = (productId) => {
    cartItems = localStorage.getItem('cart')
      ? JSON.parse(localStorage.getItem('cart'))
      : [];
    let itemToAdd = Home.productList.find((prd) => prd.productId == productId);
    if (itemToAdd) {
      cartItems.push(itemToAdd);
    }
    localStorage.setItem('cart', JSON.stringify(cartItems));
  };

  /**Main Page(E) */

  return {
    addToCart,
  };
})();
