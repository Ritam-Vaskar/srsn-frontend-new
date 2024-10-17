import React, { useRef } from "react";
import { useInView } from "framer-motion";
import "./styles/Donate.css";

const Donation = () => {
  const upperDivRef = useRef(null);
  const isInView = useInView(upperDivRef);

  return (
    <div className="donation_div">
      <div className="upper_div">
        <div className="img_div">
          <img
            src="https://cdn.prod.website-files.com/663d1907e337de23e83c30b2/66d6f294705d76c69a88c61d_53195289169_33f09c463d_c-1-.jpg"
            alt="Ramkrishna Photo"
            className="ramkrishna_img1"
          />
        </div>
        <div
          className="text_div"
          ref={upperDivRef}
          style={{
            background: isInView ? "#d2d0d0d0" : "white",
            borderRadius: "2rem",
            transition: "3s all",
          }}
        >
          <h3>
            Online Donations to Sri Sri Ramkrishna Sevasangha, Haridasnagar
          </h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Dignissimos explicabo nostrum placeat unde aspernatur, laudantium,
            illo expedita temporibus voluptate natus deleniti porro provident
            fugit amet omnis deserunt cum officiis aliquid! Lorem ipsum dolor
            sit, amet consectetur adipisicing elit. Iure esse tempora voluptas
            debitis facilis necessitatibus, laborum rem voluptatibus facere,
            quod inventore asperiores impedit placeat non deserunt explicabo
            eius nostrum sequi?
          </p>
        </div>
      </div>

      <div className="bank_details">
        <h3>
          Bank Details<p>(For Donation)</p>
        </h3>
        <table className="bank_table">
          <tr>
            <th>Bank Name</th>
            <td>State Bank of India</td>
          </tr>
          <tr>
            <th>Account Number</th>
            <td>30835951545</td>
          </tr>
          <tr>
            <th>IFSC Code</th>
            <td>SBIN0000098</td>
          </tr>
          <tr>
            <th>Address</th>
            <td>Jangipur, Raghunathganj, Murshidabad</td>
          </tr>
        </table>
      </div>

      <div className="donation_subject">
        <h3>Donations for Ramakrishna Sevasangha</h3>
        <div className="donation_table">
          <div className="left_sub">
            <p className={"item item1"}>
              Birthday celebrations of Sri Ramakrishna
            </p>
            <p className="item item3">
              Birthday celebrations of Sri Sarada Devi
            </p>
            <p className="item item5">
              Birthday celebrations of Swami Vivekananda
            </p>
            <p className="item item7">Maintenance of Ashram Building</p>
            <p className="item item9">Ashram monthly subscription</p>
          </div>

          <div className="right_sub">
            <p className="item item2">Relief Medical Aid Fund</p>
            <p className="item item4">Charitable Dispensary</p>
            <p className="item item6">
              Scholarship to poor and meritorious students
            </p>
            <p className="item item8">
              Ashram Annual program Cloth distribution to the poor
            </p>
            <p className="item item10">Foundation day celebration</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donation;
