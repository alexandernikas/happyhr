<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="spot">Spot</label>
        <input
          type="text"
          class="form-control"
          id="spot"
          required
          v-model="deal.spot"
          name="spot"
        />
      </div>

      <div class="form-group">
        <label for="special">Special</label>
        <input
          class="form-control"
          id="special"
          required
          v-model="deal.special"
          name="special"
        />
      </div>

      <div class="form-group">
        <label for="tags">Tags</label>
        <input
          class="form-control"
          id="tags"
          required
          v-model="deal.tags"
          name="tags"
        />
      </div>

      <div class="form-group">
        <label for="starts">Starts</label>
        <input
          class="form-control"
          id="starts"
          required
          v-model="deal.starts"
          name="starts"
        />
      </div>

      <div class="form-group">
        <label for="ends">Ends</label>
        <input
          class="form-control"
          id="ends"
          required
          v-model="deal.ends"
          name="ends"
        />
      </div>

      <div class="form-group">
        <label for="days">Days</label>
        <input
          class="form-control"
          id="days"
          required
          v-model="deal.days"
          name="days"
        />
      </div>

      <button @click="saveDeal" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>Deal Submitted!</h4>
      <button class="btn btn-success" @click="newDeal">Add</button>
    </div>
  </div>
</template>

<script>
import dealDataService from "../dataServices/DataService";

export default {
  name: "add-deal",
  data() {
    return {
      deal: {
        id: null,
        spot: "",
        special: "",
        tags: "",
        starts: "",
        ends: "",
        days: "",
        published: false
      },
      submitted: false
    };
  },
  methods: {
    saveDeal() {
      var data = {
        spot: this.deal.spot,
        special: this.deal.special,
        tags: this.deal.tags,
        starts: this.deal.starts,
        ends: this.deal.ends,
        days: this.deal.days
      };

      dealDataService.create(data)
        .then(response => {
          this.deal.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newDeal() {
      this.submitted = false;
      this.deal = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>