import React from 'react'
import { View, Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native'
import { Block, Button, Text } from 'galio-framework'

import Images from '../constants/Images'

const { height, width } = Dimensions.get('screen')

export default class Question extends React.Component {
  constructor () {
    super()
    this.state = {
      show1: true,
      show2: false,
      show3: false
    }
    this.answer = 0
  }

  render () {
    const { navigation } = this.props
    const that = this
    let position = 1
    let answer = 0

    const ShowHideComponent = () => {
      if (this.state.show1 === true) {
        this.setState({
          show1: false,
          show2: true
        })
      } else if (this.state.show2 === true) {
        this.setState({
          show2: false,
          show3: true
        })
      } else if (this.state.show3 === true) {
        (this.answer >= 2)
          ? navigation.navigate('RetroGood')
          : navigation.navigate('RetroBad')
      }
    }

    return (
      <Block style={styles.container}>
        <StatusBar barStyle='light-content' />

        <Block style={styles.contentQuestion}>

          <View>
            {
              this.state.show1
                ? <Block style={styles.contentTextQuestion}>
                  <Image
                    source={require('../assets/images/question-1.png')}
                    style={styles.question1} />
                </Block>
                : null
            }
          </View>

          <View>
            {
              this.state.show2
                ? <Block style={styles.contentTextQuestion}>
                  <Image
                    source={require('../assets/images/question-2.png')}
                    style={styles.question2} />
                </Block>
                : null
            }
          </View>

          <View>
            {
              this.state.show3
                ? <Block style={styles.contentTextQuestion}>
                  <Image
                    source={require('../assets/images/question-3.png')}
                    style={styles.question3} />
                </Block>
                : null
            }
          </View>

          <Block style={styles.contentAnswerQuestion}>
            <Button
              shadowless
              style={styles.button}
              onPress={() => {
                this.answer++
                ShowHideComponent()
              }}>
              <Image
                source={require('../assets/images/yes.png')}
                style={styles.yes} />
            </Button>

            <Button
              shadowless
              style={styles.button}
              onPress={() => {
                ShowHideComponent()
              }}>
              <Image
                source={require('../assets/images/no.png')}
                style={styles.no} />
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
  contentQuestion: {
    height: height * 0.85,
    backgroundColor: '#61a4be'
  },

  contentTextQuestion: {
    width: width,
    position: 'relative'
  },

  contentAnswerQuestion: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  },

  question1: {
    width: 700,
    height: 65,
    marginTop: 180,
    marginLeft: '18%'
  },

  question2: {
    width: 540,
    height: 145,
    marginTop: 120,
    marginLeft: '27%'
  },

  question3: {
    width: 500,
    height: 165,
    marginTop: 120,
    marginLeft: '28%'
  },

  button: {
    height: 100,
    marginTop: 100,
    backgroundColor: 'transparent'
  },

  yes: {
    height: 100,
    marginLeft: '70%'
  },

  no: {
    height: 100,
    marginRight: '70%'
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
