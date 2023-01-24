import controller from "../images/controller.png";

function MainPageComponent() {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold">MyGamesList</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">
          <img
            class="img-fluid "
            src={controller}
            alt="video game controller"
          />
        </p>
      </div>
    </div>
  );
}

export default MainPageComponent;
