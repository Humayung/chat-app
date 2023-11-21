import {
	View,
	Text,
	ImageBackground,
	StyleSheet,
	FlatList,
	KeyboardAvoidingView,
	Platform
} from 'react-native'
import {useRoute, useNavigation} from '@react-navigation/native'
import React from 'react'
import {useEffect} from 'react'
import Message from '../components/Message'
import messages from '../../assets/data/messages.json'
import bg from '../../assets/images/BG.png'
import InputBox from '../components/InputBox'

const ChatScreen = () => {
	const route = useRoute()
	const navigation = useNavigation()

	useEffect(() => {
		navigation.setOptions({title: route.params.name})
	})

	return (
		<KeyboardAvoidingView keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 90} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.bg}>
			<ImageBackground source={bg} style={styles.bg}>
				<FlatList
					data={messages}
					renderItem={({item}) => <Message message={item} />}
					style={styles.list}
					inverted
				/>
				<InputBox />
			</ImageBackground>
		</KeyboardAvoidingView>
	)
}

const styles = StyleSheet.create({
	bg: {
		flex: 1
	},
	list: {
		padding: 10
	}
})

export default ChatScreen
