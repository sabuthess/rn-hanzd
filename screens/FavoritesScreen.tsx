import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FlatList, StyleSheet, Text, View } from "react-native";

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


export default function FavoritesScreen() {
    type ItemsProps = { title: string, artist: string }

    const DATA = [
        { id: "1", title: "Al2 - Alas", artist: "Unknown artist- Download" },
        { id: "2", title: "Al2 - Rojo", artist: "Unknown artist- Download" },
        { id: "3", title: "Al2 - A veces", artist: "Unknown artist- Download" },
        { id: "4", title: "Al2 - 3 de la mañana", artist: "Unknown artist- Download" },
        { id: "5af", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "fasd5", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "5afsd", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "5fsa", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "5asdf", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "5sdfasdf", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "5afdsfa", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "safd5", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "sdf5", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "5sdfa", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "5asdfd", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
        { id: "afs5", title: "Al2 - Milagro", artist: "Unknown artist- Download" },
    ]

    const SongItemCard = ({ title, artist }: ItemsProps) => (
        <View style={styles.item}>
            <View>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.artist}>{artist}</Text>
            </View>
            <View style={styles.container_icons}>
                <MaterialIcons name="playlist-add" size={24} color="black" style={styles.icon} />
                <AntDesign name="more" size={24} color="black" style={styles.icon} />
            </View>
        </View>
    )

    return (<>
        <View>
            <View style={styles.container_info_songs}>
                <View>
                    <View style={styles.container_btn_play}>
                        <Entypo name="controller-play" size={24} color="blueviolet" />
                    </View>
                    <Text>Play all (242) </Text>
                </View>
                <View>
                    <FontAwesome6 name="arrow-down-wide-short" size={24} color="black" />
                    <MaterialIcons name="checklist" size={24} color="black" />
                </View>

            </View>

        </View>

        <FlatList
            style={styles.container_list}
            showsVerticalScrollIndicator={false}
            scrollEnabled={true}
            data={DATA}
            renderItem={({ item }) => <SongItemCard title={item.title} artist={item.artist} />}
            keyExtractor={item => item.id}
        />
    </>
    )
}

const styles = StyleSheet.create({
    container_list: {
        display: "flex",
        flexDirection: "column",
        gap: 30,
        marginHorizontal: 20,
    },
    container_scroll: {
        marginVertical: 10,
    },

    container: {
        flex: 1,
        marginTop: 50,
        backgroundColor: "#ffffffc9"
    },
    item: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        // backgroundColor: "#beffc6",
        borderRadius: 4,
        paddingVertical: 10,
        marginVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: "#d4d4d4"
    },
    title: {
        fontSize: 17,
        fontWeight: "medium"
    },
    artist: {
        color: "#7a7a7a"
    },

    container_icons: {
        display: "flex",
        flexDirection: "row",
    },
    icon: {
        marginRight: 5,

    },

    container_info_songs: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginVertical: 20,
    },

    container_btn_play: {
        height: 30,
        width: 30,
        backgroundColor: "#000",
        borderRadius: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
});
