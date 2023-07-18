<script lang="ts">
  import Card from "./components/Card.svelte";
  import FabButton from "./components/FabButton.svelte";

  type Coffee = {
    id: number;
    uid: string;
    blend_name: string;
    origin: string;
    variety: string;
    notes: string[];
    intensifier: string;
  };

  type CoffeeWithImage = Coffee & {
    image?: string;
  };

  let coffees: CoffeeWithImage[] = [
    {
      id: 3417,
      uid: '9c772363-8362-48a2-b871-cdbbea018b86',
      blend_name: 'Blue Enlightenment',
      origin: 'Chiriqui, Panama',
      variety: 'Ethiopian Heirloom',
      notes: ['crisp', 'coating', 'black-tea', 'peanut', 'tobacco', 'crisp', 'coating', 'black-tea', 'peanut', 'tobacco'],
      intensifier: 'juicy',
      // image: 'https://loremflickr.com/cache/resized/65535_52828262361_234c4acb3b_c_500_500_nofilter.jpg',
    },
    {
      id: 3418,
      uid: '9c772363-8362-48a2-b871-cdbbea018b86',
      blend_name: 'Blue Enlightenment',
      origin: 'Chiriqui, Panama',
      variety: 'Ethiopian Heirloom',
      notes: ['crisp', 'coating', 'black-tea', 'peanut', 'tobacco', 'crisp', 'coating', 'black-tea', 'peanut', 'tobacco'],
      intensifier: 'juicy',
      image: 'https://loremflickr.com/cache/resized/65535_52828262361_234c4acb3b_c_500_500_nofilter.jpg',
    },
  ];

  function handleAddClick() {
    console.log('add');
  }
</script>

<div class="root">
  {#each coffees as coffee (coffee.id)}
    <Card
      image={coffee.image}
      topImageText={coffee.intensifier}
      infoText={coffee.origin}
      title={coffee.blend_name}
      subtitle={coffee.variety}
      chips={coffee.notes}
    />
  {/each}
  <FabButton class="add-button" on:click={handleAddClick} />
</div>

<style>
  .root {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--cards-gap);
    padding: 30px 30px calc(30px + var(--add-button-height) + var(--cards-gap));
  }

  :global(.add-button) {
    position: fixed;
    right: 0;
    bottom: 20px;
    left: 0;
    margin: auto;
  }
</style>