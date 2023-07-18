<button class="root {$$props.class}" on:click>
</button>

<style>
  .root {
    cursor: pointer;
    height: var(--add-button-height);
    width: 50px;
    border: 15px solid var(--bg-color);
    border-radius: 50%;
    background:
      conic-gradient(from 90deg at var(--b) var(--b), var(--bg-color) 90deg, #fff 0)
      calc(100% + var(--b)/2) calc(100% + var(--b)/2)/
      calc(50%  + var(--b))   calc(50%  + var(--b));
    box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12);

    --b: 3px;
    --bg-color: #28a745;
  }

  .root:hover {
    --bg-color: #409f55;
  }
</style>