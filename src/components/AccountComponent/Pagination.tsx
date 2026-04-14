export const Pagination = () => {
  return (
    <div className="pagination-wrapper" data-aos="fade-up">
      <button type="button" className="btn-prev" disabled>
        <i className="bi bi-chevron-left"></i>
      </button>
      <div className="page-numbers">
        <button type="button" className="active">
          1
        </button>
        <button type="button">2</button>
        <button type="button">3</button>
        <span>...</span>
        <button type="button">12</button>
      </div>
      <button type="button" className="btn-next">
        <i className="bi bi-chevron-right"></i>
      </button>
    </div>
  );
};
