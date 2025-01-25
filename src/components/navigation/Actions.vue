<script setup>
defineProps({
    isMobileMenuOpen: Boolean
});
</script>

<template>
    <div class="actions" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
        <a href="https://www.youtube.com/@cydeYT" target="_blank" class="action-button highlighted-youtube" data-title="youtube.com/@cydeYT">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/>
            </svg>
        </a>
        <a href="https://discord.gg/cyde" target="_blank" class="action-button highlighted-discord" data-title="discord.gg/cyde">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.118.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.419c0 1.334-.946 2.419-2.157 2.419z"/>
            </svg>
        </a>
        <a href="https://x.com/TrueCyde" target="_blank" class="action-button highlighted-twitter" data-title="x.com/TrueCyde">
            <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
        </a>
    </div>
</template>

<style scoped>
.actions {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 6.5px;
}
.action-button {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Poppins';
    font-size: 12.5px;
    font-weight: 500;
    color: white;
    padding: 0px;
    width: 36px;
    height: 31px;
    border-radius: 8px;
    border: none;
    background: rgba(255, 255, 255, 0.04);
    transition: all 0.25s ease-in-out;
    cursor: pointer;
    gap: 6px;
    position: relative;
}
.action-button:hover {
    background: rgba(255, 255, 255, 0.075);
}
.action-button:active {
    transform: scale(0.95);
}
.highlighted-youtube {
    background: linear-gradient(300deg, var(--red-8), var(--red-9) 50%) !important;
}
.highlighted-discord {
    background: linear-gradient(300deg, var(--indigo-9), var(--violet-9) 50%) !important;
}
.highlighted-twitter {
    background: linear-gradient(300deg, var(--blue-6), var(--blue-8) 50%) !important;
}
.highlighted-youtube:hover,
.highlighted-discord:hover,
.highlighted-twitter:hover {
    filter: brightness(115%);
}

.icon {
    width: 18px;
    height: 18px;
    align-self: center;
}

.action-button:hover::after {
    content: attr(data-title);  /* Changed from attr(title) to attr(data-title) */
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 11px;
    white-space: nowrap;
    pointer-events: none;
    z-index: 1000;
}

@media (max-width: 768px) {
    .actions {
        position: fixed;
        top: 65px;
        left: 20px;
        right: 20px;
        background: linear-gradient(to bottom right, rgba(20, 20, 20, 0.95), rgba(30, 30, 30, 0.9));
        padding: 20px;
        border-radius: 14px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.07);
        transform: translateY(-20px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.15s ease;
        margin-top: 180px;
    }
    .action-button { 
        width: 100%;
    }

    .actions.mobile-menu-open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
    }
    .action-button:hover::after {
        display: none;
    }
}
</style>
