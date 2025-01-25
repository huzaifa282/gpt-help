<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>The page you're looking for doesn't exist or has been moved.</p>
    <router-link to="/" class="home-button">Go Back Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  text-align: center;
  padding: 40px;
  background: linear-gradient(180deg, rgba(var(--violet-9-rgb), 0.05), rgba(var(--violet-9-rgb), 0));
  border-radius: 24px;
  backdrop-filter: blur(10px);
}

h1 {
  font-size: 8rem;
  margin: 0;
  font-family: "Inter", sans-serif;
  font-weight: 800;
  background: linear-gradient(135deg, var(--violet-2), var(--violet-4));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

h2 {
  font-size: 2.5rem;
  margin: 16px 0;
  color: var(--violet-2);
  font-family: "Poppins", sans-serif;
  font-weight: 600;
}

p {
  margin: 20px 0;
  color: var(--violet-4);
  font-family: "Inter", sans-serif;
  font-size: 1.2rem;
}

.home-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 16px 32px;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: white;
  background: linear-gradient(135deg, var(--violet-7), var(--violet-9));
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 15px rgba(58, 21, 119, 0.1);
}

.home-button:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 6px 25px rgba(58, 21, 119, 0.25),
    0 4px 10px rgba(var(--violet-2-rgb), 0.2),
    0 0 20px rgba(var(--violet-4-rgb), 0.15);
}

.home-button:active {
  transform: scale(0.98);
  box-shadow: 
    0 4px 15px rgba(90, 34, 179, 0.2),
    0 2px 8px rgba(var(--violet-7-rgb), 0.15);
}

@media screen and (max-width: 768px) {
  .not-found {
    padding: 20px;
  }
  
  h1 {
    font-size: 6rem;
  }
  
  h2 {
    font-size: 2rem;
  }
  
  p {
    font-size: 1rem;
  }
}
</style>
