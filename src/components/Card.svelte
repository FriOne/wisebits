<script lang="ts">
  import Chips from './Chips.svelte';

  export let image = 'https://placehold.co/300x250?text=coffee&font=roboto';
  export let topImageText = '';
  export let infoText = '';
  export let title = '';
  export let subtitle = '';
  export let chips: string[] = [];
</script>

<div class="root">
  <div class="image" style:background-image="url('{image}')">
    <div class="image-text">
      {topImageText}
    </div>
  </div>

  <div class="bottom">
    <div class="info-text">
      {infoText}
    </div>
    <div class="title">
      {title}
    </div>
    <div class="subtitle">
      {subtitle}
    </div>

    <Chips class="chips" texts={chips} />
  </div>
</div>

<style>
  .root {
    width: 300px;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: var(--border-radius);
    box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);

    --border-radius: 8px;
  }

  .image {
    position: relative;
    width: 100%;
    height: 250px;
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #808080;
    border-top-right-radius: calc(var(--border-radius) - 1px);
    border-top-left-radius: calc(var(--border-radius) - 1px);
    box-shadow: 0 40px 40px 0 rgba(0, 0, 0, 0.25) inset;
  }

  .image-text {
    position: absolute;
    top: 15px;
    right: 20px;
    max-width: 50%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #fff;
  }

  .info-text,
  .title,
  .subtitle {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .info-text {
    font-size: 14px;
    color: #808080;
  }

  .title {
    margin-top: 6px;
    font-size: 20px;
    font-weight: 500;
  }

  .subtitle {
    margin-top: 6px;
    font-size: 16px;
  }

  .bottom {
    padding: 20px;
    border-bottom-right-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  :global(.chips) {
    margin-top: 20px;
  }
</style>