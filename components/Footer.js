import React from 'react'
import { TouchableOpacity, StyleSheet, Platform, Dimensions, Image } from 'react-native'

const { height, width } = Dimensions.get('window')
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896)

class Footer extends React.Component {
  render () {
    return (
      <Block flex style={styles.container}>
        <Block flex space='between' style={styles.padded}>
          <Image
            source={require('../assets/images/slogan.png')}
            style={{ height: 120 }} />
        </Block>
        <Block flex space='between' style={styles.padded}>
          <Image
            source={require('../assets/images/ios.png')}
            style={{ height: 38, width: 82, marginRight: theme.SIZES.BASE * 1.5 }} />
          <Image
            source={require('../assets/images/ios.png')}
            style={{ height: 38, width: 82, marginRight: theme.SIZES.BASE * 1.5 }} />
        </Block>
      </Block>
    )
  }
}

export default Footer

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF'
  }
})
