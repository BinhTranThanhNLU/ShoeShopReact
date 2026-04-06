const OrderTab = () => {
    return (
        <div className="tab-pane fade show active" id="orders">
            <div className="section-header" data-aos="fade-up">
                <h2>Đơn hàng của tôi</h2>
                <div className="header-actions">
                    <div className="search-box">
                        <i className="bi bi-search"></i>
                        <input type="text" placeholder="Tìm kiếm đơn hàng..." />
                    </div>
                    <div className="dropdown">
                        <button className="filter-btn" data-bs-toggle="dropdown">
                            <i className="bi bi-funnel"></i>
                            <span>Lọc</span>
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" href="#">Tất cả đơn hàng</a></li>
                            <li><a className="dropdown-item" href="#">Đang xử lý</a></li>
                            <li><a className="dropdown-item" href="#">Đã vận chuyển</a></li>
                            <li><a className="dropdown-item" href="#">Đã giao hàng</a></li>
                            <li><a className="dropdown-item" href="#">Đã hủy</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="orders-grid">
                {/* Order Card 1 */}
                <div className="order-card" data-aos="fade-up" data-aos-delay="100">
                    <div className="order-header">
                        <div className="order-id">
                            <span className="label">Mã đơn hàng:</span>
                            <span className="value">#ORD-2024-1278</span>
                        </div>
                        <div className="order-date">20 Tháng 2, 2025</div>
                    </div>
                    <div className="order-content">
                        <div className="product-grid">
                            <img src="../../assets/img/product/product-1.webp" alt="Sản phẩm" loading="lazy" />
                            <img src="../../assets/img/product/product-2.webp" alt="Sản phẩm" loading="lazy" />
                            <img src="../../assets/img/product/product-3.webp" alt="Sản phẩm" loading="lazy" />
                        </div>
                        <div className="order-info">
                            <div className="info-row">
                                <span>Trạng thái</span>
                                <span className="status processing">Đang xử lý</span>
                            </div>
                            <div className="info-row">
                                <span>Sản phẩm</span>
                                <span>3 món</span>
                            </div>
                            <div className="info-row">
                                <span>Tổng cộng</span>
                                <span className="price">$789.99</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-footer">
                        <button type="button" className="btn-track" data-bs-toggle="collapse" data-bs-target="#tracking1"
                            aria-expanded="false">Theo dõi đơn</button>
                        <button type="button" className="btn-details" data-bs-toggle="collapse" data-bs-target="#details1"
                            aria-expanded="false">Xem chi tiết</button>
                    </div>

                    {/* Theo dõi đơn hàng */}
                    <div className="collapse tracking-info" id="tracking1">
                        <div className="tracking-timeline">
                            <div className="timeline-item completed">
                                <div className="timeline-icon">
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Đơn hàng đã được xác nhận</h5>
                                    <p>Đơn hàng của bạn đã được tiếp nhận và xác nhận thành công</p>
                                    <span className="timeline-date">20/02/2025 - 10:30 AM</span>
                                </div>
                            </div>

                            <div className="timeline-item completed">
                                <div className="timeline-icon">
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Đang xử lý</h5>
                                    <p>Đơn hàng đang được chuẩn bị để giao</p>
                                    <span className="timeline-date">20/02/2025 - 2:45 PM</span>
                                </div>
                            </div>

                            <div className="timeline-item active">
                                <div className="timeline-icon">
                                    <i className="bi bi-box-seam"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Đóng gói</h5>
                                    <p>Sản phẩm đang được đóng gói để giao</p>
                                    <span className="timeline-date">20/02/2025 - 4:15 PM</span>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-icon">
                                    <i className="bi bi-truck"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Đang vận chuyển</h5>
                                    <p>Dự kiến giao cho đơn vị vận chuyển trong vòng 24 giờ</p>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-icon">
                                    <i className="bi bi-house-door"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Giao hàng</h5>
                                    <p>Dự kiến giao: 22/02/2025</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chi tiết đơn hàng */}
                    <div className="collapse order-details" id="details1">
                        <div className="details-content">
                            <div className="detail-section">
                                <h5>Thông tin đơn hàng</h5>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="label">Phương thức thanh toán</span>
                                        <span className="value">Thẻ tín dụng (**** 4589)</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Phương thức giao hàng</span>
                                        <span className="value">Giao nhanh (2-3 ngày)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h5>Sản phẩm (3)</h5>
                                <div className="order-items">
                                    <div className="item">
                                        <img src="../../assets/img/product/product-1.webp" alt="Sản phẩm" loading="lazy" />
                                        <div className="item-info">
                                            <h6>Lorem ipsum dolor sit amet</h6>
                                            <div className="item-meta">
                                                <span className="sku">Mã SP: PRD-001</span>
                                                <span className="qty">SL: 1</span>
                                            </div>
                                        </div>
                                        <div className="item-price">$899.99</div>
                                    </div>

                                    <div className="item">
                                        <img src="../../assets/img/product/product-2.webp" alt="Sản phẩm" loading="lazy" />
                                        <div className="item-info">
                                            <h6>Consectetur adipiscing elit</h6>
                                            <div className="item-meta">
                                                <span className="sku">Mã SP: PRD-002</span>
                                                <span className="qty">SL: 2</span>
                                            </div>
                                        </div>
                                        <div className="item-price">$599.95</div>
                                    </div>

                                    <div className="item">
                                        <img src="../../assets/img/product/product-3.webp" alt="Sản phẩm" loading="lazy" />
                                        <div className="item-info">
                                            <h6>Sed do eiusmod tempor</h6>
                                            <div className="item-meta">
                                                <span className="sku">Mã SP: PRD-003</span>
                                                <span className="qty">SL: 1</span>
                                            </div>
                                        </div>
                                        <div className="item-price">$129.99</div>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h5>Chi tiết giá</h5>
                                <div className="price-breakdown">
                                    <div className="price-row">
                                        <span>Tạm tính</span>
                                        <span>$1,929.93</span>
                                    </div>
                                    <div className="price-row">
                                        <span>Phí vận chuyển</span>
                                        <span>$15.99</span>
                                    </div>
                                    <div className="price-row">
                                        <span>Thuế</span>
                                        <span>$159.98</span>
                                    </div>
                                    <div className="price-row total">
                                        <span>Tổng cộng</span>
                                        <span>$2,105.90</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h5>Địa chỉ giao hàng</h5>
                                <div className="address-info">
                                    <p>Sarah Anderson<br />123 Main Street<br />Apt 4B<br />New York, NY 10001<br />Hoa Kỳ</p>
                                    <p className="contact">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Card 2 */}
                <div className="order-card" data-aos="fade-up" data-aos-delay="200">
                    <div className="order-header">
                        <div className="order-id">
                            <span className="label">Mã đơn hàng:</span>
                            <span className="value">#ORD-2024-1265</span>
                        </div>
                        <div className="order-date">15 Tháng 2, 2025</div>
                    </div>
                    <div className="order-content">
                        <div className="product-grid">
                            <img src="../../assets/img/product/product-4.webp" alt="Sản phẩm" loading="lazy" />
                            <img src="../../assets/img/product/product-5.webp" alt="Sản phẩm" loading="lazy" />
                        </div>
                        <div className="order-info">
                            <div className="info-row">
                                <span>Trạng thái</span>
                                <span className="status shipped">Đã giao cho đơn vị vận chuyển</span>
                            </div>
                            <div className="info-row">
                                <span>Số lượng</span>
                                <span>2 sản phẩm</span>
                            </div>
                            <div className="info-row">
                                <span>Tổng cộng</span>
                                <span className="price">$459.99</span>
                            </div>
                        </div>
                    </div>
                    <div className="order-footer">
                        <button type="button" className="btn-track" data-bs-toggle="collapse" data-bs-target="#tracking2"
                            aria-expanded="false">Theo dõi đơn hàng</button>
                        <button type="button" className="btn-details" data-bs-toggle="collapse" data-bs-target="#details2"
                            aria-expanded="false">Xem chi tiết</button>
                    </div>

                    {/* Theo dõi đơn hàng */}
                    <div className="collapse tracking-info" id="tracking2">
                        <div className="tracking-timeline">
                            <div className="timeline-item completed">
                                <div className="timeline-icon">
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Đơn hàng đã được xác nhận</h5>
                                    <p>Chúng tôi đã nhận và xác nhận đơn hàng của bạn</p>
                                    <span className="timeline-date">15 Tháng 2, 2025 - 9:15 AM</span>
                                </div>
                            </div>

                            <div className="timeline-item completed">
                                <div className="timeline-icon">
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Đang xử lý</h5>
                                    <p>Đơn hàng của bạn đang được chuẩn bị để giao</p>
                                    <span className="timeline-date">15 Tháng 2, 2025 - 11:30 AM</span>
                                </div>
                            </div>

                            <div className="timeline-item completed">
                                <div className="timeline-icon">
                                    <i className="bi bi-check-circle-fill"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Đóng gói</h5>
                                    <p>Sản phẩm đã được đóng gói sẵn sàng để vận chuyển</p>
                                    <span className="timeline-date">15 Tháng 2, 2025 - 2:45 PM</span>
                                </div>
                            </div>

                            <div className="timeline-item active">
                                <div className="timeline-icon">
                                    <i className="bi bi-truck"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Đang vận chuyển</h5>
                                    <p>Đơn hàng đang được đơn vị vận chuyển giao đi</p>
                                    <span className="timeline-date">16 Tháng 2, 2025 - 10:20 AM</span>
                                    <div className="shipping-info">
                                        <span>Mã vận đơn: </span>
                                        <span className="tracking-number">1Z999AA1234567890</span>
                                    </div>
                                </div>
                            </div>

                            <div className="timeline-item">
                                <div className="timeline-icon">
                                    <i className="bi bi-house-door"></i>
                                </div>
                                <div className="timeline-content">
                                    <h5>Giao hàng</h5>
                                    <p>Dự kiến giao: 18 Tháng 2, 2025</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Chi tiết đơn hàng */}
                    <div className="collapse order-details" id="details2">
                        <div className="details-content">
                            <div className="detail-section">
                                <h5>Thông tin đơn hàng</h5>
                                <div className="info-grid">
                                    <div className="info-item">
                                        <span className="label">Phương thức thanh toán</span>
                                        <span className="value">Thẻ tín dụng (**** 7821)</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="label">Phương thức vận chuyển</span>
                                        <span className="value">Giao hàng tiêu chuẩn (3-5 ngày)</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h5>Sản phẩm (2)</h5>
                                <div className="order-items">
                                    <div className="item">
                                        <img src="../../assets/img/product/product-4.webp" alt="Sản phẩm" loading="lazy" />
                                        <div className="item-info">
                                            <h6>Ut enim ad minim veniam</h6>
                                            <div className="item-meta">
                                                <span className="sku">SKU: PRD-004</span>
                                                <span className="qty">Số lượng: 1</span>
                                            </div>
                                        </div>
                                        <div className="item-price">$299.99</div>
                                    </div>

                                    <div className="item">
                                        <img src="../../assets/img/product/product-5.webp" alt="Sản phẩm" loading="lazy" />
                                        <div className="item-info">
                                            <h6>Quis nostrud exercitation</h6>
                                            <div className="item-meta">
                                                <span className="sku">SKU: PRD-005</span>
                                                <span className="qty">Số lượng: 1</span>
                                            </div>
                                        </div>
                                        <div className="item-price">$159.99</div>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h5>Chi tiết giá</h5>
                                <div className="price-breakdown">
                                    <div className="price-row">
                                        <span>Tạm tính</span>
                                        <span>$459.98</span>
                                    </div>
                                    <div className="price-row">
                                        <span>Phí vận chuyển</span>
                                        <span>$9.99</span>
                                    </div>
                                    <div className="price-row">
                                        <span>Thuế</span>
                                        <span>$38.02</span>
                                    </div>
                                    <div className="price-row total">
                                        <span>Tổng cộng</span>
                                        <span>$459.99</span>
                                    </div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h5>Địa chỉ giao hàng</h5>
                                <div className="address-info">
                                    <p>Sarah Anderson<br />123 Main Street<br />Apt 4B<br />New York, NY 10001<br />Hoa Kỳ</p>
                                    <p className="contact">+1 (555) 123-4567</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Card 3 */}
                <div className="order-card" data-aos="fade-up" data-aos-delay="300">
                    <div className="order-header">
                        <div className="order-id">
                            <span className="label">Mã đơn hàng:</span>
                            <span className="value">#ORD-2024-1252</span>
                        </div>
                        <div className="order-date">10 Tháng 2, 2025</div>
                    </div>

                    <div className="order-content">
                        <div className="product-grid">
                            <img src="../../assets/img/product/product-6.webp" alt="Sản phẩm" loading="lazy" />
                        </div>
                        <div className="order-info">
                            <div className="info-row">
                                <span>Trạng thái</span>
                                <span className="status delivered">Đã giao</span>
                            </div>
                            <div className="info-row">
                                <span>Số lượng</span>
                                <span>1 sản phẩm</span>
                            </div>
                            <div className="info-row">
                                <span>Tổng cộng</span>
                                <span className="price">$129.99</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-footer">
                        <button type="button" className="btn-review">Viết đánh giá</button>
                        <button type="button" className="btn-details">Xem chi tiết</button>
                    </div>
                </div>

                {/* Order Card 4 */}
                <div className="order-card" data-aos="fade-up" data-aos-delay="400">
                    <div className="order-header">
                        <div className="order-id">
                            <span className="label">Mã đơn hàng:</span>
                            <span className="value">#ORD-2024-1245</span>
                        </div>
                        <div className="order-date">05 Tháng 2, 2025</div>
                    </div>

                    <div className="order-content">
                        <div className="product-grid">
                            <img src="../../assets/img/product/product-7.webp" alt="Sản phẩm" loading="lazy" />
                            <img src="../../assets/img/product/product-8.webp" alt="Sản phẩm" loading="lazy" />
                            <img src="../../assets/img/product/product-9.webp" alt="Sản phẩm" loading="lazy" />
                            <span className="more-items">+2</span>
                        </div>
                        <div className="order-info">
                            <div className="info-row">
                                <span>Trạng thái</span>
                                <span className="status cancelled">Đã hủy</span>
                            </div>
                            <div className="info-row">
                                <span>Số lượng</span>
                                <span>5 sản phẩm</span>
                            </div>
                            <div className="info-row">
                                <span>Tổng cộng</span>
                                <span className="price">$1,299.99</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-footer">
                        <button type="button" className="btn-reorder">Đặt lại</button>
                        <button type="button" className="btn-details">Xem chi tiết</button>
                    </div>
                </div>

            </div>

            {/* Pagination */}
            <div className="pagination-wrapper" data-aos="fade-up">
                <button type="button" className="btn-prev" disabled>
                    <i className="bi bi-chevron-left"></i>
                </button>
                <div className="page-numbers">
                    <button type="button" className="active">1</button>
                    <button type="button">2</button>
                    <button type="button">3</button>
                    <span>...</span>
                    <button type="button">12</button>
                </div>
                <button type="button" className="btn-next">
                    <i className="bi bi-chevron-right"></i>
                </button>
            </div>
        </div>
    );
};

export default OrderTab;