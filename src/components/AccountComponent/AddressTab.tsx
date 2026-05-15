import { useEffect, useMemo, useState } from "react";
import addressApi from "../../api/addressApi";
import type { CreateAddressRequest } from "../../modelRequest/CreateAddressRequest";
import type { UpdateAddressRequest } from "../../modelRequest/UpdateAddressRequest";
import type { AddressModel } from "../../models/AddressModel";

type AddressFormData = {
  fullName: string;
  phone: string;
  street: string;
  ward: string;
  district: string;
  province: string;
  isDefault: boolean;
};

const emptyForm: AddressFormData = {
  fullName: "",
  phone: "",
  street: "",
  ward: "",
  district: "",
  province: "",
  isDefault: false,
};

const isAddressDefault = (address: AddressModel): boolean => {
  if (typeof address.isDefault === "boolean") {
    return address.isDefault;
  }

  return Boolean(address.default);
};

const AddressTab = () => {
  const [addresses, setAddresses] = useState<AddressModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);
  const [formData, setFormData] = useState<AddressFormData>(emptyForm);

  const sortedAddresses = useMemo(() => {
    return [...addresses].sort((a, b) => Number(isAddressDefault(b)) - Number(isAddressDefault(a)));
  }, [addresses]);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await addressApi.getMyAddresses();
      setAddresses(data);
    } catch (err) {
      console.error("Loi khi tai danh sach dia chi:", err);
      setError("Khong the tai danh sach dia chi. Vui long thu lai.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAddresses();
  }, []);

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingAddressId(null);
    setIsFormVisible(false);
  };

  const handleCreateClick = () => {
    setEditingAddressId(null);
    setFormData(emptyForm);
    setIsFormVisible(true);
  };

  const handleEditClick = (address: AddressModel) => {
    setEditingAddressId(address.id);
    setFormData({
      fullName: address.fullName,
      phone: address.phone,
      street: address.street,
      ward: address.ward,
      district: address.district,
      province: address.province,
      isDefault: isAddressDefault(address),
    });
    setIsFormVisible(true);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      if (editingAddressId === null) {
        const payload: CreateAddressRequest = {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          street: formData.street.trim(),
          ward: formData.ward.trim(),
          district: formData.district.trim(),
          province: formData.province.trim(),
          isDefault: formData.isDefault,
        };
        await addressApi.create(payload);
      } else {
        const payload: UpdateAddressRequest = {
          fullName: formData.fullName.trim(),
          phone: formData.phone.trim(),
          street: formData.street.trim(),
          ward: formData.ward.trim(),
          district: formData.district.trim(),
          province: formData.province.trim(),
          isDefault: formData.isDefault,
        };
        await addressApi.update(editingAddressId, payload);
      }

      await fetchAddresses();
      resetForm();
    } catch (err) {
      console.error("Khong the luu dia chi:", err);
      alert("Khong the luu dia chi. Vui long thu lai.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSetDefault = async (addressId: number) => {
    try {
      await addressApi.setDefault(addressId);
      await fetchAddresses();
    } catch (err) {
      console.error("Khong the dat dia chi mac dinh:", err);
      alert("Khong the cap nhat dia chi mac dinh.");
    }
  };

  const handleDelete = async (addressId: number) => {
    if (!window.confirm("Ban co chac chan muon xoa dia chi nay?")) {
      return;
    }

    try {
      await addressApi.delete(addressId);
      await fetchAddresses();
    } catch (err) {
      console.error("Khong the xoa dia chi:", err);
      alert("Khong the xoa dia chi. Vui long thu lai.");
    }
  };

  return (
    <div className="tab-pane fade" id="addresses">
      <div className="section-header" data-aos="fade-up">
        <h2>Dia chi cua toi</h2>
        <div className="header-actions">
          <button
            type="button"
            className="btn btn-dark rounded-pill shadow-sm px-4"
            onClick={handleCreateClick}
          >
            <i className="bi bi-plus-lg me-2"></i>
            Them dia chi moi
          </button>
        </div>
      </div>

      {isFormVisible && (
        <div className="settings-section mb-4" data-aos="fade-up">
          <h3>{editingAddressId === null ? "Them dia chi" : "Cap nhat dia chi"}</h3>
          <form className="settings-form" onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label htmlFor="addressFullName" className="form-label">
                  Ho va ten
                </label>
                <input
                  id="addressFullName"
                  type="text"
                  className="form-control"
                  value={formData.fullName}
                  onChange={(event) => setFormData((prev) => ({ ...prev, fullName: event.target.value }))}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="addressPhone" className="form-label">
                  So dien thoai
                </label>
                <input
                  id="addressPhone"
                  type="tel"
                  className="form-control"
                  value={formData.phone}
                  onChange={(event) => setFormData((prev) => ({ ...prev, phone: event.target.value }))}
                  required
                />
              </div>
              <div className="col-md-12">
                <label htmlFor="addressStreet" className="form-label">
                  So nha, duong
                </label>
                <input
                  id="addressStreet"
                  type="text"
                  className="form-control"
                  value={formData.street}
                  onChange={(event) => setFormData((prev) => ({ ...prev, street: event.target.value }))}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="addressWard" className="form-label">
                  Phuong/Xa
                </label>
                <input
                  id="addressWard"
                  type="text"
                  className="form-control"
                  value={formData.ward}
                  onChange={(event) => setFormData((prev) => ({ ...prev, ward: event.target.value }))}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="addressDistrict" className="form-label">
                  Quan/Huyen
                </label>
                <input
                  id="addressDistrict"
                  type="text"
                  className="form-control"
                  value={formData.district}
                  onChange={(event) => setFormData((prev) => ({ ...prev, district: event.target.value }))}
                  required
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="addressProvince" className="form-label">
                  Tinh/Thanh pho
                </label>
                <input
                  id="addressProvince"
                  type="text"
                  className="form-control"
                  value={formData.province}
                  onChange={(event) => setFormData((prev) => ({ ...prev, province: event.target.value }))}
                  required
                />
              </div>
              <div className="col-md-12">
                <label className="form-check-label d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={formData.isDefault}
                    onChange={(event) =>
                      setFormData((prev) => ({ ...prev, isDefault: event.target.checked }))
                    }
                  />
                  Dat lam dia chi mac dinh
                </label>
              </div>
            </div>

            <div className="form-buttons mt-3">
              <button type="submit" className="btn-save" disabled={submitting}>
                {submitting ? "Dang luu..." : "Luu dia chi"}
              </button>
              <button type="button" className="btn btn-outline-secondary ms-2" onClick={resetForm}>
                Huy
              </button>
            </div>
          </form>
        </div>
      )}

      {loading && <div className="text-center p-5">Dang tai du lieu...</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      {!loading && !error && (
        <div className="addresses-grid">
          {sortedAddresses.length > 0 ? (
            sortedAddresses.map((address, index) => {
              const defaultAddress = isAddressDefault(address);

              return (
                <div
                  key={address.id}
                  className={`address-card ${defaultAddress ? "default" : ""}`}
                  data-aos="fade-up"
                  data-aos-delay={100 * (index + 1)}
                >
                  <div className="card-header">
                    <h4>{defaultAddress ? "Dia chi mac dinh" : `Dia chi ${index + 1}`}</h4>
                    {defaultAddress && <span className="default-badge">Mac dinh</span>}
                  </div>
                  <div className="card-body">
                    <p className="address-text">
                      {address.street}
                      <br />
                      {address.ward}
                      <br />
                      {address.district}, {address.province}
                      <br />
                      Viet Nam
                    </p>
                    <div className="contact-info">
                      <div>
                        <i className="bi bi-person me-2"></i> {address.fullName}
                      </div>
                      <div>
                        <i className="bi bi-telephone me-2"></i> {address.phone}
                      </div>
                    </div>
                  </div>
                  <div className="card-actions">
                    <button type="button" className="btn-edit" onClick={() => handleEditClick(address)}>
                      <i className="bi bi-pencil me-1"></i> Chinh sua
                    </button>
                    <button type="button" className="btn-remove" onClick={() => handleDelete(address.id)}>
                      <i className="bi bi-trash me-1"></i> Xoa
                    </button>
                    {!defaultAddress && (
                      <button type="button" className="btn-make-default" onClick={() => handleSetDefault(address.id)}>
                        Dat lam mac dinh
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-12 text-center p-5">
              <p className="text-muted">Ban chua luu dia chi nao.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddressTab;