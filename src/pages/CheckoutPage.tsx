import CheckoutForm from "../components/CheckoutComponent/CheckoutForm";
import OrderSummary from "../components/CheckoutComponent/OrderSummary";
import TermAndPrivacy from "../components/CheckoutComponent/TermAndPrivacy";
import { PageTitle } from "../components/utils/PageTitle";

const CheckoutPage = () => {
  return (
    <main className="main">
      <PageTitle
        title="Danh mục sản phẩm"
        breadcrumbs={[
          { label: "Trang chủ", path: "/home" },
          { label: "Thanh toán" },
        ]}
      />

      <section id="checkout" className="checkout section">
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row">
            <div className="col-lg-7">
              <CheckoutForm />
            </div>

            <div className="col-lg-5">
              <OrderSummary />
            </div>
          </div>

          <TermAndPrivacy />
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;
