import React from "react";
import { Layout, Text } from "@ui-kitten/components";

const EmpyDate = () => {
  return (
    <Layout
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: "#d8d8d8",
        margin: 5,
        borderRadius: 10,
      }}
    >
      <Layout>
        <Text
          category="c1"
          appearance="hint"
          style={{
            marginBottom: 2,
            fontWeight: "600",
          }}
        >
          No tienes ninguna cita hoy :(
        </Text>
      </Layout>
    </Layout>
  );
};

export default EmpyDate;
