import React from "react";
import { StyleSheet } from "react-native";
import { Button, Card, Modal, Text, Input } from "@ui-kitten/components";
import useAuth from "../hooks/useAuth";
import Toast from "react-native-toast-message";

const ModalDelete = ({
  isVisible = false,
  setVisible = () => {},
  submit = () => {},
}) => {
  const { logout, updateProfile } = useAuth();

  const handleSubmit = async () => {
    await updateProfile({ isActive: false });
    setVisible(false);
    await logout();
    Toast.show({
      text1: "Su cuenta ha sido borrada",
      type: "error",
      position: "bottom",
    });
  };

  const handleClose = () => setVisible(false);

  return (
    <Modal
      visible={isVisible}
      backdropStyle={styles.backdrop}
      onBackdropPress={handleClose}
    >
      <Card style={styles.card}>
        <Text style={styles.header}>¿Deseas borrar tu cuenta?</Text>
        <Input
          style={{ marginBottom: 10 }}
          size="medium"
          multiline
          textStyle={{ minHeight: 64 }}
          placeholder="Razón o Motivo"
        />

        <Button onPress={handleSubmit} style={{ marginBottom: 10 }}>
          Enviar
        </Button>
        <Button onPress={handleClose}>Cancelar</Button>
      </Card>
    </Modal>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: "400",
  },
  card: {
    margin: 15,
    width: "90%",
  },
  backdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  header: {
    fontWeight: "700",
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  caption: {
    textAlign: "justify",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 12,
    fontWeight: "400",
  },
  selectButton: {
    backgroundColor: "#F6F9FC",
    width: "100%",
    borderWidth: 1,
    borderColor: "#EEF2F7",
    borderRadius: 5,
    marginBottom: 10,
    height: 40,
  },
  selectText: {
    fontSize: 15,
    textAlign: "left",
  },
});

export default ModalDelete;
