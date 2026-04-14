import { useEffect, useState } from 'react';
import type { AddressModel } from '../../models/AddressModel.ts'; // Đổi tên thành AddressModel cho khớp
import addressApi from '../../api/addressApi.ts';

const AddressTab = () => {
  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // --- LẤY USER ID ĐỘNG ---
  // Cách 1: Lấy trực tiếp từ localStorage (Giả định bạn lưu user object dưới dạng string)
  const getUserFromStorage = () => {
    const userJson = localStorage.getItem('user'); // Tên key tùy thuộc vào lúc bạn login
    if (userJson) {
      const user = JSON.parse(userJson);
      return user.id; // Lấy trường id từ object user
    }
    return null;
  };

  const userId = getUserFromStorage();

  useEffect(() => {
    const fetchAddresses = async () => {
      if (!userId) {
        console.error("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await addressApi.getByUserId(userId);
        setAddresses(data);
      } catch (error) {
        console.error("Lỗi khi tải danh sách địa chỉ:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userId]);

  const handleSetDefault = async (addressId: number) => {
    if (!userId) return;
    try {
      await addressApi.setDefault(userId, addressId);
      // Cập nhật state dựa trên trường 'default' trong JSON backend của bạn
      const updatedAddresses = addresses.map(addr => ({
        ...addr,
        default: addr.id === addressId
      }));
      setAddresses(updatedAddresses);
    } catch (error) {
      alert("Không thể cập nhật địa chỉ mặc định.");
    }
  };

  const handleDelete = async (addressId: number) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa địa chỉ này?")) {
      try {
        await addressApi.delete(addressId);
        setAddresses(addresses.filter(addr => addr.id !== addressId));
      } catch (error) {
        alert("Lỗi khi xóa địa chỉ.");
      }
    }
  };

  if (loading) {
    return <div className="text-center p-5">Đang tải dữ liệu...</div>;
  }

  if (!userId) {
    return <div className="text-center p-5 text-danger">Vui lòng đăng nhập để xem địa chỉ.</div>;
  }

  return (
      <div className="tab-pane fade show active" id="addresses">
        <div className="section-header" data-aos="fade-up">
          <h2>Địa chỉ của tôi</h2>
          <div className="header-actions">
            <button type="button" className="btn btn-dark rounded-pill shadow-sm px-4">
              <i className="bi bi-plus-lg me-2"></i>
              Thêm địa chỉ mới
            </button>
          </div>
        </div>

        <div className="addresses-grid">
          {addresses.length > 0 ? (
              addresses.map((addr, index) => (
                  <div
                      key={addr.id}
                      className={`address-card ${addr.default ? 'default' : ''}`}
                      data-aos="fade-up"
                      data-aos-delay={100 * (index + 1)}
                  >
                    <div className="card-header">
                      <h4>{addr.default ? "Địa chỉ mặc định" : `Địa chỉ ${index + 1}`}</h4>
                      {addr.default && <span className="default-badge">Mặc định</span>}
                    </div>
                    <div className="card-body">
                      <p className="address-text">
                        {addr.street}<br />
                        {addr.ward}<br />
                        {addr.district}, {addr.province}<br />
                        Việt Nam
                      </p>
                      <div className="contact-info">
                        <div><i className="bi bi-person me-2"></i> {addr.fullName}</div>
                        <div><i className="bi bi-telephone me-2"></i> {addr.phone}</div>
                      </div>
                    </div>
                    <div className="card-actions">
                      <button type="button" className="btn-edit"><i className="bi bi-pencil me-1"></i> Chỉnh sửa</button>
                      <button
                          type="button"
                          className="btn-remove"
                          onClick={() => addr.id && handleDelete(addr.id)}
                      >
                        <i className="bi bi-trash me-1"></i> Xóa
                      </button>
                      {!addr.default && (
                          <button
                              type="button"
                              className="btn-make-default"
                              onClick={() => addr.id && handleSetDefault(addr.id)}
                          >
                            Đặt làm mặc định
                          </button>
                      )}
                    </div>
                  </div>
              ))
          ) : (
              <div className="col-12 text-center p-5">
                <p className="text-muted">Bạn chưa lưu địa chỉ nào.</p>
              </div>
          )}
        </div>
      </div>
  );
};

export default AddressTab;