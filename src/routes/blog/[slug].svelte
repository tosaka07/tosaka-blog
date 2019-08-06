<script context="module">
  export async function preload({ params, query }) {
    // the `slug` parameter is available because
    // this file is called [slug].html
    const res = await this.fetch(`blog/${params.slug}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { post: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import Bio from '../../components/Bio.svelte'
  export let post
</script>

<style>
  header {
    text-align: center;
  }

  header h1 {
    margin-bottom: 0.7em;
  }

  header p {
    color: #AAA;
    text-transform: uppercase;
    font-family: Rubik, sans-serif;
    font-weight: 600;
  }

  header hr {
    min-width: 100px;
    width: 30%;
  }
</style>

<svelte:head>
  <title>{post.title}</title>
  <meta name="description" content="{post.excerpt}" />
  <!-- <meta name="keywords" content="{post.metadata.keywords}"/> -->

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.tosaka.net/blog/{post.slug}">
  <meta property="og:title" content="{post.title}">
  <meta property="og:description" content="{post.excerpt}">
  <!-- {#if post.metadata.thumb}
  <meta property="og:image" content="{post.metadata.thumb}">
  {/if} -->

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://www.tosaka.net/blog/{post.slug}">
  <meta property="twitter:title" content="{post.metadata.title}">
  <meta property="twitter:description" content="{post.excerpt}">
  <!-- {#if post.metadata.thumb}
  <meta property="twitter:image" content="{post.metadata.thumb}">
  {/if} -->
</svelte:head>

<header>
  <p>{post.printDate} ~ {post.printReadingTime}</p>
  <h1>{post.title}</h1>
  <hr />
</header>
<div class="container">
  <article class="content">
    {@html post.html}
  </article>
  <hr />
  <Bio />
</div>
