<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm4>
        <v-card>
          <v-card-text><h3>Login</h3>
            <v-container v-if="showLoginBox">
              <form v-on:submit.prevent="loginUser">
                <v-layout row>
                  <v-flex xs12 sm5>
                    <v-text-field
                      name="email"
                      label="Email address"
                      id="userEmail"
                      v-model="email"
                      type="email"  required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm5>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="password"
                      type="password"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm5>
                    <v-btn type="submit"
                    id="btn-submit">Submit</v-btn>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12>
                    <label>{{success}}</label>
                  </v-flex>
                </v-layout>
              </form>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm4>
        <v-card>
          <v-card-text>
            <v-container v-if="loggedeIn">
              <h3>You are logged in.</h3>
              <p><a v-on:click="userLogout">Log out</a></p>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import db from '../firebaseInit' //config details already set

const usersRef = db.ref('users') //SELECT * FROM users

export default {
  name: 'app',
  firebase: {
    users: usersRef
  },
  data () {
    return {
      message: '',
      success: '',
      email: '',
      password: '',
      showLoginBox: true,
      loggedeIn: false
    }
  },
  methods: {
    loginUser: function (user) {
      let login_credentials = false
      //go search if user already exist in db
      var query = db.ref('users').orderByChild('login_cr').equalTo(this.email+'_'+this.password)
      query.on('value', function(snapshot) {
        if(snapshot.exists()) {
          //console.log('correct credentials')
          login_credentials = true
        }
      })
      if (login_credentials == true){
        this.success = 'Login credentias are correct!'
        this.showLoginBox = false
        this.loggedeIn = true
      }else{
        this.success = 'Login credentias not found!'
      }
    },
    userLogout: function (user){
      //kill the credentials
      this.email = ''
      this.password = ''
      this.showLoginBox = true
      this.loggedeIn = false
      this.success = ''
    }
  }
}
</script>

<style>

</style>
