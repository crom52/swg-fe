let productItemSample = [
  //Slider top
  {
    productId: 'SP1',
    name: 'Áo thun tay dài cổ rộng nữ',
    brand: 'Crom',
    category: 'clothing',
    img: `img/products/women-1.jpg`,
    price: 100000,
    discount: 0,
    sex: 'female',
  },
  {
    productId: 'SP2',
    name: 'Áo len crop-top nữ',
    brand: 'KDG',
    category: 'clothing',
    img: 'img/products/women-2.jpg',
    price: 150000,
    discount: 0,
    sex: 'female',
  },
  {
    productId: 'SP3',
    name: 'Áo len dài tay xám nữ',
    brand: 'KDG',
    category: 'clothing',
    img: 'img/products/women-3.jpg',
    price: 300000,
    discount: 0,
    sex: 'female',
  },
  {
    productId: 'SP4',
    name: 'Túi xách KDG',
    brand: 'KDG',
    category: 'accessory',
    img: 'img/products/women-4.jpg',
    price: 300000,
    discount: 0,
    sex: 'female',
  },

  //Slider bot
  {
    productId: 'MAN1',
    name: 'Balo KDG du dịch chống thấm',
    brand: 'KDG',
    category: 'accessory',
    img: 'img/products/man-1.jpg',
    price: 800000,
    discount: 0,
    sex: 'male',
  },
  {
    productId: 'MAN2',
    name: 'Giày Converse vàng cổ thấp',
    brand: 'converse',
    category: 'shoe',
    img: 'img/products/man-2.jpg',
    price: 1200000,
    discount: 0,
    sex: 'male',
  },
  {
    productId: 'MAN3',
    name: 'Áo khoác dù chống nước',
    brand: 'KDG',
    category: 'coat',
    img: 'img/products/man-3.jpg',
    price: 300000,
    discount: 0,
    sex: 'male',
  },
  {
    productId: 'MAN4',
    name: 'Áo jacket kaki nam',
    brand: 'Yame',
    category: 'accessory',
    img: `img/products/man-4.jpg`,
    price: 300000,
    discount: 0,
    sex: 'male',
  },
];

//After render page
$(document).ready(function () {
  loadFeaturedProduct(productItemSample);
});

/**
 *
 * @param {*} productList
 * @returns product list grouped by sex
 */
const groupProdBySex = (productList) => {
  return _.groupBy(productList, (product) => product.sex);
};

/**
 * Slider
 * Featured Product
 * Load product detail to HTML DOM
 */

const loadFeaturedProduct = (productList) => {
  //Group by sex
  productList = groupProdBySex(productList);
  console.log(productList);

  let womenProducts = productList.female;
  let manProducts = productList.male;

  //Fill value to HTML DOM
  /** Slider Top  */
  womenProducts.forEach((product, i) => {
    let itemSliderTopEle = `.slider-top .item-${i + 1}`;

    // Image
    $(`${itemSliderTopEle} .prod-img`).attr('src', product.img);

    //Product Id
    $(`${itemSliderTopEle}`).attr('pro-id', product.productId);

    //Product Name
    $(`${itemSliderTopEle} .pi-text .product-name`).text(product.name);

    //Price
    $(`${itemSliderTopEle} .pi-text .product-price`).text(
      product.price.toLocaleString()
    );

    //Attach event onclick
    attachClickProductHomePage(
      `${itemSliderTopEle} .prod-img`,
      product.productId
    );
  });

  /** Slider Bottom  */
  manProducts.forEach((product, i) => {
    let itemSliderBotEle = `.slider-bottom .item-${i + 1}`;

    // Image
    $(`${itemSliderBotEle} .prod-img`).attr('src', product.img);

    //Product Id
    $(`${itemSliderBotEle}`).attr('pro-id', product.productId);

    //Product Name
    $(`${itemSliderBotEle} .pi-text .product-name`).text(product.name);

    //Price
    $(`${itemSliderBotEle} .pi-text .product-price`).text(
      product.price.toLocaleString()
    );

    //Attach event onclick
    attachClickProductHomePage(
      `${itemSliderBotEle} .prod-img`,
      product.productId
    );
  });
};

const attachClickProductHomePage = (elementClass, productId) => {
  $(elementClass).on('click', '', () => {
    window.location.href = `/product.html?id=${productId}`;
  });
};
