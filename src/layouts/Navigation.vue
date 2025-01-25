<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import Brand from '@/components/navigation/Brand.vue';
import Actions from '@/components/navigation/Actions.vue';
import Navigations from '@/components/navigation/Navigations.vue';

const isMobileMenuOpen = ref(false);

const handleClickOutside = (event) => {
    const navigationElement = document.querySelector('.navigation-wrapper');
    if (isMobileMenuOpen.value && navigationElement && !navigationElement.contains(event.target)) {
        isMobileMenuOpen.value = false;
    }
};

watch(isMobileMenuOpen, (newValue) => {
    if (newValue) {
        document.addEventListener('click', handleClickOutside);
    } else {
        document.removeEventListener('click', handleClickOutside);
    }
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <div class="navigation-wrapper">
        <div class="navigation">
            <Brand />
            <Navigations :isMobileMenuOpen="isMobileMenuOpen" />
            <Actions :isMobileMenuOpen="isMobileMenuOpen" />
            <button class="mobile-menu-toggle" @click="isMobileMenuOpen = !isMobileMenuOpen">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
</template>

<style scoped>
.navigation-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding: 12px 20px;
    z-index: 1000;
}

.navigation {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 800px;
    margin: auto;
    padding: 6.5px;
    background: linear-gradient(
        to bottom right,
        rgba(20, 20, 20, 0.8),
        rgba(30, 30, 30, 0.6)
    );
    border: 1px solid rgba(255, 255, 255, 0.07);
    box-shadow: 
        0 4px 15px rgba(0, 0, 0, 0.5),
        0 0 20px rgba(138, 138, 138, 0.1),
        inset 0 0 20px rgba(255, 255, 255, 0.02);
    border-radius: 14px;
    transition: all 0.4s ease;
    backdrop-filter: blur(10px);
}

.navigation:hover{
    background: linear-gradient(
        to bottom right,
        rgba(27, 27, 27, 0.95),
        rgba(35, 35, 35, 0.9)
    );
    box-shadow: 
        0 4px 20px rgba(0, 0, 0, 0.6),
        0 0 25px rgba(111, 76, 255, 0.15),
        inset 0 0 25px rgba(255, 255, 255, 0.03);
    transform: translateY(-1px);
}

.mobile-menu-toggle {
    display: none;
    flex-direction: column;
    gap: 4px;
    background: transparent;
    border: none;
    cursor: pointer;
    padding: 4px;
}

.mobile-menu-toggle span {
    display: block;
    width: 20px;
    height: 2px;
    background-color: white;
    transition: 0.3s;
}

@media (max-width: 768px) {
    .mobile-menu-toggle {
        display: flex;
    }
    
    .navigation {
        padding: 6.5px 12px;
    }
}
</style>
