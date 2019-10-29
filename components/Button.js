import React from 'react'
import { StyleSheet } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Button, Text, theme } from 'galio-framework'

import materialTheme from '../constants/Theme'

export default class GaButton extends React.Component {
  render () {
    const { gradient, children, style, ...props } = this.props

    if (gradient) {
      return (
        <Button color='transparent' >
          <Text color={theme.COLORS.WHITE}>{children}</Text>
        </Button>
      )
    }

    return (
      <Button {...props}>{children}</Button>
    )
  }
}
