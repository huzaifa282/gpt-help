<script setup>
</script>

<template>
    <router-link to="/" class="brand-link">
        <div class="brand">
            <img class="brand-logo" src="/src/assets/images/cyde.avif" alt="Cyde logo">
            <h1 class="brand-name">Cyde.xyz</h1>
        </div>
    </router-link>
</template>

<style scoped>
.brand-link {
    text-decoration: none;
}

.brand {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-left: 5px;
    gap: 8px;
    cursor: pointer;
    transition: opacity 0.2s;
}

.brand:hover {
    opacity: 0.8;
}

.brand-logo {
    width: 24.45px;
    height: 22px;
    border-radius: 50%;
}
.brand-name {
    font-family: 'Poppins';
    font-size: 14px;
    font-weight: 500;
    color: white;
}
</style>
