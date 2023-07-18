<script lang="ts">
  export let texts: string[] = [];

  const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8'];
</script>

<div class="root {$$props.class}">
  {#each texts as text, i}
    <div class="chip" style:background-color={colors[i % colors.length]}>
      {text}
    </div>
  {/each}
</div>

<style>
  .root {
    display: flex;
    overflow: auto;
    gap: 6px;
  }

  .root::-webkit-scrollbar {
    display: none;
  }

  .chip {
    flex: 1 0 auto;
    max-width: 100px;
    padding: 3px 10px;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 14px;
    font-weight: 500;
    border-radius: 5px;
    color: #fff;
  }
</style>