import type React from "react";
import type { ProductModel } from "../../models/ProductModel";
import { useEffect, useState } from "react";

const ProductGallery: React.FC<{ product: ProductModel }> = ({ product }) => {
  const images = product.images || [];
  const defaultImg = "/assets/img/no-image.png";

  const [activeImage, setActiveImage] = useState<string>(defaultImg);

  useEffect(() => {
    if (images.length > 0) {
      setActiveImage(images[0].imageUrl);
    }
  }, [product]);

  return (
    <div className="col-lg-7" data-aos="zoom-in" data-aos-delay="150">
      <div className="product-gallery">
        {/* KHU VỰC ẢNH CHÍNH (ẢNH TO) */}
        <div className="main-showcase">
          <div className="image-zoom-container">
            <img
              src={activeImage}
              alt={product.name}
              className="img-fluid main-product-image drift-zoom"
              id="main-product-image"
              data-zoom={activeImage}
            />

            <div className="image-navigation">
              <button
                className="nav-arrow prev-image image-nav-btn prev-image"
                type="button"
              >
                <i className="bi bi-chevron-left"></i>
              </button>
              <button
                className="nav-arrow next-image image-nav-btn next-image"
                type="button"
              >
                <i className="bi bi-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>

        {/* KHU VỰC THUMBNAIL (ẢNH NHỎ) */}
        <div className="thumbnail-grid">
          {images.length > 0 ? (
            images.map((img) => (
              <div
                key={img.id}
                className={`thumbnail-wrapper thumbnail-item ${activeImage === img.imageUrl ? "active" : ""}`}
                onClick={() => setActiveImage(img.imageUrl)}
                style={{ cursor: "pointer" }} // Bấm vào ảnh nhỏ thì set lại ảnh to
              >
                <img
                  src={img.imageUrl}
                  alt={`Thumbnail ${img.id}`}
                  className="img-fluid"
                />
              </div>
            ))
          ) : (
            <p className="text-muted">Không có hình ảnh</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;
