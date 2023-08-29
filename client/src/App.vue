<template>
  <div id="deals_app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/deals" class="nav-link">Deals</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/add" class="nav-link">Add</router-link>
        </li>
      </div>
    </nav>

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: "deals_app"
};
</script>
