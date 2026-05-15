import AddressTab from "../components/AccountComponent/AddressTab";
import OrderTab from "../components/AccountComponent/OrderTab";
import ProfileMenu from "../components/AccountComponent/ProfileMenu";
import ReviewTab from "../components/AccountComponent/ReviewTab";
import SettingTab from "../components/AccountComponent/SettingTab";
import { PageTitle } from "../components/utils/PageTitle";

const AccountPage = () => {
  return (
    <main className="main">
      <PageTitle
        title="Danh mục sản phẩm"
        breadcrumbs={[
          { label: "Trang chủ", path: "/home" },
          { label: "Tài khoản" },
        ]}
      />

      {/* Account Section */}
      <section id="account" className="account section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          {/* Mobile Menu Toggle */}
          <div className="mobile-menu d-lg-none mb-4">
            <button
              className="mobile-menu-toggle"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#profileMenu"
            >
              <i className="bi bi-grid"></i>
              <span>Menu</span>
            </button>
          </div>

          <div className="row g-4">
            <div className="col-lg-3">
              <ProfileMenu />
            </div>

            {/* Content Area */}
            <div className="col-lg-9">
              <div className="content-area">
                <div className="tab-content">
                  <OrderTab />
                  <ReviewTab />
                  <AddressTab />
                  <SettingTab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AccountPage;
