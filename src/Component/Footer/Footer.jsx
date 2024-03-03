export default function Footer() {
  return (
    <>
      <div className="bg-secondary-subtle p-5  footer">
        <div>
          <h4 className="fw-bolder"> Get the Fresh Cart app </h4>
          <p className="text-muted">
            {" "}
            We will send you a link, open it on your phone to download the app{" "}
          </p>
          <div className="container-fluid d-flex justify-content-between">
            <input
              type="email"
              className="form-control w-75"
              placeholder="Eamil"
            />
            <button className="btn bg-main text-white me-5 ">
              Share App link
            </button>
          </div>

          <div className="container-fluid my-5 d-flex justify-content-between">
            <div className="d-flex">
              <h5 className="fw-bolder ">Payment Partners </h5>
              <img src="images/amazon.png" width={75} alt="" className="ms-2" />
              <img
                src="images/aex.png"
                width={75}
                height={35}
                className="ms-2"
                alt=""
              />
              <img
                src="images/master.png"
                width={75}
                height={35}
                className="ms-2"
                alt=""
              />
              <img
                src="images/paypal.png"
                width={75}
                height={35}
                className="ms-2"
                alt=""
              />
            </div>

            <div className="d-flex">
              <h5 className="fw-bolder">Get deliveries with FreshCart</h5>
              <img
                src="images/apple.png"
                width={75}
                height={30}
                className="ms-2"
                alt=""
              />
              <img src="images/google.png" width={75} className="ms-2" alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
