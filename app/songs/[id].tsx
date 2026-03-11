import { ItemsProps } from "@/types/itemsProps.types";
import Slider from "@react-native-community/slider";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";

export default function SongDetail() {
    const { id } = useLocalSearchParams();
    const image = require("@/assets/images/bg-img-song.jpg");
    const [songDetail, setSongDetail] = useState<ItemsProps | null>(null);
    const data = require("@/db/data.json");
    const [value, setValue] = useState(0);

    useEffect(() => {
        const song = data.find((song: ItemsProps) => song.id === id);
        if (song) setSongDetail(song);
    }, [id]);

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.section}>
                <View style={styles.container_info_song}>
                    <Image source={image} style={styles.img} />
                    <View style={styles.song_text}>
                        <Text style={styles.title}>{songDetail?.title}</Text>
                        <Text style={styles.artist}>{songDetail?.artist}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.section}>
                <View style={styles.container_btns_info}>
                    <Icon name="heart-outline" size={25} color="#333" />
                    <Icon name="moon" size={25} color="black" />
                    <Icon name="notifications" size={25} color="black" />
                    <Icon name="ellipsis-vertical" size={25} color="#333" />
                </View>

                <View>
                    <Slider
                        style={{ width: "100%", height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#12b63b"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#333333"
                        value={value}
                        onValueChange={setValue}
                    />
                    <View style={styles.container_info_slider}>
                        <Text style={{ fontSize: 13 }}>00:05</Text>
                        <Text style={{ fontSize: 13 }}>02:49</Text>
                    </View>
                </View>

                <View style={styles.container_btns_contoler_music}>
                    <Icon name="shuffle" size={25} color="black" />
                    <View style={styles.container_btn_play}>
                        <Icon name="play-skip-back-sharp" size={25} color="black" />
                        <Icon name="play-sharp" size={45} color="black" />
                        <Icon name="play-skip-forward" size={25} color="black" />
                    </View>
                    <Icon name="list-outline" size={25} color="#333" />
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        marginBottom: 10,
    },
    section: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    container_info_song: {
        width: "100%",
        alignItems: "center",
        gap: 15,
    },
    song_text: {
        alignItems: "center",
    },
    img: {
        width: "100%",
        maxWidth: 450,
        height: 330,
        borderRadius: 25,
    },
    title: {
        fontSize: 25,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center",
    },
    artist: {
        fontSize: 16,
        color: "#7a7a7a",
        textAlign: "center",
    },
    container_btns_info: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 25,
    },
    container_info_slider: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    container_btns_contoler_music: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
    },
    container_btn_play: { flexDirection: "row", alignItems: "center", gap: 15 },
});