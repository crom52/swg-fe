let productDetailSample = {
  id: 'SP1',
  name: 'Jacket Pure Pineapple',
  shortDescription: 'Áo Sơ-mi form rộng màu xanh rêu thanh lịch',
  description: ` Áo khoác kaki nam cao cấp navy mã số SP1, đây là mẫu áo khoác kaki nam cao cấp dành cho mùa thu đông năm này. Áo được thiết kế theo phong cách trẻ trung, nam tính, hiện đại, áo form gọn gàng, ống tay bo và bo đai dưới giúp gọn gàng khi mặc.
    Bên ngoài áo làm từ chất liệu kaki cao cấp đặc biệt chống gió và chống bụi tốt và thoáng khí, bên trong lót vải mềm giúp thoáng mồ hôi cho người mặc cảm giác thoải mái. Sản phẩm với đường may tinh xảo, khóa áo làm từ hợp kim không rỉ tạo nên chất lượng cho sản phẩm. Với màu xanh navy kaki nam tính dễ phối đồ. Sản phẩm được sản xuất trên dây chuyền nhập khẩu hiện đại, chất liệu cao cấp chuẩn đầu vào, cùng nhân viên lành nghề làm nên chất lượng sản phẩm.
    Sản phẩm phù hợp với mọi điều kiện thời tiết.`,

  price: 400000,
  size: 'L',
  color: 'green',
  category: ['clothing', 'tshirt', 'woman'],
  discountCode: '',
  madeByCountry: '',
  rating: '',
  brand: 'CROM FASHION',
  discount: 10,
  tag: ['jacket', 'green', 'tshirt', 'clothing'],
  availableStock: 10,
  availableSize: ['M', 'X', 'XXL'],
};

let commentSample = [
  {
    id: 1,
    productId: 'SP1',
    userId: '001',
    userName: 'Crom',
    content: 'Vải đẹp, giao hàng nhanh. Ủng hộ STC Shop',
    imgUrl: 'img/user-img/crom-avt.jpg',
    rating: 4, //max 5 stars
    cmtDate: '28/11/2021',
  },
  {
    id: 1,
    productId: 'SP1',
    userId: '001',
    userName: 'Phạm Thành Biên',
    content:
      'Biết shop từ thời đồ đá. Shop uy tín. Chủ shop vui vẻ, quần áo đẹp',
    imgUrl: 'img/user-img/pham-thanh-bien-avt.jpg',
    rating: 5, //max 5 stars
    cmtDate: '02/11/2021',
  },
];

/**Load product detail after init page */
const showProductDetail = (productDetail) => {
  $('#pd-brand-value').text(productDetail.brand);
  $('#pd-title-value').text(productDetail.name);
  $('#pd-short-desc-value').text(productDetail.shortDescription);
  $('#pd-price-value').text(productDetail.price.toLocaleString());

  $('#pd-discount-price-value').text(
    ((productDetail.price * productDetail.discount) / 100).toLocaleString()
  );

  $('#category-value > span').text(
    productDetail.category.toString().replaceAll(',', ' , ')
  );
  $('#tag-value > span').text(
    productDetail.tag.toString().toLowerCase().replaceAll(',', ' , ')
  );
  $('#pd-desc').text(productDetail.description);
};

/**Load feedback (Danh Gia) */
$('.pd-feedback ').on('click', () => {
  //Call Api get comment content
  showFeedback(commentSample);
});
const showFeedback = async (commentSample) => {
  $('.comment-option').empty();

  await commentSample.forEach((cmt) => {
    let html = `<div class="co-item">
                    <div class="avatar-pic">
                        <img src="url-avatar-here" alt="">
                    </div>
                    <div class="avatar-text">
                        <div class="at-rating">
                            <i class="fa fa-star-o r1"></i>
                            <i class="fa fa-star-o r2"></i>
                            <i class="fa fa-star-o r3"></i>
                            <i class="fa fa-star-o r4"></i>
                            <i class="fa fa-star-o r5"></i>
                        </div>
                        <h5>user-name-here <span>comment-date-here</span></h5>
                        <div class="at-reply"> comment-content-here </div>
                    </div>
                 </div>`;

    html = html.replace('url-avatar-here', cmt.imgUrl);
    html = html.replace('comment-date-here', cmt.cmtDate);
    html = html.replace('user-name-here', cmt.userName);
    html = html.replace('comment-content-here', cmt.content);

    //Rating
    for (let i = 0; i <= cmt.rating; i++) {
      html = html.replace(`fa-star-o r${i}`, `fa-star r${i}`);
    }

    $('.comment-option').append(html);
  });
};

//After render page
$(document).ready(function () {
  let productId = window.location.href.split('?id=');
  // Call Api get procduct detail
  // let prodDetail = Api.getProductDetail(productId);
  console.log(productId);

  showProductDetail(productDetailSample);
});
