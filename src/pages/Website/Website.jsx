import React from "react";
import { useLocation } from 'react-router-dom';
// import './main.css';
// import './styles.css';

export const Website = () => {
    
    const params = useLocation();
    const websiteId = params?.search?.split('=').pop();

    console.log('Website Id : ', websiteId);

    return(
        <>
            <section class="desktop">
                <div class="container-fluid px-5">
                <h2 class="centered-heading">Team section</h2>
                <p class="centered-subheading">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse tincidunt sagittis eros. Quisque quis euismod lorem.</p>
                <div class="category-grid">
                    <div class="category-card">
                    <img src="https://onemg.gumlet.io/diagnostics%2F2023-11%2F1699443647_skinn.webp?format=auto" loading="lazy" alt="" class="team-member-image-two" />
                    </div>
                    <div class="category-card">
                    <img src="https://onemg.gumlet.io/diagnostics%2F2023-11%2F1699443647_skinn.webp?format=auto" loading="lazy" alt="" class="team-member-image-two" />
                    </div>
                    <div class="category-card">
                    <img src="https://onemg.gumlet.io/diagnostics%2F2023-11%2F1699443647_skinn.webp?format=auto" loading="lazy" alt="" class="team-member-image-two" />
                    </div>
                    <div class="category-card">
                    <img src="https://onemg.gumlet.io/diagnostics%2F2023-11%2F1699443647_skinn.webp?format=auto" loading="lazy" alt="" class="team-member-image-two" />
                    </div>
                    <div class="category-card">
                    <img src="https://onemg.gumlet.io/diagnostics%2F2023-11%2F1699443647_skinn.webp?format=auto" loading="lazy" alt="" class="team-member-image-two" />
                    </div>
                    <div class="category-card">
                    <img src="https://onemg.gumlet.io/diagnostics%2F2023-11%2F1699443647_skinn.webp?format=auto" loading="lazy" alt="" class="team-member-image-two" />
                    </div>
                </div>
                </div>
            </section>
        </>
    )
}