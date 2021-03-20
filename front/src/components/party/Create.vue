<template>
  <div class="container">
    <form class="md-layout" @submit.prevent="validateParty">
      <md-card class="md-layout-item">

        <md-card-header>
          <div class="md-title">Party: create</div>
        </md-card-header>

        <md-card-content>

          <md-field>
            <label for="name">Name</label>
            <md-input name="name" id="name" v-model="form.name" maxlength="64" required />
          </md-field>

          <md-field>
            <label for="description">Description</label>
            <md-textarea name="description" id="description" v-model="form.description"></md-textarea>
          </md-field>

          <md-field>
            <vue-google-autocomplete name="location" ref="address" id="location" classname="md-input"
              v-on:placechanged="getAddressData" placeholder="Location" country="fr">
            </vue-google-autocomplete>
          </md-field>

          <md-autocomplete v-model="selectedCountry" :md-options="countries">
            <label>Country</label>
          </md-autocomplete>

        </md-card-content>

        <md-progress-bar md-mode="indeterminate" v-if="sending" />

        <md-card-actions>
          <md-button type="submit" class="md-primary">Create</md-button>
        </md-card-actions>

      </md-card>

      <md-snackbar :md-duration="4000" :md-active.sync="showSnackbar" md-persistent>
        <span>Party {{ form.title }} was created successfully!</span>
        <md-button class="md-primary" @click="showSnackbar = false">Retry</md-button>
      </md-snackbar>

    </form>
  </div>
</template>

<script>
  import VueGoogleAutocomplete from 'vue-google-autocomplete'

  export default {
    components: {
      VueGoogleAutocomplete
    },

    data() {
      return {
        url: "party",
        errors: [],
        errored: false,
        loading: false,
        address: null,
        slugData: null,
        selectedCountry: null,
        countries: [
          'Algeria',
          'Argentina',
          'Brazil',
          'Canada',
          'Italy',
          'Japan',
          'United Kingdom',
          'United States'
        ],
        form: {
          name: null,
          description: null,
          location: null,
          startedAt: null,
          expireAt: null,
          finishedAt: null
        },
        sending: false,
        showSnackbar: false,
      };
    },

    mounted: async function () {
      this.$axios
        .get("https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port")
          .then((response) => {
            console.log(response.data.features)
            this.countries = response.data.features
          })
          .catch((error) => {
            console.log('Error! Could not reach the API. ' + error)
          })
        },

        methods: {
          getAddressData: function (addressData, placeResultData, id) {
            this.address = addressData;
          },

          getSlugData: function (addressData) {
            this.slugData = addressData.replace(/\s/g, '+').toLowerCase();
          },

          searchLocation: function () {
            axios.get("https://api-adresse.data.gouv.fr/search/?q=8+bd+du+port")
              .then(function (response) {
                console.log(response)
              })
              .catch(function (error) {
                errored = 'Error! Could not reach the API. ' + error
              })
          },

          validateParty: function () {
            this.sending = true

            this.axios
              .post(this.url, {
                name: this.form.name,
                description: this.form.description,
                location: this.form.location,
                startedAt: this.form.startedAt,
                expireAt: this.form.expireAt,
                finishedAt: this.form.finishedAt,
              })
              .then((response) => {
                this.showSnackbar = true
                console.log(response.data)
              })
              .catch((error) => {
                console.log(error);
                this.errored = true;
              })
              .finally(() => {
                this.loading = false;
                this.sending = false
              });
          },
        },
    }
</script>

<style>

</style>