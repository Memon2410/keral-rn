import React from 'react'
import { Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native'
import { Block, Button, Text } from 'galio-framework'

import Constants from 'expo-constants'
import { SQLite } from 'expo-sqlite'

import Communications from 'react-native-communications'

const db = SQLite.openDatabase('db.db')

const { height, width } = Dimensions.get('screen')
import Images from '../constants/Images'

export default class Thanks extends React.Component {
  connstructor () {
    this.data = null
  }

  componentDidMount () {
    db.transaction(tx => {
      tx.executeSql('select * from keraltyDB', [], (_, { rows }) =>
        this.data = JSON.stringify(rows._array)
      )
    })
  }

  convertJSON (objArray) {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray
    let str = ''

    for (let i = 0; i < array.length; i++) {
      let line = ''
      for (let index in array[i]) {
        if (line != '') line += ', '
        line += array[i][index]
      }
      str += line + '\r\n'
    }

    Communications.email(['emailAddress'], null, null, 'Keralty | Gym', str)
  }

  render () {
    const { navigation } = this.props

    return (
      <Block style={styles.container}>
        <StatusBar barStyle='light-content' />

        <Block style={styles.contentRetro}>

          <Block style={styles.contentEmojiRetro}>
            <Image
              source={require('../assets/images/happy.png')}
              style={styles.emoji} />
          </Block>

          <Block style={styles.contentAnswer}>
            <Image
              source={require('../assets/images/typ.png')}
              style={styles.textAnswer} />
          </Block>
        </Block>

        <Block flex style={styles.footer}>
          <Block>
            <Image
              source={require('../assets/images/slogan.png')}
              style={styles.slogan} />
          </Block>
          <Block>
            <Button
              shadowless
              style={styles.button}
              onPress={() => {
                this.convertJSON(this.data)
              }
              }>
              <Image
                source={require('../assets/images/logos.png')}
                style={styles.logos} />
            </Button>
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
  contentRetro: {
    height: height * 0.85,
    backgroundColor: '#61a4be'
  },

  contentEmojiRetro: {
    width: width,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  contentAnswer: {
    width: width,
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },

  emoji: {
    width: 113,
    marginTop: 90,
    marginLeft: '45%',
    marginBottom: '5%'
  },

  textAnswer: {
    width: 660,
    height: 140,
    marginTop: 60,
    marginLeft: '20%'
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

  button: {
    width: 300,
    backgroundColor: 'transparent'
  },

  logos: {
    width: 114,
    marginRight: 80
  }

})
