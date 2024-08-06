import React, { useState, useRef } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { Modal, Portal, Button, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ConfettiCannon from "react-native-confetti-cannon";
import { useRouter } from "expo-router";
import { KeyIcon } from "../components/shared/Icons";
import useApiKey from '../hooks/useApiKey';
const ApiKeyModal = ({ visible, onDismiss, closeMenu }) => {
  const [apiKey, setApiKey] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const confettiRef = useRef(null);
  const inputRef = useRef(null);
  const router = useRouter(); // Hook de navegación

  const keyGuardada = useApiKey();

  const saveApiKey = async () => {
    setIsSaving(true);
    try {
      // guarda en el almacenamiento local del dispositivo
      await AsyncStorage.setItem("NASA_API_KEY", apiKey);
      setIsSaving(false);
      confettiRef.current.start();
    } catch (e) {
      console.error(e);
      throw new Error("No se pudo guardar la API Key");
    } finally {
      inputRef.current.clear();
      setTimeout(() => {
        closeMenu();
        onDismiss();
        router.push("/"); // Recargar la página actual
      }, 2000);
    }
  };
  const reestablecerApiKey = async () => {
    setIsSaving(true);
    try {
      await AsyncStorage.removeItem("NASA_API_KEY");
      setIsSaving(false);

    } catch (e) {
      console.error(e);
      throw new Error("No se pudo reestablecer la API Key");
    } finally {

      closeMenu();
      onDismiss();
      router.push("/"); // Recargar la página actual
    }
  };
  console.log(keyGuardada)
  return (
    <Portal>
      <Modal visible={visible} onDismiss={onDismiss}>
        <View style={styles.modalView}>
          {keyGuardada ? (
            <Text style={styles.title}>
              Inserte la Nueva API Key de la NASA
            </Text>
          ) : (
            <Text style={styles.title}>Inserte su API Key de la NASA</Text>
          )}
          <View
            style={{ flexDirection: "row", gap: 5, width: "100%", height: 40 }}
          >
            <View style={{ alignSelf: "center" }}>
              <KeyIcon size={25} color={keyGuardada ? "green" : "red"} />
            </View>

            <TextInput
              style={styles.input}
              ref={inputRef}
              onChangeText={setApiKey}
              placeholder="Insert You API Key"
            />
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', gap: 10 }}>
            <Button
              disabled={isSaving || !keyGuardada}
           
              mode="contained"
              onPress={reestablecerApiKey}
              buttonColor="#dc3545"
            >Borrar</Button>
            <Button
              disabled={apiKey.trim() === "" || isSaving}
              mode="contained"
              onPress={saveApiKey}
              buttonColor="#0d6efd"
            >
              Guardar
            </Button>
          </View>

          <ConfettiCannon
            ref={confettiRef}
            count={200}
            origin={{ x: 0, y: -500 }}
            autoStart={false}
            fallSpeed={2000} // Ajusta la velocidad de caída
            explosionSpeed={500}
            fadeOut={true}
          />
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 4,
    alignItems: "center",
    gap: 10,
  },
  title: {
    fontSize: 15,
    marginBottom: 5,
  },
  input: {
    height: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 40,
    paddingHorizontal: 10,
    width: "90%",
  },
});

export default ApiKeyModal;
