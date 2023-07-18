<script lang="ts">
  import { onMount } from 'svelte';
  import Card from './components/Card.svelte';
  import FabButton from './components/FabButton.svelte';
  import Spinner from './components/Spinner.svelte';
  import { fetchCoffee } from './libs/fetchCoffee';
  import type { Coffee } from './types';

  const AUTOLOAD_INTERVAL = 30000;
  let newDataDownloadTimeout;
  let newDataIsLoading = false;
  let coffees: Coffee[] = [];

  async function fetchNewData(alertMessage?: string) {
    if (newDataIsLoading) {
      return;
    }
    newDataIsLoading = true;
    clearTimeout(newDataDownloadTimeout);

    try {
      const loadedCoffee = await fetchCoffee();
      coffees = [...coffees, loadedCoffee];
    } catch (error) {
      console.error(error);
      if (alertMessage) {
        alert(alertMessage);
      }
    } finally {
      newDataIsLoading = false;
      createTimeoutFetch();
    }
  }

  function createTimeoutFetch() {
    newDataDownloadTimeout = setTimeout(() => fetchNewData(), AUTOLOAD_INTERVAL);
  }

  onMount(() => {
    void fetchNewData('There is an error, please, reload the page');
  });

  function handleAddClick() {
    void fetchNewData('There is an error, please, try again');
  }
</script>

<div class="root">
  {#each coffees as coffee (coffee.id)}
    <Card
      image={'https://loremflickr.com/300/250/coffee'}
      topImageText={coffee.intensifier}
      infoText={coffee.origin}
      title={coffee.blend_name}
      subtitle={coffee.variety}
      chips={coffee.notes}
    />
  {/each}
  {#if newDataIsLoading}
    <Spinner />
  {/if}
  <FabButton
    class="add-button"
    disabled={newDataIsLoading}
    on:click={handleAddClick}
  />
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