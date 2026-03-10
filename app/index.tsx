import FavoritesScreen from '@/screens/FavoritesScreen'
import SongsScreen from '@/screens/SongsScreen'
import React, { useEffect, useRef, useState } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import PagerView from 'react-native-pager-view'

export default function HomeScreen() {
    const [activePage, setActivePage] = useState(0)
    const pagerRef = useRef<PagerView>(null)
    const showScreen = (id: number) => {
        pagerRef.current?.setPage(id)
        setActivePage(id)
    }


    useEffect(() => {

    }, [pagerRef])

    return (
        <View style={styles.root}>
            <View style={styles.container_scroll}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}
                >
                    <Text style={activePage === 0 ? styles.button_active : styles.button} onPress={() => showScreen(0)}>Songs</Text>
                    <Text style={activePage === 1 ? styles.button_active : styles.button} onPress={() => showScreen(1)}>Playlist</Text>
                    <Text style={activePage === 2 ? styles.button_active : styles.button} onPress={() => showScreen(2)}>Favorites</Text>
                    <Text style={activePage === 3 ? styles.button_active : styles.button} onPress={() => showScreen(3)}>Albums</Text>
                    <Text style={activePage === 4 ? styles.button_active : styles.button} onPress={() => showScreen(4)}>Artist</Text>
                    <Text style={activePage === 4 ? styles.button_active : styles.button} onPress={() => showScreen(4)}>Folders</Text>


                </ScrollView>
            </View>

            <View style={styles.container_screens}>
                <PagerView
                    onPageSelected={e => setActivePage(e.nativeEvent.position)}
                    ref={pagerRef}
                    style={styles.container}
                    initialPage={0}
                >
                    <View key="1"><SongsScreen/></View>
                    <View key="3"><FavoritesScreen /></View>
                </PagerView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fafafa"
    },
    container_scroll: {
        maxHeight: 70
    },
    scrollContent: {

    },
    container_screens: {
        flex: 1,
    },
    container: {
        flex: 1,
    },

    button: {
        backgroundColor: "none",
        marginHorizontal: 10,
        fontSize: 16,
        color: "#000"
    },

    button_active: {
        backgroundColor: "none",
        marginHorizontal: 10,
        fontSize: 16,

        color: "#16a085"
    },

    active_screen_text: {
        color: "blueviolet"
    },


})