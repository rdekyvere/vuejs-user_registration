<template>
  <v-container>
    <v-layout row>
      <v-flex xs12 sm6 offset-sm4>
        <v-card>
          <v-card-text><h3>Register New User</h3>
            <v-container>
              <form v-on:submit.prevent="addUser">
                <v-layout row>
                  <v-flex xs12 sm5>
                    <v-text-field
                      name="email"
                      label="Email address"
                      id="userEmail"
                      v-model="newUser.email"
                      v-on:blur="searchUser"
                      type="email"  required>
                    </v-text-field>
                    <label id="emailWarning">Email already registered!</label>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm5>
                    <v-text-field
                      name="password"
                      label="Password"
                      id="password"
                      v-model="newUser.password"
                      type="password"
                      required>
                    </v-text-field>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm5>
                    <v-text-field
                      name="confirmPassword"
                      label="Confirm Password"
                      id="confirmPassword"
                      v-model="confirmPassword"
                      type="password"
                      :rules="[comparePasswords]">
                    </v-text-field>
                    <label>{{ passwordFail }}</label>
                  </v-flex>
                </v-layout>
                <v-layout row>
                  <v-flex xs12 sm5>
                    <v-btn type="submit"
                    id="btn-submit" v-bind:disabled="validated">Submit</v-btn>
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
      validated: false,
      passwordFail: '',
      success: '',
      confirmPassword: '',
      newUser: {
        email: '',
        password: '',
        login_cr:''
      }
    }
  },
  computed: {
    comparePasswords () {
      if (this.newUser.password !== this.confirmPassword){
        this.validated = true
        return 'Passwords do not match.'
      }else{
          this.validated = false
          return ''
      }
    }
  },
  methods: {
    addUser: function () {
        let len = (this.newUser.password).length
        if (len >= 6){
          this.newUser.login_cr = this.newUser.email+'_'+this.newUser.password
          usersRef.push(this.newUser)
          this.newUser.email = ''
          this.newUser.password = ''
          this.confirmPassword = ''
          this.passwordFail = ''
          document.getElementById('emailWarning').style.display="none"
          this.success='Your user details were successfully added to our system. Go to the login page to proceed.'
        }else{
            this.passwordFail += ' Password must contain at least 6 characters or numbers.'
        }
      },
    removeUser: function (user) {
        usersRef.child(user['.key']).remove()
    },
    searchUser: function(user) {
      //go search if user already exist in db
      let showButton = true
      let mailWarning = document.getElementById('emailWarning')
      //let setButton = document.getElementById('btn-submit')
      var query = db.ref('users').orderByChild('email').equalTo(this.newUser.email)
      query.on('value', function(snapshot) {
        if(snapshot.exists()) {
            //console.log('This email already exist in database')
          //  setButton.style.display="none"
            mailWarning.style.display="inline-block"
        }else{
          //console.log("email does not exist")
          //  setButton.style.display="inline-block"
          mailWarning.style.display="none"
          showButton = false
        }
      })
      if (showButton==false){
          this.validated = false
      }else{
          this.validated = true
      }
    }
  }
}
</script>

<style>
#emailWarning{
  display: none;
}
</style>
