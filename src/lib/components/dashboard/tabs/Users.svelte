<script lang="ts">
  
  export let users: any[]
</script>
  <div class="users">
    <h2>Users</h2>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Active</th>
          <th>Created At</th>
          <th>Updated At</th>
        </tr>
      </thead>
      <tbody>
        {#each users as user}
        <tr>
          <td>{user.name}</td>
          <td>{user.role}</td>
          <td>{user.isActive ? "Active" : "Inactive"}</td>
          <td>{new Date(user.createdAt).toLocaleString()}</td>
          <td>{new Date(user.updatedAt).toLocaleString()}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .users {
    background-color: var(--l);
    border-radius: 0.5rem;
    font-family: var(--font-s);

    & h2 {
      text-align: right;
      padding: 1rem;
    }
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
</style>
