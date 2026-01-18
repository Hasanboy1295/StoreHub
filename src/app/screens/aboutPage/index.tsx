import React from "react";
import { Container } from "@mui/material";
import "../../../css/help.css";

const stats = [
  {
    icon: "fa-store",
    value: "10.5k",
    label: "Sellers active our site",
    highlight: false,
  },
  {
    icon: "fa-dollar-sign",
    value: "33k",
    label: "Monthly Product Sale",
    highlight: true,
  },
  {
    icon: "fa-users",
    value: "45.5k",
    label: "Customer active in our site",
    highlight: false,
  },
  {
    icon: "fa-sack-dollar",
    value: "25k",
    label: "Annual gross sale in our site",
    highlight: false,
  },
];

const team = [
  {
    name: "Tom Cruise",
    role: "Founder & Chairman",
    img: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    name: "Emma Watson",
    role: "Managing Director",
    img: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Will Smith",
    role: "Product Designer",
    img: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

// Example icon URLs (replace with your own if you want)
const socialIcons = {
  twitter: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/twitter.svg",
  instagram: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
  linkedin: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
};

export default function AboutPage() {
  return (
    <div className="about-page">
      <Container>
        <div className="about-container">
          {/* Top section: Story and Image */}
          <div style={{ display: "flex", gap: 40, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <h2 className="about-title">Our Story</h2>
              <p className="about-desc">
                Launched in 2015, Exclusive is South Asia’s premier online shopping
                marketplace with an active presence in Bangladesh. Supported by
                wide range of tailored marketing, data and service solutions,
                Exclusive has 10,500 sellers and 300 brands and serves 3 million
                customers across the region.
                <br />
                <br />
                Exclusive has more than 1 Million products to offer, growing at a
                very fast. Exclusive offers a diverse assortment in categories
                ranging from consumer.
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <img
                src="https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg"
                alt="Our Story"
                className="about-main-img"
                style={{
                  width: "100%",
                  borderRadius: 16,
                  objectFit: "cover",
                  minHeight: 320,
                  maxHeight: 340,
                }}
              />
            </div>
          </div>

          {/* Stats row */}
          <div className="about-stats-row">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`about-stat-card${stat.highlight ? " about-stat-card--highlight" : ""}`}
              >
                <div className={`about-stat-icon fa ${stat.icon}`} />
                <div className="about-stat-value">{stat.value}</div>
                <div className="about-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Team row */}
          <div className="about-team-row">
            {team.map((member) => (
              <div className="about-team-card" key={member.name}>
                <img
                  src={member.img}
                  alt={member.name}
                  className="about-team-avatar"
                />
                <div className="about-team-name">{member.name}</div>
                <div className="about-team-role">{member.role}</div>
                <div className="about-team-socials">
                  <img
                    src={socialIcons.twitter}
                    alt="twitter"
                    style={{ width: 22, height: 22, marginRight: 8, filter: "grayscale(1)" }}
                  />
                  <img
                    src={socialIcons.instagram}
                    alt="instagram"
                    style={{ width: 22, height: 22, marginRight: 8, filter: "grayscale(1)" }}
                  />
                  <img
                    src={socialIcons.linkedin}
                    alt="linkedin"
                    style={{ width: 22, height: 22, filter: "grayscale(1)" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}