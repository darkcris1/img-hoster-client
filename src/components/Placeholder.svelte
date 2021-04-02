<script>
  export let width = '100%'
  export let height = '20px'
  let className
  export { className as class }
</script>

<style>
  div:after {
    animation: load 2s infinite;
    content: '';
    box-shadow: 0 0 50px 30px rgba(255, 255, 255, 0.7);
    position: absolute;
    left: -100%;
    top: 0;
    transform: rotate(20deg);
    height: 100%;
  }
</style>

<div
  {...$$restProps}
  class={'bg-gray-200 relative overflow-hidden ' + className}
  style={`width: ${width}; height: ${height}`}
  data-placeholder />
