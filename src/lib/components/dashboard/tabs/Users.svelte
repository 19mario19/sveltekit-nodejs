<script lang="ts">

  export let users: any[];
</script>

<div class="users">
  <h2>Users</h2>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Role</th>
        <th>Active</th>
      </tr>
    </thead>
    <tbody>
      {#each users as user, i}
        <tr style="background-color: {i % 2 === 0 ? 'var(--s-10)' : 'var(--s-35)'}">
          <td>{user.name}</td>
          <td>{user.email}</td>
          <td>{user.role}</td>
          <td>{user.isActive ? 'Yes' : 'No'}</td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .users {
    padding: 1rem;
    background-color: var(--l-10);
    border-radius: 5px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
  }
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid var(--s-50);
  }
  th {
    background-color: var(--blue);
    color: var(--l);
  }
</style>
