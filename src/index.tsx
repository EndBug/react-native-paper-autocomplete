import React, { useState } from 'react'
import { View, StyleSheet, Platform, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import { TextInput, Text } from 'react-native-paper'
import { TextInputProps } from 'react-native-paper/lib/typescript/src/components/TextInput/TextInput'
import { FormikProps } from 'formik'

export interface InputProps extends Partial<TextInputProps> {
  label?: undefined
  value?: undefined
  error?: undefined
  onChangeText?: undefined
  onFocus?: undefined
  onBlur?: undefined
}

export interface AutocompleteProps {
  array: string[]
  placeholder?: string
  label?: string
  textInputProps?: InputProps
  onValueSelected?: (value: string) => void
  onError?: () => void
}

export function Autocomplete({ array, placeholder, label, textInputProps, onValueSelected, onError }: AutocompleteProps) {
  const [text, setText] = useState(placeholder || '')
  const [selected, setSelected] = useState(placeholder || '')
  const [error, setError] = useState(false)

  const onFocus = () => {
    if (text == selected && error) setError(false)
    else if (text != selected && !error) {
      (onError || defaultCallback)()
      setError(true)
    }
  }

  return (
    <View>
      <TextInput
        label={label}
        value={text}
        error={error}
        onChangeText={setText}
        onFocus={onFocus}
        onKeyPress={onFocus}
        {...(textInputProps || {})}
      />
      {error && <View style={styles.listView}>
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
      </View>}
    </View>
  )
}

export interface AutocompleteFormikProps {
  array: string[]
  formikProps: FormikProps<any>
  id: string
  label?: string
  parser?: <T>(value: T) => T
  textInputProps?: InputProps
}

export function AutocompleteFormik({ array, formikProps, id, label, parser, textInputProps }: AutocompleteFormikProps) {
  const [isFocused, setFocused] = useState(false)

  return (
    <View>
      <TextInput
        label={label}
        value={formikProps.values[id]}
        error={!!formikProps.errors[id]}
        onChangeText={(str: string) => formikProps.handleChange(id)(parser ? parser(str) : str)}
        onFocus={() => setFocused(true)}
        onBlur={() => {
          setFocused(false)
          formikProps.handleBlur(id)
          formikProps.setFieldTouched(id)
        }}
        {...(textInputProps || {})}
      />
      {isFocused && (
        <View style={styles.listView}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            style={styles.list}
          >
            {
              array.filter(str => str && str.toLowerCase().includes(formikProps.values[id].toLowerCase())).map((str, index) => (
                <TouchableOpacity
                  accessible={true}
                  accessibilityLabel={`Autocomplete list for the '${label}' field`}
                  style={styles.onTop}
                  key={index}
                  onPress={() => {
                    formikProps.setFieldValue(id, str)
                    formikProps.setFieldTouched(id)
                    formikProps.handleChange(id)(str)
                    Keyboard.dismiss()
                  }}
                >
                  <Text style={styles.autoCompleteText}>{str}</Text>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  listView: {
    position: Platform.OS == 'ios' ? 'absolute' : 'relative',
    zIndex: 999999,
    width: '100%',
    top: 0
  },
  list: {
    backgroundColor: '#cecece',
    zIndex: 999999
  },
  onTop: {
    zIndex: 999999
  },
  autoCompleteText: {
    zIndex: 999999,
    flex: 1,
    padding: 10,
    fontSize: 17,
    fontWeight: 'bold'
  }
})

const defaultCallback = () => { }
