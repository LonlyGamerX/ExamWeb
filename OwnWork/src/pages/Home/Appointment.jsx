import { useState, useEffect } from "react";
import appointmentIMG from "../../imgs/appointment-img.jpg";
import { PostAppointment, GetTreatment } from "../../components/API";

const Appointment = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [treatment, setTreatment] = useState("");
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchTreatments = async () => {
      const treatmentData = await GetTreatment();
      setTreatments(treatmentData);
    };

    fetchTreatments();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const appointmentData = {
      name,
      email,
      phone,
      date,
      time,
      notes,
      treatment,
    };

    await PostAppointment(appointmentData);

    setName("");
    setEmail("");
    setPhone("");
    setDate("");
    setTime("");
    setNotes("");
    setTreatment("");
  };

  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const maxDate = new Date(today);
  maxDate.setMonth(maxDate.getMonth() + 6);

  return (
    <>
      <div className="row AppoinmentMargin">
        <section className="col-lg-4 pe-0">
          <img src={appointmentIMG} alt="appointment" className="img-fluid" />
        </section>
        <section className="col-lg-8 new-white-bg d-flex align-items-center">
          <form
            onSubmit={handleFormSubmit}
            className="appointment-form ms-md-5 ms-sm-5"
          >
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="text"
                  className="input-grey input-lg form-control"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="email"
                  className="input-grey input-lg form-control"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <select
                  className="input-grey input-lg form-select"
                  value={treatment}
                  onChange={(e) => setTreatment(e.target.value)}
                  required
                >
                  <option value="">Select a service</option>
                  {treatments.map((treatment) => (
                    <option key={treatment._id} value={treatment._id}>
                      {treatment.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="tel"
                  className="input-grey input-lg form-control"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={(e) => {
                    const inputPhone = e.target.value.replace(/[^0-9+]/g, ""); // Remove non-numeric characters except "+"
                    setPhone(inputPhone);
                  }}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 mb-3">
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  className="input-grey input-lg form-control"
                  min={tomorrow.toISOString().split("T")[0]}
                  max={maxDate.toISOString().split("T")[0]}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <input
                  type="time"
                  className="input-grey input-lg form-control"
                  min="08:00"
                  max="16:00"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 mb-3">
                <textarea
                  className="input-grey input-lg form-control"
                  placeholder="Notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                ></textarea>
              </div>
            </div>
            <button type="submit" className="w-50 btn btn-pink btn-round mb-2">
              Submit
            </button>
          </form>
        </section>
      </div>
    </>
  );
};

export default Appointment;
