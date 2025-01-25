<script setup>
defineProps({
    isMobileMenuOpen: Boolean
});
</script>

<template>
    <div class="navigations" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
        <a href="/" class="navigation-link">Home</a>
        <a href="/clients" class="navigation-link">Clients</a>
        <a href="/texture-packs" class="navigation-link">Texture Packs</a>
        <a href="/others" class="navigation-link">Others</a>
        <!-- <a href="/community" class="navigation-link">Community</a> -->
    </div>
</template>

<style scoped>
.navigations {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.navigation-link {
    font-family: 'Poppins';
    font-size: 12.75px;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.75);
    text-decoration: none;
    transition: all 0.2s ease-in-out;
}
.navigation-link:hover {
    color: white;
}

@media (max-width: 768px) {
    .navigations {
        position: fixed;
        top: 65px;
        left: 20px;
        right: 20px;
        flex-direction: column;
        background: linear-gradient(to bottom right, rgba(20, 20, 20, 0.95), rgba(30, 30, 30, 0.9));
        padding: 20px;
        border-radius: 14px;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.07);
        transform: translateY(-20px);
        opacity: 0;
        pointer-events: none;
        transition: all 0.15s ease;
    }

    .navigations.mobile-menu-open {
        transform: translateY(0);
        opacity: 1;
        pointer-events: all;
    }
}
</style>
