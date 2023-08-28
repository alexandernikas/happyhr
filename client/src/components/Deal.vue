<template>
  <div v-if="currentDeal" class="edit-form">
    <h4>Deal</h4>
    <form>
      <div class="form-group">
        <label for="spot">Spot</label>
        <input type="text" class="form-control" id="spot"
          v-model="currentDeal.spot"
        />
      </div>
      <div class="form-group">
        <label for="special">Special</label>
        <input type="text" class="form-control" id="special"
          v-model="currentDeal.special"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentDeal.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button class="badge badge-primary mr-2"
      v-if="currentDeal.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button v-else class="badge badge-primary mr-2"
      @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2"
      @click="deleteDeal"
    >
      Delete
    </button>

    <button type="submit" class="badge badge-success"
      @click="updateDeal"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Deal...</p>
  </div>
</template>

<script>
import dealDataService from "../dataServices/DataService";

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "deal",
  data() {
    return {
      currentDeal: null,
      message: ''
    };
  },
  methods: {
    getDeal(id) {
      dealDataService.get(id)
        .then(response => {
          this.currentDeal = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentDeal.id,
        spot: this.deal.spot,
        special: this.deal.special,
        tags: this.deal.tags,
        starts: this.deal.starts,
        ends: this.deal.ends,
        days: this.deal.days,
        published: status
      };

      dealDataService.update(this.currentDeal.id, data)
        .then(response => {
          this.currentDeal.published = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateDeal() {
      dealDataService.update(this.currentDeal.id, this.currentDeal)
        .then(response => {
          console.log(response.data);
          this.message = 'The deal was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteDeal() {
      dealDataService.delete(this.currentDeal.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "deals" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getDeal(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>