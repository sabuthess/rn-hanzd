import { StyleSheet, View } from "react-native";

import { Text } from "@react-navigation/elements";
import { Link } from "expo-router";

export default function ModalDrawer({ handleMenuActive }) {
  return (
    <View style={styles.container}>
      <Link onPress={handleMenuActive} href={"/scan"} style={styles.text}>
        <Text style={styles.text}>Scan local songs</Text>
      </Link>
      <Link onPress={handleMenuActive} href={"/upload"} style={styles.text}>
        <Text style={styles.text}>Upload songs</Text>
      </Link>
      <Link onPress={handleMenuActive} href={"/download"} style={styles.text}>
        <Text style={styles.text}>Download songs</Text>
      </Link>
      <Link onPress={handleMenuActive} href={"/login"} style={styles.text}>
        <Text style={styles.text}>Login</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-start", // puedes cambiar a 'center' o 'flex-end'
    alignItems: "flex-start", // donde quieres que aparezca el modal
    backgroundColor: "rgb(0, 0, 0)", // fondo semi-transparente
  },
  container: {
    position: "absolute",
    display: "flex",
    gap: 10,
    width: 130,
    padding: 20,
    top: 90, // distancia desde arriba
    right: 30, // distancia desde la izquierda
    backgroundColor: "rgb(0, 0, 0)",
    borderRadius: 10,
  },
  text: {
    color: "#fff",
  },
});
