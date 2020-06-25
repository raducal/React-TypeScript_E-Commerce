import React from "react";
import paywith from "../../images/paywith.png";
import {
  FaFacebookSquare,
  FaInstagramSquare,
  FaTwitterSquare,
  FaYoutubeSquare,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section className="servicesSection">
      <div className="servicesContainer">
        <h3>Discover GAME</h3>
        <div className="services">
          <ContactInfo
            heading="Our Products"
            listItems={["PS4 Games", "Switch Games", "Bundles"]}
            image=""
          />
          <ContactInfo
            heading="Our Services"
            listItems={[
              "Repair Service",
              "Track an order",
              "Delivery Information",
              "Click & Collect",
            ]}
            image=""
          />
          <ContactInfo
            heading="Customer Services"
            listItems={[
              "Order Tracking",
              "Returns Policy",
              "Privacy Policy",
              "Terms & Conditions",
              "Cookie Policy",
            ]}
            image=""
          />
          <ContactInfo heading="Pay With" listItems={[]} image={paywith} />
        </div>
        <div>
          <ContactInfo
            heading="Get In Touch"
            listItems={[
              <FaFacebookSquare size={50} />,
              <FaTwitterSquare size={50} />,
              <FaInstagramSquare size={50} />,
              <FaYoutubeSquare size={50} />,
            ]}
            image=""
          />
        </div>
      </div>
    </section>
  );
};

interface IProps {
  heading: string;
  listItems: any[];
  image: string;
}

const ContactInfo: React.FC<IProps> = ({ heading, listItems, image }) => {
  return (
    <div>
      <h3 style={{ paddingBottom: "0.5rem" }}>{heading}</h3>
      {listItems.length > 0 ? (
        <ul style={{ display: heading === "Get In Touch" ? "flex" : "block" }}>
          {listItems.map((item: any, i: number) => {
            return <li key={i}>{item}</li>;
          })}
        </ul>
      ) : (
        <img src={image} alt="img" />
      )}
    </div>
  );
};

export default Contact;
