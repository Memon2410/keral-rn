import React from 'react'
import { Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native'
import { Block, Button, Text } from 'galio-framework'

const { height, width } = Dimensions.get('screen')
import Images from '../constants/Images'

export default class RetroGood extends React.Component {
  render () {
    const { navigation } = this.props

    return (
      <Block style={styles.container}>
        <StatusBar barStyle='light-content' />

        <Block style={styles.contentRetro}>

          <Block style={styles.contentEmojiRetro}>
            <Image
              source={require('../assets/images/retro-yes.png')}
              style={styles.emoji} />
          </Block>

          <Block style={styles.contentAnswer}>
            <Image
              source={require('../assets/images/answer-yes.png')}
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
            <Image
              source={require('../assets/images/logos.png')}
              style={styles.logos} />
          </Block>
        </Block>

        <Button
          shadowless
          style={styles.button}
          onPress={() => navigation.navigate('Register')} />
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

  button: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0
  },

  emoji: {
    width: 113,
    marginTop: 90,
    marginLeft: '45%',
    marginBottom: '5%'
  },

  textAnswer: {
    width: 670,
    height: 150,
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

  logos: {
    width: 114,
    marginRight: 80
  }

})
