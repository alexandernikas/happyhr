<template>
  <div class="container">
    <h1>New Happy Hour Deal</h1>

    <div class="row">
      <div class="col-md-6">
        <!-- Form -->
        <form @submit.prevent="addDeal" class="mb-3">
          <!-- Form fields -->
          <!-- Spot -->

          <div class="mb-3">
                <label for="spotInput" class="form-label">Location</label>
                <input v-model="spot" id="spotInput" class="form-control" type="text">
              </div>
          <!-- Special and Tags -->
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
            <label for="specialInput" class="form-label">Special</label>
            <textarea v-model="special" id="specialInput" class="form-control" type="text"></textarea>
          </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="tagsSelect" class="form-label">Tags</label>
                <select v-model="selectedTags" id="tagsSelect" class="form-select" multiple>
                  <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Start Time and End Time -->
          <div class="row">
            <div class="col-md-6">
              <div class="mb-3">
                <label for="startSelect" class="form-label">Start Time</label>
                <select v-model="start" id="startSelect" class="form-select">
                  <option v-for="start in starts" :key="start.value" :value="start.value">{{ start.text }}</option>
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="mb-3">
                <label for="endSelect" class="form-label">End Time</label>
                <select v-model="end" id="endSelect" class="form-select">
                  <option v-for="end in ends" :key="end.value" :value="end.value">{{ end.text }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Days -->
          <div class="mb-3">
            <label for="daysSelect" class="form-label">Days</label>
            <select v-model="selectedDays" id="daysSelect" class="form-select" multiple>
              <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
            </select>
          </div>         

          <button type="submit" class="btn btn-primary">Add Deal</button>
        </form>
      </div>

      <div class="col-md-6">
        <!-- Table -->
        <table class="table table-striped table-bordered">
          <thead class="thead-dark">
            <tr>
              <th>Spot</th>
              <th>Start</th>
              <th>End</th>
              <th>Days</th>
              <th>Special</th>
              <th>Tags</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="deal in deals" :key="deal.id">
              <td>{{ deal.spot }}</td>
              <td>{{ deal.start }}</td>
              <td>{{ deal.end }}</td>
              <td>{{ deal.selectedDays }}</td>
              <td>{{ deal.special }}</td>
              <td>{{ deal.selectedTags }}</td>
              <td><button @click="removeDeal(deal)" class="btn btn-danger">X</button></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'

// initialize our fields
let id = 0
const spot = ref('')
const start = ref('')
const end = ref('')
const special = ref('')
const starts = ref([]);
const ends = ref([]);
const selectedDays = ref([])
const selectedTags = ref([])

const deals = ref([])

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const tags = ['Appetizers','Beer','Wine','Cocktails','Wings','Cajun','Asian','Mexican','Shots',
              'American','Burgers','BBQ','Thai','Vietnamese','Sushi','Italian','Sandwiches','Pizza',
            'Breakfast','Brunch','Caribbean']


//gives us date lists
starts.value.push({ text: 'Open', value: 'Open' });
const startTime = new Date();
startTime.setHours(4, 0, 0, 0);
const endTime = new Date();
endTime.setHours(23, 30, 0, 0);
const timeIncrement = 30 * 60 * 1000; // 30 minutes in milliseconds
while (startTime <= endTime) {
  const text = formatTime(startTime);
  const value = text.toLowerCase().replace(/ /g, '');

  starts.value.push({ text, value });
  ends.value.push({ text, value });
  startTime.setTime(startTime.getTime() + timeIncrement);
}
ends.value.push({ text: 'Close', value: 'Close' });

function formatTime(date) {
  return date.toLocaleString('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  });
}

//creates array of target data
function addDeal() {
  deals.value.push({ id: id++, spot: spot.value, start: start.value, end: end.value, special: special.value, 
                  selectedTags: selectedTags.value, selectedDays: selectedDays.value })
  spot.value = ''
  start.value = ''
  end.value = ''
  special.value = ''
  selectedTags.value = []
  selectedDays.value = []
}

//removes line from array
function removeDeal(deal) {
  deals.value = deals.value.filter((d) => d !== deal)
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

.container {
  margin: 0 auto;
  padding: 20px;
}
textarea {
        display: flex;

        /* resize: none; /* disable resizing */
      } 
</style>
