const Cart = (() => {
  const orderItems = [
    {
      // ordId: 'ORDITM1',
      // detailOrderId: 'ORD1',
      productId: 'SP1',
      sku: '',
      price: '',
      quantity: 1,
      createdAt: '2021-11-11',
      updatedAt: '2011-11-11',
      content: '',
      product: {
        productId: 'SP1',
        name: 'Áo thun tay dài cổ rộng nữ',
        brand: 'Crom',
        category: 'clothing',
        img: `img/products/women-1.jpg`,
        price: 100000,
        discount: 0,
        sex: 'female',
      },
    },
    {
      id: 'ORDITM2',
      detailOrderId: 'ORD2',
      productId: 'SP2',
      sku: '',
      price: '',
      discount: 0,
      quantity: 1,
      createdAt: '2021-11-11',
      updatedAt: '2011-11-11',
      content: '',
      product: {
        productId: 'SP2',
        name: 'Áo len crop-top nữ',
        brand: 'KDG',
        category: 'clothing',
        img: 'img/products/women-2.jpg',
        price: 150000,
        discount: 0,
        sex: 'female',
      },
    },

    {
      id: 'ORDITM3',
      detailOrderId: 'ORD3',
      productId: 'SP3',
      sku: '',
      price: '',
      discount: 0,
      quantity: 1,
      createdAt: '2021-11-11',
      updatedAt: '2011-11-11',
      content: '',
      product: {
        productId: 'SP3',
        name: 'Áo len dài tay xám nữ',
        brand: 'KDG',
        category: 'clothing',
        img: 'img/products/women-3.jpg',
        price: 300000,
        discount: 0,
        sex: 'female',
      },
    },
  ];

  $(document).ready(async function () {
    let orderItems = await getCartItemsInLocalStorage();
    await renderListItem(orderItems);
    attachEvent();
    calculateTotal();
  });

  async function getCartItemsInLocalStorage() {
    let orderItems = [];
    let storage = localStorage.getItem('cart');
    let products = storage ? JSON.parse(storage) : [];

    //increase quantity if duplicate
    products.forEach((el) => {
      let duplicateInCart = getAllIndexOf(products, el.productId);
      let quantity = duplicateInCart.length;
      let item = {
        productId: el.productId,
        quantity: quantity,
        price: el.price * quantity,
        product: el,
      };
      if (!orderItems.find((i) => i.product.productId == el.productId)) {
        orderItems.push(item);
      }
    });
    return orderItems;
  }

  //Use to find index of product in cart => to remove duplicate
  const getAllIndexOf = (orderItems, productId) => {
    let rs = [];
    orderItems.forEach((item, index) => {
      if (item.productId == productId) {
        rs.push(index);
      }
    });
    return rs;
  };

  const renderListItem = async (orderItems) => {
    let cartTable = $('.cart-table tbody');

    orderItems.forEach((item) => {
      let product = item.product;
      let html = `<tr class="ord-item" prod-id = ${product.productId}>
      <td class="cart-pic first-row"><img src="${product.img}" alt=""></td>
      <td class="cart-title first-row">
          <h5 class="p-name">${product.name}</h5>
      </td>
      <td class="p-price first-row">${product.price.toLocaleString()}</td>
      <td class="qua-col first-row">
          <div class="quantity">
              <div class="pro-qty"><span class="dec qtybtn">-</span>
                  <input type="text" value="${item.quantity}">
              <span class="inc qtybtn" >+</span></div>
          </div>
      </td>
      <td class="total-price first-row">${(
        item.quantity * product.price
      ).toLocaleString()}</td>
      <td class="close-td first-row"><i class="ti-close"></i></td>
  </tr>`;
      cartTable.append(html);
    });
  };

  const getQtyHtml = (productId) => {
    return Number($(`[prod-id=${productId}] .pro-qty input`).val());
  };

  const setQtyHtml = (productId, quantity) => {
    return $(`[prod-id=${productId}] .pro-qty input`).val(quantity);
  };

  const setItemTotalPrice = (productId, itemPrice) => {
    return $(`[prod-id=${productId}] .total-price`).text(
      itemPrice.toLocaleString()
    );
  };

  const calculateItemPrice = (price, quantity, discount) => {
    return Number(price) * Number(quantity) * (1 - Number(discount) / 100);
  };

  const onChangeQty = () => {
    $('.pro-qty input').on('change', function () {
      let productId = $(this).parents('.ord-item').attr('prod-id');
      let quantity = getQtyHtml(productId);
      let item = Cart.orderItems.find(
        (item) => item.product.productId == productId
      );
      let itemPrice = calculateItemPrice(
        item.product.price,
        quantity,
        item.product.discount
      );

      setQtyHtml(productId, quantity);
      setItemTotalPrice(productId, itemPrice);
      calculateTotal();
    });
  };

  const calculateTotal = () => {
    let listItem = $('.cart-table tbody').children();
    let total = 0;
    for (let el of listItem) {
      total += toNumber($(el).children('.total-price').text());
    }
    $('.cart-total span').text(total.toLocaleString());
    $('.cart-total span').val(total);
  };

  const increaseItemClick = () => {
    $('.inc').on('click', function () {
      let productId = $(this).parents('.ord-item').attr('prod-id');
      let quantity = getQtyHtml(productId) + 1;

      let item = Cart.orderItems.find(
        (item) => item.product.productId == productId
      );
      let itemPrice = calculateItemPrice(
        item.product.price,
        quantity,
        item.product.discount
      );

      item.quantity = quantity;
      item.price = itemPrice;

      setQtyHtml(productId, quantity);
      setItemTotalPrice(productId, itemPrice.toLocaleString());
      calculateTotal();
    });
  };

  const decreaseItemClick = () => {
    $('.dec').on('click', function () {
      let productId = $(this).parents('.ord-item').attr('prod-id');
      let quantity = getQtyHtml(productId) - 1;

      let item = Cart.orderItems.find(
        (item) => item.product.productId == productId
      );
      let itemPrice = calculateItemPrice(
        item.product.price,
        quantity,
        item.product.discount
      );

      if (quantity >= 0) {
        item.quantity = quantity;
        item.price = itemPrice;

        setQtyHtml(productId, quantity);
        setItemTotalPrice(productId, itemPrice.toLocaleString());
      }
      calculateTotal();
    });
  };

  onClickRemoveItem = () => {
    $('.ti-close').on('click', function () {
      let confirm = window.confirm('Bạn có muốn xóa sản phẩm này ? ');
      if (confirm) {
        $(this).parents('.ord-item').remove();
        // $(".ord-item[prod-id=SP3]").remove()
        calculateTotal();
      }
    });
  };

  const toNumber = (string) => {
    return Number(string.toString().replaceAll(',', '').replaceAll('.', ''));
  };

  const attachEvent = () => {
    onChangeQty();
    decreaseItemClick();
    increaseItemClick();
    onClickRemoveItem();
  };
  return {
    getCartItemsInLocalStorage,
    getAllIndexOf,
    renderListItem,
    setQtyHtml,
    setItemTotalPrice,
    calculateTotal,
    toNumber,
    attachEvent,
  };
})();
