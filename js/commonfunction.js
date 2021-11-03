/**
 * @author crom
 * @since 2021-10-30
 * @description common function for actions
 */

const CommonFunc = (() => {
  /**Main Page(S) */

  /**Add Item To Cart */
  $('.pi-pic > ul[class="add-to-cart"]').on('click', () => {
    //+1 to cart
    let totalProd = Number($('#prod-number').text());
    $('#prod-number').text(totalProd + 1);
    $('.alert-success').finish().fadeIn('fast').delay(1000).fadeOut('slow');
  });

  /**Click Item -> Show Product Detail (S) */
  $('.product-item > .pi-pic > .prod-img').on('click', () => {
    let productId = $('.product-item').attr('pro-id');
    click();
  });

  click = (productId) => {
    window.location.href = `/product.html?id=${productId}`;
  };

  /**Main Page(E) */

  return {};
})();
