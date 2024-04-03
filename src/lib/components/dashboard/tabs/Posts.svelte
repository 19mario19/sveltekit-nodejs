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
        <th>Category</th>
      </tr>
    </thead>
    <tbody>
      {#each posts as post, i}
        <tr
          style="background-color: {i % 2 === 0
            ? 'var(--s-10)'
            : 'var(--s-35)'}"
        >
          <td>{post.title}</td>
          <td>{post.author.name}</td>
          <td>{post.category}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .posts {
    padding: 1rem;
    background-color: var(--l-10);
    border-radius: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid var(--s-50);
  }
  th {
    background-color: var(--blue);
    color: var(--l);
  }
</style>
