import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/catcard.css';
import {toast} from 'react-toastify'

const CatCard = ({ isLogin }) => {
    const [categories, setCategories] = useState([]);
    const [isHovered, setIsHovered] = useState(false);
    const containerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const res = await axios.get('https://foodapp-mern-zkg0.onrender.com/api/categories');
                setCategories(res.data);
            } catch (err) {
                console.error("Error fetching categories:", err);
            }
        })();
    }, []);

    useEffect(() => {
        if (containerRef.current && !isHovered) {
            const container = containerRef.current;
            let scrollInterval = null;
            let scrollAmount = 1;

            const startAutoScroll = () => {
                scrollInterval = setInterval(() => {
                    container.scrollLeft += scrollAmount;
                    if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
                        container.scrollLeft = 0;
                    }
                },10);
            };

            startAutoScroll();

            return () => {
                clearInterval(scrollInterval);
            };
        }
    }, [isHovered]);

    const handleCategoryClick = (categoryId) => {
        if (isLogin) {
            navigate(`/item/${categoryId}`);
        } else {
            toast.error('Please log in or sign up to continue.', {
                position: 'bottom-right',
                duration: 2000
            });
        }
    };

    const scrollLeft = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: -240, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            containerRef.current.scrollBy({ left: 240, behavior: 'smooth' });
        }
    };

    return (
        <div
            className='categories-marquee'
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <button className='scroll-button left' onClick={scrollLeft}>&lt;</button>
            <div
                className='categories-scroll-container'
                ref={containerRef}
            >
                {categories.map((category) => (
                    <div key={category._id} className='category-card'>
                        <img src={category.img} alt={category.categoryName} />
                        <div className='category-info'>
                            <h3>{category.categoryName}</h3>
                            <button onClick={() => handleCategoryClick(category._id)}>
                                {isLogin ? 'View Items' : 'Log in to view'}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className='scroll-button right' onClick={scrollRight}>&gt;</button>
        </div>
    );
};

export default CatCard;
