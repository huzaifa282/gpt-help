<template>
    <footer class="footer">
        <div class="brand" style="justify-content: space-between;">
            <div class="brand-left">
                <img class="brand-logo" src="/src/assets/images/cyde.avif" alt="Cyde logo">
                <h1 class="brand-name">Cyde.xyz</h1>
            </div>
            <p>Cyde.xyz is not in any way affiliated with the official Minecraft website or brand.</p>
        </div>
        <div class="container">
            <p>&copy; 2024 Cyde.xyz. All Rights Reserved.</p>
            <ul class="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/clients">Clients</a></li>
                <li><a href="/texture-packs">Texture packs </a></li>
                <li><a href="/faq">FAQ</a></li>
            </ul>

            
            <ul class="footer-links">
                <li><a href="/termsofservice">Terms of Service</a></li>
                <li><a href="/privacypolicy">Privacy policy</a></li>
            </ul>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
};
</script>

<style scoped>
.footer {
    font-family: 'Poppins';
    font-size: 14px;
    background: linear-gradient(to bottom, var(--dark-1), var(--dark-0));
    color: var(--gray-5);
    padding: 0 max(40px, 5%);
    text-align: center;
    width: 100%;
    border-top: 1px solid var(--dark-3);
}

.brand {
    display: flex;
    align-items: center;
    justify-content: left;
    padding: 50px 10px;
    border-bottom: 1px solid var(--dark-3);
    gap: 12px;
}

.brand-left {
    display: flex;
    align-items: center;
    gap: 12px;
}

.brand-logo {
    width: 26px;
    height: 100%;
    border-radius: 50%;
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
}

.brand-name {
    font-family: 'Poppins';
    font-size: 16px;
    font-weight: 600;
    color: var(--gray-1);
    letter-spacing: 0.5px;
}

.container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 0;
}

.footer-links {
    list-style: none;
    padding: 0;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    gap: 24px;
}

.footer-links li {
    margin: 0;
}

.footer-links a {
    color: var(--gray-6);
    transition: all 0.2s ease;
    text-decoration: none;
    font-weight: 500;
    font-size: 13px;
    letter-spacing: 0.3px;
}

.footer-links a:hover {
    color: var(--gray-2);
    text-decoration: none;
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    .container {
        flex-direction: column;
        gap: 20px;
    }
    
    .footer-links {
        gap: 16px;
    }

    .brand {
        padding: 30px 10px;
    }
    .container {
        padding: 20px 0;
    }
    .footer-links {
        gap: 12px;
    }
}
</style>