<template>

  <div class="submit-form">
    <div v-if="!submitted">
      <h4>Add Deal</h4>
      <hr>
      <div class="form-group">
        <label for="spot">Spot</label>
        <input
          type="text"
          class="form-control same-width"
          id="spot"
          required
          v-model="deal.spot"
          name="spot"
        />
      </div>

      <div class="form-group">
        <label for="special">Special</label>
        <textarea
          type="text"
          class="form-control same-width"
          id="special"
          required
          v-model="deal.special"
          name="special"
        ></textarea>
      </div>

      <label for="tags">Tags</label>
      <div class="form-group">
        <select
          class="form-select same-width"
          multiple
          id="tags"
          required
          v-model="deal.tags"
          name="tags"
        >
          <option v-for="(tag, index) in tagOptions" :key="index" :value="tag">{{ tag }}</option>
        </select>
      </div>

      <label for="starts">Starts</label>
      <div class="form-group">
        <select
          class="form-select same-width"
          id="starts"
          required
          v-model="deal.starts"
          name="starts"
        >
          <option v-for="(start, index) in startOptions" :key="index" :value="start">{{ start }}</option>
        </select>
      </div>

      <label for="ends">Ends</label>
      <div class="form-group">
        <select
          class="form-select same-width"
          id="ends"
          required
          v-model="deal.ends"
          name="ends"
        >
          <option v-for="text in endOptions" :key="text" :value="text">{{ text }}</option>
        </select>
      </div>

      <label for="days">Days</label>
      <div class="form-group">
        <select
          class="form-select same-width"
          multiple
          id="days"
          required
          v-model="deal.days"
          name="days"
        >
          <option v-for="(day, index) in dayOptions" :key="index" :value="day">{{ day }}</option>
        </select>
      </div>

      <button @click="saveDeal" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>Deal Submitted!</h4>
      <button class="btn btn-success" @click="newDeal">Add another</button>
      <a class="btn btn-danger"
          :href="'/deals/' "
        >
          Home
        </a>
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
        published: false,
      },
      tagOptions: ['Appetizers',
                  'Beer',
                  'Wine',
                  'Cocktails',
                  'Wings',
                  'Cajun',
                  'Asian',
                  'Mexican',
                  'Shots',
                  'American',
                  'Burgers',
                  'BBQ',
                  'Thai',
                  'Vietnamese',
                  'Sushi',
                  'Italian',
                  'Sandwiches',
                  'Pizza',
                  'Breakfast',
                  'Brunch',
                  'Caribbean'],
      dayOptions: ['Monday',
                  'Tuesday',
                  'Wednesday',
                  'Thursday',
                  'Friday',
                  'Saturday',
                  'Sunday'],
      startOptions: [],
      endOptions: [],
      submitted: false,
    };
  },
  methods: {
    saveDeal() {
      const data = {
        spot: this.deal.spot,
        special: this.deal.special,
        tags: this.deal.tags,
        starts: this.deal.starts,
        ends: this.deal.ends,
        days: this.deal.days,
      };

      dealDataService
        .create(data)
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
    },
    formatTime(date) {
      return date.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });
    },
  },
  computed: {
    startOptionsList() {
      const startTime = new Date();
      startTime.setHours(4, 0, 0, 0);
      const endTime = new Date();
      endTime.setHours(23, 30, 0, 0);
      const timeIncrement = 30 * 60 * 1000; // 30 minutes in milliseconds

      const options = [];
      options.push('Open')
      while (startTime <= endTime) {
        options.push(this.formatTime(startTime));
        startTime.setTime(startTime.getTime() + timeIncrement);
      }

      return options;
    },
    endOptionsList() {
      const startTime = new Date();
      startTime.setHours(4, 0, 0, 0);
      const endTime = new Date();
      endTime.setHours(23, 30, 0, 0);
      const timeIncrement = 30 * 60 * 1000; // 30 minutes in milliseconds

      const options = [];
      while (startTime <= endTime) {
        options.push(this.formatTime(startTime));
        startTime.setTime(startTime.getTime() + timeIncrement);
      }
      options.push('Close')
      return options;
    },
  },
  created() {
    this.startOptions = this.startOptionsList;
    this.endOptions = this.endOptionsList;
  },
};
</script>


<style>
.same-width {
  width: 100%; /* Set the desired width for the input/select elements */
}
.submit-form {
  max-width: 450px;
  margin: auto;
}
</style>