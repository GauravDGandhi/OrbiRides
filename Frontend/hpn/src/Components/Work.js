import React from 'react';
import { useNavigate } from 'react-router-dom';
import BookRide from "../Assets/Book-ride-image.png";
import SearchRide from "../Assets/search-ride-image.png";
import HostRide from "../Assets/host-ride-image.png";

const Service = () => {
    const navigate = useNavigate();

    const serviceInfoDate = [
        {
            id: 1,
            image: BookRide,
            title: "Book Ride",
            description: "Book Ride is a ride-hailing service that allows you to book a ride from your location to your destination.",
            path: "/login",
        },
        {
            id: 2,
            image: SearchRide,
            title: "Search Ride",
            description: "Search Ride is a ride-hailing service that allows you to search for available rides in your area and book one that suits your needs.",
            path: "/display-ride",
        },
        {
            id: 3,
            image: HostRide,
            title: "Host Ride",
            description: "Host Ride is a ride-hailing service that allows you to host a ride and earn money by giving rides to people in your area.",
            path: "/login",
        },
    ];

    return (
        <div className="work-section-wrapper">
            <div className="work-section-top">
                <p className="primary-subheading"></p>
                <h1 className="primary-heading">Services We Provide</h1>
                <p className="primary-text">You can start exploring our services</p>
            </div>
            <div className="work-section-bottom">
                {serviceInfoDate.map((item) => (
                    <div 
                        className="work-section-info" 
                        key={item.id} 
                        onClick={() => navigate(item.path)}
                        style={{ cursor: "pointer" }} // Make it visually clickable
                    >
                        <div className="info-boxes-img-container">
                            <img src={item.image} alt={item.title} />
                        </div>
                        <h2>{item.title}</h2>
                        <p>{item.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Service;
