<script lang="ts">
  export let posts: any[]
</script>

<div class="posts">
  <h2>Posts</h2>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Main Image</th>
        <th>Created At</th>
        <th>Updated At</th>
      </tr>
    </thead>
    <tbody>
      {#each posts as post}
        <tr>
          <td>{post.title}</td>
          <td>{post.author.name}</td>
          <td><img src={post.mainImage} alt={post.title} width="100" /></td>
          <td>{new Date(post.createdAt).toLocaleString()}</td>
          <td
            >{new Date(post.updatedAt).toLocaleString() ===
            new Date(post.createdAt).toLocaleString()
              ? "Not updated"
              : new Date(post.updatedAt).toLocaleString()}</td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .posts {
    padding: 1rem;
    background-color: var(--l);
    border-radius: 0.5rem;
    font-family: var(--font-s);
  }

  .posts h2 {
    text-align: right;
    padding: 1rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    background-color: var(--l);
  }

  th,
  td {
    padding: 0.75rem;
    text-align: left;
  }

  th {
    background-color: var(--blue);
    color: var(--l);
    font-weight: bold;
  }

  tr:nth-child(even) {
    background-color: var(--s-10);
  }

  tr:hover {
    background-color: var(--s-35);
  }

  img {
    max-width: 100%;
    height: auto;
  }
</style>
