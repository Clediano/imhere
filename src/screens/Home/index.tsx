import { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";

import { Participant } from "../../components/Participant";

import { styles } from "./styles";

export const Home = () => {
    const [participants, setParticipants] = useState<string[]>([]);
    const [participantName, setParticipantName] = useState<string>("");

    const handleParticipantAdd = (): void => {
        if (participants.includes(participantName)) {
            return Alert.alert("Atenção", "Já existe um participante na lista com este nome");
        }
        setParticipants([...participants, participantName]);
        setParticipantName("");
    }

    const handleParticipantRemove = (name: string): void => {
        Alert.alert("Remover", `Remover o participante ${name}?`, [
            {
                text: "Sim",
                onPress: () => setParticipants([...participants.filter(participant => participant !== name)])
            },
            { text: "Não" }
        ])
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                Nome do Evento
            </Text>

            <Text style={styles.subtitle}>
                Sexta, 4 de Novembro de 2022
            </Text>

            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder="Nome do participando"
                    placeholderTextColor="#6b6b6b"
                    onChangeText={setParticipantName}
                    value={participantName}
                />

                <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleParticipantAdd()}
                >
                    <Text style={styles.buttonText}>
                        +
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={participants}
                showsVerticalScrollIndicator={false}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item }) => (
                    <Participant
                        name={item}
                        onRemove={() => handleParticipantRemove(item)}
                    />
                )}
                ListEmptyComponent={() => (
                    <Text style={styles.listEmptyText}>
                        Ninguém chegou ao evento ainda? Adicione participantes a sua lista de presença.
                    </Text>
                )}
            />

        </View>
    );
}