<template>
  <div class="list row">
    <div class="col-md-12">
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
    <div class="col-md-6" >
      <div id="table-scroll">
        <h4>Locations</h4>

    <table class="table table-hover" >
      <tbody>
        <tr
          v-for="(deal, index) in deals"
          :key="index"
          :class="{ active: index == currentIndex }"
          @click="setActiveDeals(deal, index)"
        >
          <td>{{ deal.spot }}</td>
        </tr>
      </tbody>
    </table>
  </div>

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
.table-hover tbody tr:hover td, .table-hover tbody tr:hover th {
  background-color: #99ccff;
}
#table-scroll {
  max-width: 750px;
  overflow:auto; 
}

</style>