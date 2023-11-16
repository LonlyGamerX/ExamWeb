import { Link } from "react-router-dom";

const DeleteSuccessful = () => {
  return (
    <>
      <section className="col-lg-12">
        <h1 className="text-center text-black">Delete successfully</h1>
        <p className="text-center text-black">
          <Link to="/">Go back to dashboard</Link>
        </p>
      </section>
    </>
  );
};

export default DeleteSuccessful;
