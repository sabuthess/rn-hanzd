import { supabase } from "@/lib/supabase";
import * as DocumentPicker from "expo-document-picker";
import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UploalLocalSongsScreen() {
  const [loading, setLoading] = useState(false);

  const handleOnPress = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "audio/*",
      copyToCacheDirectory: true,
      multiple: true,
    });

    if (result.canceled) return;

    for (const song of result.assets) {
      try {
        // Todod esto esta bien

        const file = {
          uri: song.uri,
          name: song.name,
          type: song.mimeType || "audio/mpeg",
        };

        const filePath = `songs/${Date.now()}-${song.name}`;

        const { error } = await supabase.storage
          .from("files")
          .upload(filePath, file, {
            contentType: file.type,
          });

        if (!error) {
          console.log("Subido:", filePath);
        } else {
          throw error;
        }
      } catch (err) {
        console.error("Error subiendo:", song.name, err);
      } finally {
        setLoading(true);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.item}>
        Seleciona las canciones que quieres subir a la Nube
      </Text>

      <Button title="Subir canciones" onPress={handleOnPress} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingTop: StatusBar.currentHeight || 20,
    backgroundColor: "#fff",
    padding: 16,
  },
  item: {
    marginBottom: 24,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
