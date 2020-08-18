import React, { useState } from 'react'
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput'

export interface AutocompleteProps {
  array: string[]
  placeholder?: string
  label?: string
  textInputProps?: TextInputProps
  onValueSelected?: (value: string) => void
  onError?: () => void
}

export default function Autocomplete({ array, placeholder, label, textInputProps, onValueSelected, onError }: AutocompleteProps) {
  const [text, setText] = useState(placeholder || '')
  const [selected, setSelected] = useState(placeholder || '')
  const [error, setError] = useState(true)

  const onFocus = () => {
    if (text == selected && error) setError(false)
    else if (text != selected && !error) {
      (onError || defaultCallback)()
      setError(true)
    }
  }

  const showList = () => (
    <View style={styles.listView}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={styles.list}
      >
        {
          array.filter(str => str.toLowerCase().includes(text.toLowerCase())).map((str, index) => (
            <TouchableOpacity
              accessible={true}
              accessibilityLabel="Autocomplete list"
              style={styles.onTop}
              key={index}
              onPress={
                () => {
                  (onValueSelected || defaultCallback)(str)
                  setSelected(str)
                  setText(str)
                  setError(false)
                }
              }
            >
              <Text style={styles.autoCompleteText}>{str}</Text>
            </TouchableOpacity>
          ))
        }
      </ScrollView>
    </View>
  )

  return (
    <View>
      <TextInput
        label={label}
        onFocus={onFocus}
        onKeyPress={onFocus}
        value={text}
        error={error}
        onChangeText={setText}
        {...(textInputProps || {})}
      />
      {error && showList()}
    </View>
  )
}

const styles = StyleSheet.create({
  listView: {
    position: Platform.OS == 'ios' ? 'absolute' : 'relative',
    zIndex: Infinity,
    width: '100%',
    top: 0
  },
  list: {
    backgroundColor: '#cecece',
    zIndex: Infinity
  },
  onTop: {
    zIndex: Infinity
  },
  autoCompleteText: {
    zIndex: Infinity,
    flex: 1,
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold'
  }
})

const defaultCallback = () => { }
