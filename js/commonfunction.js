/**
 * @author crom
 * @since 2021-10-30
 * @description common function for actions
 */

const CommonFunc = (() => {
  /**Main Page(S) */

  /**Add Item To Cart */
  $('.add-to-cart-btn').on('click', () => {
    //+1 to cart
    let totalProd = Number($('#prod-number').text());
    $('#prod-number').text(totalProd + 1);
  });

  /**Click Item -> Show Product Detail (S) */
  $('.product-item > .pi-pic').on('click', () => {
    let productId = $('.product-item').attr('pro-id');
    window.location.href = `http://127.0.0.1:5500/product.html?id=${productId}`;
  });

  /**Main Page(E) */

  return {};
})();
