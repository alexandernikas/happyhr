<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search by spot"
          v-model="spot"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchSpot"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Locations</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(deal, index) in deals"
          :key="index"
          @click="setActiveDeals(deal, index)"
        >
          {{ deal.spot }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllDeals">
        Remove All
      </button>

      <a v-if="currentDeal" class="btn btn-warning"
          :href="'/deals/' + currentDeal.id"
        >
          Edit Deal
        </a>

    </div>
    <div class="col-md-6">
      <div v-if="currentDeal">
        <h4>Deal</h4>
        <div>
          <label><strong>Spot:</strong></label> {{ currentDeal.spot }}
        </div>
        <div>
          <label><strong>Special:</strong></label> {{ currentDeal.special }}
        </div>
        <div>
      <label><strong>Tags:</strong></label>
      <div class="tag-buttons">
        <button v-for="(tag, index) in currentDeal.tags" :key="index" class="badge badge-info">{{ tag }}</button>
      </div>
    </div>

        <div>
          <label><strong>Starts:</strong></label> {{ currentDeal.starts }}
        </div>
        <div>
          <label><strong>Ends:</strong></label> {{ currentDeal.ends }}
        </div>
        <div>
      <label><strong>Days:</strong></label>
      <div class="day-buttons">
        <button v-for="(day, index) in currentDeal.days" :key="index" class="badge badge-primary">{{ day }}</button>
      </div>
    </div>
        <div>
          <label><strong>Published:</strong></label> {{ currentDeal.published ? "Published" : "Pending" }}
        </div>


      </div>
      <div v-else>
        <br />
        <p>Please click on a Deal...</p>
      </div>
    </div>
  </div>
</template>

<script>
import dealDataService from "../dataServices/DataService";

export default {
  name: "deals-list",
  data() {
    return {
      deals: [],
      currentDeal: null,
      currentIndex: -1,
      spot: ""
    };
  },
  methods: {
    retrieveDeals() {
      dealDataService.getAll()
        .then(response => {
          this.deals = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveDeals();
      this.currentDeal = null;
      this.currentIndex = -1;
    },

    setActiveDeals(deal, index) {
      this.currentDeal = deal;
      this.currentIndex = index;
    },

    removeAllDeals() {
      dealDataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchSpot() {
      dealDataService.findBySpot(this.spot)
        .then(response => {
          this.deals = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveDeals();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>