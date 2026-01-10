import React from "react";
import { Container, Box } from "@mui/material";
import "../../../css/home.css";
import { plans } from "../../../lib/data/plans";

export default function Events() {
  // take up to 4 items from plans for the layout
   // Use hardcoded featured items with guaranteed image paths
  const featuredItems = [
    {
      img: "/img/ps5.png",
      title: "PlayStation 5",
      desc: "Black and White version of the PS5 coming out on sale.",
    },
    {
      img: "/img/womencollection.jpg",
      title: "Women's Collections",
      desc: "Featured woman collections that give you another vibe.",
    },
    {
      img: "/img/speaker.png",
      title: "Speakers",
      desc: "Amazon wireless speakers",
    },
    {
      img: "/img/perfume.png",
      title: "Perfume",
      desc: "GUCCI INTENSE OUD EDP",
    },
  ];

  const hero = featuredItems[0];
  const rightTop = featuredItems[1];
  const rightBottomA = featuredItems[2];
  const rightBottomB = featuredItems[3];

  return (
    <div className="events-frame">
      <Container>
        <div className="events-main">
          <Box className="events-text">
            <span className="category-title">Featured</span>
            <h2 className="events-heading">New Arrival</h2>
          </Box>

          <div className="events-info">
            {/* Left hero */}
            <div className="events-info-frame">
              <div className="events-img">
                <img src={hero.img} alt={hero.title} />
                <Box className="events-desc">
                  <div className="events-bott">
                    <div className="bott-left">
                      <div className="event-title-speaker">
                        <strong>{hero.title}</strong>
                      </div>
                      <p className="text-desc">{hero.desc}</p>
                      <div style={{ marginTop: 8 }}>
                        <button className="events-cta">Shop Now</button>
                      </div>
                    </div>
                  </div>
                </Box>
              </div>
            </div>

            {/* Right stacked */}
            <div className="events-right-column">
              <div className="events-right-top">
                <img src={rightTop.img} alt={rightTop.title} />
                <Box className="events-desc">
                  <strong>{rightTop.title}</strong>
                  <div style={{ marginTop: 6, fontSize: 13 }}>{rightTop.desc}</div>
                  <div style={{ marginTop: 8 }}>
                    <button className="events-cta small">Shop Now</button>
                  </div>
                </Box>
              </div>

              <div className="events-right-bottom">
                <div className="events-right-small">
                  <img src={rightBottomA.img} alt={rightBottomA.title} />
                  <Box className="events-desc">
                    <strong>{rightBottomA.title}</strong>
                    <div style={{ marginTop: 6, fontSize: 12 }}>{rightBottomA.desc}</div>
                    <div style={{ marginTop: 8 }}>
                      <button className="events-cta tiny">Shop Now</button>
                    </div>
                  </Box>
                </div>

                <div className="events-right-small">
                  <img src={rightBottomB.img} alt={rightBottomB.title} />
                  <Box className="events-desc">
                    <strong>{rightBottomB.title}</strong>
                    <div style={{ marginTop: 6, fontSize: 12 }}>{rightBottomB.desc}</div>
                    <div style={{ marginTop: 8 }}>
                      <button className="events-cta tiny">Shop Now</button>
                    </div>
                  </Box>
                </div>
              </div>
            </div>
          </div>

          {/* optional pager / arrows row (kept for layout) */}
        
        </div>
      </Container>
    </div>
  );
}