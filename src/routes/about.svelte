<style>
  figure {
    float: right;
    margin: -3em -7em 2em 2em;
    max-width: 400px;
  }

  figure img {
    border-radius: 8px;
  }

  @media (max-width: 1020px) {
    figure {
      float: none;
      margin: 0 auto 2em;
    }
  }
</style>

<svelte:head>
  <title>About</title>
</svelte:head>

<div class="container">
  <h1>About</h1>
  <figure>
    <img src='images/logo.svg' alt='Image of logo.'>
  </figure>
  <p>iOSエンジニアです。</p>
</div>
