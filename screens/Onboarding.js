import React from 'react'
import { Image, StyleSheet, StatusBar, Dimensions, Platform } from 'react-native'
import { Block, Button, Text } from 'galio-framework'

const { height, width } = Dimensions.get('screen')
import Images from '../constants/Images'

export default class Onboarding extends React.Component {
  render () {
    const { navigation } = this.props

    return (
      <Block style={styles.container}>
        <StatusBar barStyle='light-content' />

        <Block style={styles.contentOnboarding}>
          <Image
            source={require('../assets/images/text-1.png')}
            style={styles.textOne} />

          <Image
            source={require('../assets/images/model.png')}
            style={styles.model} />

          <Image
            source={require('../assets/images/text-2.png')}
            style={styles.textTwo} />
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
          onPress={() => navigation.navigate('Question')} />
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
  contentOnboarding: {
    height: height * 0.85,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#61a4be'
  },
  button: {
    width: width,
    height: height,
    position: 'absolute',
    top: 0,
    left: 0,
    opacity: 0
  },
  textOne: {
    width: 280,
    height: 80,
    marginRight: 160,
    marginTop: 250
  },
  textTwo: {
    width: 310,
    height: 140,
    marginLeft: 220,
    marginTop: 200
  },
  model: {
    width: 334,
    height: 570,
    position: 'absolute',
    left: '50%',
    transform: ([{ translateX: -200 }]),
    bottom: 0
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
