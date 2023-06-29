<template>
  <div class="container">
    <h1>New Happy Hour Deal</h1>

    <form @submit.prevent="addDeal" class="mb-3">

      <div class="row">
        <div class="col-md-4">
          <div class="mb-3">
            <label for="spotInput" class="form-label">Spot</label>
            <input v-model="spot" id="spotInput" class="form-control" type="text">
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-3">
            <label for="startSelect" class="form-label">Start Time</label>
            <select v-model="start" id="startSelect" class="form-select">
              <option v-for="start in starts" :key="start.value" :value="start.value">{{ start.text }}</option>
            </select>
          </div>
        </div>
        <div class="col-md-4">
          <div class="mb-3">
            <label for="endSelect" class="form-label">End Time</label>
            <select v-model="end" id="endSelect" class="form-select">
              <option v-for="end in ends" :key="end.value" :value="end.value" >{{ end.text }}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <label for="daysSelect" class="form-label">Days</label>
        <select v-model="selectedDays" id="daysSelect" class="form-select" multiple>
          <option v-for="day in days" :key="day" :value="day">{{ day }}</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="specialInput" class="form-label">Special</label>
        <input v-model="special" id="specialInput" class="form-control" type="text">
      </div>

      <div class="mb-3">
        <label for="tagsSelect" class="form-label">Tags</label>
        <select v-model="selectedTags" id="tagsSelect" class="form-select" multiple>
          <option v-for="tag in tags" :key="tag" :value="tag">{{ tag }}</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Add Deal</button>
    </form>

    <ul class="list-group">
      <li class="list-group-item" v-for="deal in deals" :key="deal.id">
        <div class="d-flex justify-content-between align-items-center">
          <div>
            {{ deal.text }} || {{ deal.start }} || {{ deal.end }}|| {{deal.selectedDays}} || {{ deal.special }} || {{ deal.selectedTags }} 
          </div>
          <button @click="removeDeal(deal)" class="btn btn-danger">X</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref } from 'vue'
// let module = require('../src/utils/timeUtil.js');

// let starts = module.starts;

// starts.map(item => console.log(item +1))

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
            'Breakfast','Brunch']

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

function addDeal() {
  deals.value.push({ id: id++, text: spot.value, start: start.value, end: end.value, special: special.value, 
                  selectedTags: selectedTags.value, selectedDays: selectedDays.value })
  spot.value = ''
  start.value = ''
  end.value = ''
  special.value = ''
  selectedTags.value = []
  selectedDays.value = []
}

function removeDeal(deal) {
  deals.value = deals.value.filter((d) => d !== deal)
}
</script>

<style>
@import 'bootstrap/dist/css/bootstrap.min.css';

.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
