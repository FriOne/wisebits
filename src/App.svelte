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

<div class="root" style="--cards-count: {coffees.length}">
  {#each coffees as coffee, i (coffee.id)}
    <Card
      class="app__card"
      style="--card-index: {i}"
      image={'https://loremflickr.com/300/250/coffee'}
      topImageText={coffee.intensifier}
      infoText={coffee.origin}
      title={coffee.blend_name}
      subtitle={coffee.variety}
      chips={coffee.notes}
    />
  {/each}
  {#if newDataIsLoading}
    <Spinner
      class="app__spinner"
      style="--position: {coffees.length + 1}"
    />
  {/if}
  <FabButton
    class="app__add-button"
    disabled={newDataIsLoading}
    on:click={handleAddClick}
  />
</div>

<style>
  .root {
    position: relative;
    height: calc(
      var(--page-padding) +
      var(--spinner-size) +
      var(--add-button-height) +
      var(--cards-count) * (var(--card-height) + var(--cards-gap))
    );
    padding: var(--page-padding);
    /* index is set for each card element directly */
    --card-index: 0;
    --cards-count: 0;
    --page-padding: 30px;
    --card-height: 405px;
    --cards-gap: 50px;
    --add-button-height: 50px;
    --spinner-size: 50px;
  }

  :global(.app__card) {
    position: absolute;
    top: calc(
      var(--page-padding) +
      var(--card-index) * (var(--card-height) + var(--cards-gap))
    );
    right: 0;
    left: 0;
    margin: 0 auto;
  }

  :global(.app__spinner) {
    position: absolute;
    top: calc(
      var(--page-padding) +
      var(--cards-count) * (var(--card-height) + var(--cards-gap))
    );
    right: 0;
    left: 0;
    margin: 0 auto;
  }

  :global(.app__add-button) {
    position: fixed;
    right: 0;
    bottom: 20px;
    left: 0;
    margin: auto;
  }
</style>