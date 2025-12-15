<script lang="ts">
  let { 
    size = "40", 
    color = "#7c3aed", 
    unit = "px", 
    duration = "1s" 
  } = $props();
</script>

<div class="wrapper" style="--size: {size}{unit}; --color: {color}; --duration: {duration};">
  <div class="circle"></div>
  <div class="circle"></div>
  <div class="circle"></div>
</div>

<style>
  .wrapper {
    width: var(--size);
    height: var(--size);
    position: relative;
  }

  .circle {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    border: 2px solid var(--color);
    opacity: 0;
    animation: ripple var(--duration) linear infinite;
  }

  .circle:nth-child(2) {
    animation-delay: calc(var(--duration) / 3);
  }

  .circle:nth-child(3) {
    animation-delay: calc(var(--duration) / 1.5);
  }

  @keyframes ripple {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>
