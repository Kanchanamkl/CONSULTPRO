import { useEffect, useState, useContext } from "react";
import DatePicker from "../../components/DatePicker/DatePicker";
import BillingPopup from "../../components/BillingPopup/BillingPopup";
import { useLocation, useNavigate } from "react-router-dom";
import { IoMdCloseCircle } from "react-icons/io";
import { StoreContext } from "../../StoreContext/StoreContext";
import timeSlots from "../../assets/timeSlots";
import "./BookingPageStyels.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const BookingPage = () => {
  const { selectedCounselor, userId } = useContext(StoreContext);
  const [query, setQuery] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [menuOpen, setMenuOpen] = useState(true);
  const navigate = useNavigate();
  const [filteredTags, setFilteredTags] = useState("");
  useEffect(() => {
    setSelectedSlot(null);
  }, []);

  const formatTimeSlot = (slot) => {
    return `${slot.start.time} - ${slot.end.time}`;
  };
  const getFirstDayOfCurrentMonth = () => {
    const now = new Date();
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState(getFirstDayOfCurrentMonth());
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/api/appointments/get_appointment_slots_by_date_and_counselorId?appointmentDate=${
            selectedDate.toISOString().split("T")[0]
          }&counselorId=${selectedCounselor.id}`
        );
        const bookedSlots = response.data;
        const availableSlots = timeSlots
          .map(formatTimeSlot)
          .filter((slot) => !bookedSlots.includes(slot));
        setFilteredTags(availableSlots);
      } catch (error) {
        console.error("Error fetching booked slots:", error);
      }
    };

    fetchBookedSlots();
  }, [selectedDate]);
  const tags_ = timeSlots.map(formatTimeSlot);

  // const filteredTags = tags_.filter(
  //     (item) =>
  //         item
  //             .toLocaleLowerCase()
  //             .includes(query.toLocaleLowerCase().trim()) &&
  //         item !== selectedSlot
  // );

  useEffect(() => {
    setSelectedSlot(null);
  }, [selectedDate]);

  const [showPopup, setShowPopup] = useState(false);
  const appointmentDetails = {
    date: selectedDate.toLocaleDateString(),
    counselor: selectedCounselor ? selectedCounselor : "",
    selectedSlot: selectedSlot,
  };

  const handleCheckout = () => {
    if (!selectedSlot) {
      toast.error("Please select a time slot.");
      return;
    }
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handlePaymentCompletion = async (orderId) => {
    console.log("Payment completed. OrderID:" + orderId);
    console.log("Selected Slot:", selectedSlot);
    console.log("Selected Counselor:", selectedCounselor);
    if (orderId) {
      try {
        if (!selectedCounselor) {
          throw new Error("Selected counselor is not defined");
        }
        if (!userId) {
          throw new Error("User ID is not defined");
        }
        if (!selectedDate) {
          throw new Error("Selected date is not defined");
        }
        if (!selectedSlot) {
          throw new Error("Selected slot is not defined");
        }

        const [startTime, endTime] = selectedSlot.split(" - ");
        const response = await axios.post(
          "http://localhost:8081/api/appointments/create",
          {
            counselorId: selectedCounselor.id,
            clientId: userId,
            date: selectedDate.toISOString().split("T")[0],
            startTime: startTime,
            endTime: endTime,
            description: "Training session",
          }
        );

        console.log("Booking response:", response.data);
        setShowPopup(false);
        setTimeout(() => {
          window.location.replace("/appointments");
        }, 1000);
        setSelectedSlot(null);
      } catch (error) {
        console.error("Error creating booking:", error);
      }
    }
  };

  if (window.payhere) {
    window.payhere.onCompleted = function onCompleted(orderId) {
      handlePaymentCompletion(orderId);
    };
    window.payhere.onDismissed = function onDismissed() {
      console.log("Payment dismissed");
    };

    window.payhere.onError = function onError(error) {
      console.log("Error: " + error);
    };
  } else {
    console.error("payhere is not defined");
  }

  const location = useLocation();
  const { consultant } = location.state || {};

  useEffect(() => {
    if (!selectedCounselor) {
      navigate("/appointments");
    }
  }, [selectedCounselor, navigate]);

  return (
    <div className="booking-container">
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      {selectedCounselor && (
        <div className="counselor-container">
          <div className="counselor-container-left">
            <img
              src={selectedCounselor.profilePic}
              alt={`${selectedCounselor.firstName} ${selectedCounselor.lastName}`}
              className="consultn-img"
            />
          </div>
          <div className="counselor-container-right">
            <h3 className="consultn-name">
              {selectedCounselor.firstName}
              {selectedCounselor.lastName}
            </h3>
            <p className="consultn-detail-item">
              {" "}
              Specialize : {selectedCounselor.specialization}
            </p>
            <p className="consultn-detail-item">
              Email : {"thenuka@gmail.com"}
            </p>
            <p className="consultn-detail-item">
              Mobile : {selectedCounselor.contact}
            </p>
            <p className="consultn-detail-item">
              City : {selectedCounselor.city}
            </p>
          </div>
        </div>
      )}

      <div className="slot-selection">
        <div className="selector-section">
          <DatePicker
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        </div>
        <div className="availability-info">
          <p>Available Time Slots On:</p>
          <label>{selectedDate.toLocaleDateString()}</label>
        </div>

        {selectedSlot && (
          <div className="selected-slots">
            <div className="slot-label">Selected Slot :</div>

            <div className="slot-chips">
              <div className="slot-item">
                {selectedSlot}
                <div onMouseDown={(e) => e.preventDefault()}>
                  <IoMdCloseCircle
                    onClick={() => {
                      setSelectedSlot(null);
                    }}
                    size="20px"
                    style={{ cursor: "pointer" }}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
        <p>Pick Your Slot:</p>
        {menuOpen && (
          <div className="slot-menu">
            <ul>
              {filteredTags.length ? (
                filteredTags.map((tag, index) => (
                  <li
                    key={`${tag}-${index}`}
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => {
                      setMenuOpen(true);
                      setSelectedSlot(tag);
                      setQuery("");
                    }}
                  >
                    {tag}
                  </li>
                ))
              ) : (
                <li>No Slots available</li>
              )}
            </ul>
          </div>
        )}
        <div className="checkout-button">
          <button onClick={handleCheckout}>Proceed To Checkout</button>
          {showPopup && (
            <BillingPopup
              appointmentDetails={appointmentDetails}
              onClose={closePopup}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
