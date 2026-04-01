const ProductAction = () => {
  return (
    <div className="purchase-section">
      <div className="quantity-control">
        <label className="control-label">Số lượng:</label>
        <div className="quantity-input-group">
          <div className="quantity-selector">
            <button className="quantity-btn decrease" type="button">
              <i className="bi bi-dash"></i>
            </button>
            <input
              type="number"
              className="quantity-input"
              value="1"
              min="1"
              max="18"
            />
            <button className="quantity-btn increase" type="button">
              <i className="bi bi-plus"></i>
            </button>
          </div>
        </div>
      </div>

      <div className="action-buttons">
        <button className="btn primary-action">
          <i className="bi bi-bag-plus"></i>
          Thêm vào giỏ
        </button>
        <button className="btn secondary-action">
          <i className="bi bi-lightning"></i>
          Mua ngay
        </button>
        <button className="btn icon-action" title="Add to Wishlist">
          <i className="bi bi-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default ProductAction;
