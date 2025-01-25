<script setup>
import { onMounted } from 'vue';
const ghostClients = [
  {
    name: 'Oxy Client',
    description: 'Very good client with essential features. Some frame drops due to memory leaks, but actively being worked on. Frequent updates.',
    link: 'https://cyde.xyz/oxy-client'
  },
  {
    name: 'Raid0',
    description: 'Dev release with paid client qualities. Lunar 1.8.9 only. Features feel slightly unpolished but promising.',
    link: 'https://cyde.xyz/raid0'
  },
  {
    name: 'Raven B+',
    description: 'Very beginner friendly ghost client. Preferred aim assist settings make it a solid choice for new users.',
    link: 'https://cyde.xyz/raven-b+ghost-client'
  }
];
const paidClients = [
  {
    name: 'Vape V4',
    description: 'Beginner friendly, average but reliable client. Good for new cheaters despite lacking some minor features.',
    price: '~$30',
    price: '$24.5 wtih discount code "CHRISTMAS"',
    link: 'https://cyde.xyz/vape-client'
  },
  {
    name: 'Slinky',
    description: 'Best bedwars client with excellent blatant features. Lacks SS support.',
    price: '~$75/year',
    price: '<s>$75/year</s> €52.49/year',
    link: 'https://slinky.gg/'
  },
  {
    name: 'Drip Lite',
    description: 'Best overall client with good SS capabilities. Supports later versions and bypasses SS on HCF and RBW servers.',
    price: '~$100 lifetime',
    price: '<s>$100</s> $80 lifetime',
    link: 'https://cyde.xyz/drip-lite-client'
  }
];
const blatantClients = [
  {
    name: 'Raven XD',
    description: 'Decent B4 knockoff requiring scripts. Can compete with paid clients in HvH.',
    price: 'Free',
    link: 'https://cyde.xyz/raven-xd-client'
  },
  {
    name: 'LiquidBounce',
    description: 'Modern client bypassing Hypixel simulation anticheat. Features integrated configs.',
    price: 'Free',
    link: 'https://liquidbounce.net/'
  },
  {
    name: 'Myau',
    description: 'Good value client with ghost features. Recent update brought significant improvements. Has some ghost features meaning you could win streak with it.',
    price: '$25 Lifetime',
    link: 'https://discord.gg/U2R8C7cRa6'
  },
  {
    name: 'Dog Client',
    description: 'It has all the bypasses and has constant updates. Wouldnt say it has good ghost features so wouldnt recommend it for anything other than blatant.',
    price: '$15 Lifetime',
    link: 'https://discord.gg/DhsTx3yA'
  },
  {
    name: 'Augustus',
    description: 'Best multi-server client with extensive features. Supports ghost cheating and bypasses multiple anticheats. Has AGC, intave, polar, Vulcan bypasses and much more.',
    price: '$80 Lifetime',
    link: 'https://spezz.exchange/store/product/191-augustus-client-lifetime/'
  }
];
onMounted(() => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      ...ghostClients.map(client => ({
        "@type": "Question",
        "name": `What is ${client.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": client.description
        }
      })),
      ...paidClients.map(client => ({
        "@type": "Question",
        "name": `What is ${client.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${client.description} Price: ${client.price}`
        }
      })),
      ...blatantClients.map(client => ({
        "@type": "Question",
        "name": `What is ${client.name}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${client.description} Price: ${client.price}`
        }
      }))
    ]
  };
  // Add schema to head
  const script = document.createElement('script');
  script.setAttribute('type', 'application/ld+json');
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
});
</script>
<template>
  <div class="main-content">
    <h1>Client Information</h1>
    
    <section>
      <h2>Best Free Ghost Clients</h2>
      <div class="client-grid">
        <div v-for="client in ghostClients" :key="client.name" class="client-box">
          <h3>{{ client.name }}</h3>
          <p>{{ client.description }}</p>
          <div class="button-group">
            <a :href="client.link" target="_blank" class="btn">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Paid Ghost/Hybrid Clients</h2>
      <div class="client-grid">
        <div v-for="client in paidClients" :key="client.name" class="client-box">
          <h3>{{ client.name }}</h3>
          <p class="price">{{ client.price }}</p>
          <p class="price" v-html="client.price"></p>
          <p>{{ client.description }}</p>
          <div class="button-group">
            <a :href="client.link" target="_blank" class="btn">Learn More</a>
          </div>
        </div>
      </div>
    </section>

    <section>
      <h2>Blatant Clients</h2>
      <div class="client-grid">
        <div v-for="client in blatantClients" :key="client.name" class="client-box">
          <h3>{{ client.name }}</h3>
          <p class="price">{{ client.price }}</p>
          <p>{{ client.description }}</p>
          <div class="button-group">
            <a :href="client.link" target="_blank" class="btn">Learn More</a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.main-content {
    color: #ffffff;
    font-family: "Inter", sans-serif;
    padding: 24px;
    max-width: 1380px;
    margin: 0 auto;
    background: linear-gradient(180deg, rgba(var(--violet-9-rgb), 0.05), rgba(var(--violet-9-rgb), 0));
}

h1 {
    font-size: 2.5em;
    margin-bottom: 48px;
    text-align: center;
    color: var(--violet-2);
    font-weight: 700;
    letter-spacing: -0.5px;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    background: linear-gradient(135deg, var(--violet-2), var(--violet-4));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

h2 {
    margin: 40px 0 24px;
    color: var(--violet-3);
    font-weight: 700;
    font-size: 1.8em;
}

.client-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 36px;
    margin-bottom: 48px;
}

.client-box {
    background: rgba(255, 255, 255, 0.02);
    border-radius: 16px;
    padding: 24px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
    backdrop-filter: blur(10px);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    height: 100%;
    display: flex;
    flex-direction: column;
    min-height: 280px; /* Ensure minimum height */
}

.client-box:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
    background: rgba(255, 255, 255, 0.04);
}

.client-box h3 {
    color: var(--violet-2);
    margin-bottom: 12px;
    font-size: 1.4em;
    font-weight: 600;
    flex-shrink: 0; /* Prevent title from shrinking */
}

.price {
    color: var(--green-4);
    font-weight: 600;
    margin-bottom: 12px;
    font-size: 1.1em;
    flex-shrink: 0; /* Prevent price from shrinking */
}

.client-box p {
    color: #c1c1c1;
    line-height: 1.6;
    font-size: 0.95em;
    flex: 1; /* Allow description to take remaining space */
}

.button-group {
    margin-top: auto; /* Push button to bottom */
    display: flex;
    gap: 12px;
    flex-shrink: 0; /* Prevent button from shrinking */
    padding-top: 24px; /* Ensure some space from content above */
}

.btn {
    background: linear-gradient(135deg, var(--violet-7), var(--violet-9));
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-family: "Poppins", sans-serif;
    transition: all 0.2s ease;
    box-shadow: 0 4px 15px rgba(58, 21, 119, 0.1);
    width: 100%;
    text-align: center;
}

.btn:hover {
    transform: scale(1.02);
    box-shadow: 
        0 6px 25px rgba(58, 21, 119, 0.25),
        0 4px 10px rgba(var(--violet-2-rgb), 0.2),
        0 0 20px rgba(var(--violet-4-rgb), 0.15);
}

.btn:active {
    transform: scale(0.98);
}

@media (max-width: 1200px) {
    .client-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    .client-box {
        min-height: 300px; /* Slightly taller on smaller screens */
    }
}

@media (max-width: 768px) {
    .client-grid {
        grid-template-columns: 1fr;
    }
    
    .main-content {
        padding: 16px;
    }
    
    .client-box {
        padding: 20px;
        min-height: auto; /* Let it adjust to content on mobile */
    }
    
    h1 {
        font-size: 2em;
        margin-bottom: 32px;
    }
    
    h2 {
        font-size: 1.5em;
    }
}
</style>
