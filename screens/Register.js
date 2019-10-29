import React from 'react'
import { Image, StyleSheet, StatusBar, Dimensions, Platform, View, TextInput } from 'react-native'
import { Block, Button, Text } from 'galio-framework'
import DatePicker from 'react-native-datepicker'

import Constants from 'expo-constants'
import { SQLite } from 'expo-sqlite'

const db = SQLite.openDatabase('db.db')
const { height, width } = Dimensions.get('screen')

import Images from '../constants/Images'

export default class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showComplete: false,
      showDate: false,
      chosenDate: new Date(),
      text: null
    }

    this.dates = [
      '22-10-2019 11:00', '22-10-2019 11:30', '22-10-2019 12:00', '22-10-2019 12:30', '22-10-2019 13:00', '22-10-2019 13:30',
      '23-10-2019 11:00', '23-10-2019 11:30', '23-10-2019 12:00', '23-10-2019 12:30', '23-10-2019 13:00', '23-10-2019 13:30',
      '29-10-2019 11:00', '29-10-2019 11:30', '29-10-2019 12:00', '29-10-2019 12:30', '29-10-2019 13:00', '29-10-2019 13:30',
      '30-10-2019 11:00', '30-10-2019 11:30', '30-10-2019 12:00', '30-10-2019 12:30', '30-10-2019 13:00', '30-10-2019 13:30',
      '05-11-2019 11:00', '05-11-2019 11:30', '05-11-2019 12:00', '05-11-2019 12:30', '05-11-2019 13:00', '05-11-2019 13:30',
      '06-11-2019 11:00', '06-11-2019 11:30', '06-11-2019 12:00', '06-11-2019 12:30', '06-11-2019 13:00', '06-11-2019 13:30',
      '12-11-2019 11:00', '12-11-2019 11:30', '12-11-2019 12:00', '12-11-2019 12:30', '12-11-2019 13:00', '12-11-2019 13:30',
      '13-11-2019 11:00', '13-11-2019 11:30', '13-11-2019 12:00', '13-11-2019 12:30', '13-11-2019 13:00', '13-11-2019 13:30'
    ]
    this.setDate = this.setDate.bind(this)
    this.state.date = this.dates[0]
  }

  updateDates (obj) {
    let items = Object.entries(obj);
    
    for (let key in obj) {
      let value = obj[key]
      for (let i = 0; i < this.dates.length; i++) {
        if (value['valueDate'] === this.dates[i]) {
          this.dates.splice(i,1)
        }
      }
    }
  }

  validateDate (date) {
    for (let i = 0; i < this.dates.length; i++) {
      if (date === this.dates[i]) {
        return true
      }
    }
  }

  getDataBase () {      
    db.transaction(tx => {
      tx.executeSql('select * from keraltyDB', [], (_, { rows }) =>
        this.updateDates(rows._array)
      )
    })
  }

  componentDidMount () {
    db.transaction(tx => {
      tx.executeSql(
        'create table if not exists keraltyDB (id integer primary key not null, valueName textName, valueEmail textEmail, valuePhone textPhone, valueDate date);'
      )
    })

    this.getDataBase()
  }

  setDate (newDate) {
    this.setState({chosenDate: newDate})
  }

  render () {
    const { navigation } = this.props

    const add = (name, email, phone, date) => {
      if (name === null || name === '' || name === undefined ||
        email === null || email === '' || email === undefined ||
        phone === null || phone === '' || phone === undefined ||
        date === null || date === '' || date === undefined) {
        this.setState({
          showComplete: true
        })
        return false
      } else {
        this.setState({
          showComplete: false
        })
        if (this.validateDate(date)) {
          db.transaction(
            tx => {
              tx.executeSql('insert into keraltyDB (valueName, valueEmail, valuePhone, valueDate) values (?, ?, ?, ?)', [name, email, phone, date])
              tx.executeSql('select * from keraltyDB', [], (_, { rows }) =>
                navigation.navigate('Thanks')
              )
            },
            null
          )
        } else {
          this.setState({
            showDate: true,
          })
        }
      }
    }

    return (
      <Block style={styles.container}>
        <StatusBar barStyle='light-content' />

        <Block style={styles.contentRegister}>

          <Block style={styles.contentEmoji}>
            <Image
              source={require('../assets/images/happy.png')}
              style={styles.happy} />
          </Block>

          <Block style={styles.containerTextForm}>
            <Image
              source={require('../assets/images/text-form.png')}
              style={styles.textForm} />
          </Block>

          <Block style={styles.containerForm}>
            <Block style={styles.containerLabel}>
              <Image
                source={require('../assets/images/label-1.png')}
                style={styles.label} />
            </Block>
            <TextInput
              style={styles.inputs}
              onChangeText={(textName) => this.setState({textName})}
              value={this.state.textName}
            />
          </Block>

          <Block style={styles.containerForm}>
            <Block style={styles.containerLabel}>
              <Image
                source={require('../assets/images/label-2.png')}
                style={styles.label} />
            </Block>
            <TextInput
              style={styles.inputs}
              onChangeText={(textEmail) => this.setState({textEmail})}
              value={this.state.textEmail}
            />
          </Block>

          <Block style={styles.containerForm}>
            <Block style={styles.containerLabel}>
              <Image
                source={require('../assets/images/label-3.png')}
                style={styles.label} />
            </Block>
            <TextInput
              style={styles.inputs}
              onChangeText={(textPhone) => this.setState({textPhone})}
              value={this.state.textPhone}
            />
          </Block>

          <Block style={styles.containerForm}>
            <Block style={styles.containerLabel}>
              <Image
                source={require('../assets/images/label-4.png')}
                style={styles.label} />
            </Block>
            <DatePicker
              style={{
                width: 400
              }}
              date={this.state.date}
              mode='datetime'
              placeholder=''
              format='DD-MM-YYYY HH:mm'
              minDate='21-10-2019 11:00'
              maxDate='13-11-2019 13:30'
              confirmBtnText='Confirmar'
              cancelBtnText='Cancelar'
              minuteInterval={30}
              showIcon={false}
              customStyles={{
                dateInput: {
                  width: 400,
                  height: 40,
                  paddingLeft: 10,
                  fontSize: 40,
                  textAlign: 'left',
                  color: '#074177',
                  backgroundColor: '#FFFFFF'
                }
              }}
              onDateChange={(date) => {
                this.setState({
                  date: date,
                  showDate: false,
                })
              }
              }
            />
          </Block>

          <View>
            {
              this.state.showComplete
                ? <Text style={styles.alertText}>
                  Todos los campos son requeridos.
                </Text>
                : null
            }
          </View>

          <View>
            {
              this.state.showDate
                ? <Text style={styles.alertText}>
                  Lo sentimos, no está disponible el horario en esa fecha.
                </Text>
                : null
            }
          </View>

          <Block style={styles.containerForm}>
            <Button
              shadowless
              style={styles.buttonDate}
              onPress={() => {
                add(this.state.textName, this.state.textEmail, this.state.textPhone, this.state.date)
              }}>
              <Image
                source={require('../assets/images/button-form.png')}
                style={styles.label} />
            </Button>
          </Block>
        </Block>

        <Block flex style={styles.footer}>
          <Block>
            <Image
              source={require('../assets/images/slogan.png')}
              style={styles.slogan} />
          </Block>
          <Block>
            <Image
              source={require('../assets/images/logos.png')}
              style={styles.logos} />
          </Block>
        </Block>

      </Block>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    position: 'relative'
  },
  contentRegister: {
    height: height * 0.85,
    backgroundColor: '#61a4be'
  },

  contentEmoji: {
    width: width,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  happy: {
    width: 113,
    marginTop: 60,
    marginLeft: '45%'
  },

  containerTextForm: {
    width: width,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  textForm: {
    width: 650,
    height: 70,
    marginTop: 40,
    marginLeft: '20%'
  },

  containerForm: {
    width: 650,
    height: 25,
    marginTop: 40,
    marginLeft: '20%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  containerLabel: {
    width: 200
  },

  inputs: {
    width: 400,
    height: 40,
    paddingLeft: 10,
    fontSize: 15,
    textAlign: 'center',
    color: '#353535',
    backgroundColor: '#FFFFFF'
  },

  buttonDate: {
    width: 300,
    marginLeft: 360,
    marginTop: 0,
    backgroundColor: 'transparent'
  },

  alertText: {
    marginTop: 20,
    textAlign: 'center'
  },

  footer: {
    height: 78,
    position: 'relative',
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 25,
    backgroundColor: '#FFFFFF'
  },

  slogan: {
    width: 420,
    marginLeft: 50
  },

  logos: {
    width: 114,
    marginRight: 80
  }

})
