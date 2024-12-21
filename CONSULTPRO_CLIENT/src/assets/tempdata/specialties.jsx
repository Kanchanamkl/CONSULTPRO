// src/assets/specialties.js
import { FaHeadset, FaClipboardCheck, FaRegHandshake } from "react-icons/fa";

const services = [
  {
    id: 1,
    title: "Online Counseling",
    description: "Get support from licensed therapists from the comfort of your home.",
    icon: <FaHeadset />,
  },
  {
    id: 2,
    title: "Therapeutic Workshops",
    description: "Join group sessions led by professionals for collective healing.",
    icon: <FaClipboardCheck />,
  },
  {
    id: 3,
    title: "24/7 Support",
    description: "Access mental health resources and assistance any time of the day.",
    icon: <FaRegHandshake />,
  },
];

export default services;
